// Run after npm run build; requires the sibling Delivery checkout and its dependencies.
import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const origin = 'http://localhost:3197';
const children = [];
let browser;
async function start(args, extraEnv, readyUrl) {
  const child = spawn(process.execPath, args, { env: {...process.env, ...extraEnv}, stdio: ['ignore','pipe','pipe'] });
  children.push(child);
  let output='';
  child.stdout.on('data', d => { output += d; }); child.stderr.on('data', d => { output += d; });
  for(let i=0;i<100;i++) {
    if(child.exitCode !== null) throw new Error(output);
    try { if((await fetch(readyUrl)).ok) return; } catch { /* Server is still starting. */ }
    await delay(100);
  }
  throw new Error('Local server did not start: '+output);
}
try {
  await start(['tests/fixtures/delivery-server.mjs'], {BASE_PATH:'/admin', NODE_ENV:'test'}, 'http://127.0.0.1:8197/health');
  await start(['node_modules/next/dist/bin/next','start','--port','3197'], {DELIVERY_UPSTREAM_URL:'http://127.0.0.1:8197'}, origin);
  browser = await puppeteer.launch({headless:true});
  const page=await browser.newPage();
  const violations=[];
  page.on('console', msg => {if(msg.text().includes('Content Security Policy')) violations.push(msg.text());});
  await page.setRequestInterception(true);
  page.on('request', req => {
    if(req.url()==='https://js.stripe.com/dahlia/stripe.js') return req.respond({contentType:'application/javascript',body:`window.Stripe = () => ({initCheckoutFormSdk: () => ({createForm: () => ({mount: (selector) => { const frame=document.createElement('iframe'); frame.title='Test payment form'; frame.src='https://js.stripe.com/fixture'; document.querySelector(selector).append(frame); }, on: () => {}}), loadActions: async () => ({type:'success',actions:{confirm:async()=>{}}})})});`});
    if(req.url()==='https://js.stripe.com/fixture') return req.respond({contentType:'text/html',body:'<label>Card number <input aria-label="Card number"></label>'});
    if(req.url().startsWith(origin)||req.url().startsWith('data:')) return req.continue();
    return req.abort();
  });
  for(const width of [1440,1024,390]) {
    await page.setViewport({width,height:1000});
    for(const path of ['/','/assessment','/about','/architecture','/showcase']) {
      await page.goto(origin+path,{waitUntil:'networkidle0'});
      const result=await page.evaluate(() => ({
        text:document.body.innerText,
        links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent.trim().replace(/\s+/g,' '),href:a.getAttribute('href')})),
        overflow:document.documentElement.scrollWidth > innerWidth,
      }));
      assert.ok(result.links.some(a=>a.href==='/assessment/start'&&a.text.includes('Start Assessment — €2,500')),path);
      assert.ok(result.links.some(a=>a.text==='Talk to Roberto'&&a.href==='https://cal.com/roberto-platformbox/platform-assessment'),path);
      assert.ok(!result.links.some(a=>a.href?.includes('/admin/public/')),path);
      assert.doesNotMatch(result.text,/Book Platform Assessment|after a free 30-min fit call|Starts with a free 30-min fit call/);
      assert.equal(result.overflow,false,`${path} overflows at ${width}px`);
    }
  }
  await page.goto(origin+'/assessment');
  await Promise.all([page.waitForNavigation(),page.click('main a[href="/assessment/start"]')]);
  assert.equal(page.url(),origin+'/assessment/start');
  assert.equal(await page.$eval('form',f=>f.getAttribute('action')),'/assessment/start');
  await page.type('#companyName','Browser Company'); await page.type('#contactName','Alex'); await page.type('#contactEmail','browser@example.test');
  const [response]=await Promise.all([page.waitForNavigation(),page.click('button[type=submit]')]);
  assert.equal(response.status(),200);
  await page.waitForSelector('#checkout-form iframe');
  const frame=await (await page.$('#checkout-form iframe')).contentFrame();
  await frame.waitForSelector('input[aria-label="Card number"]');
  assert.equal(violations.length,0,violations.join('\n'));
  assert.equal(response.headers()['cache-control'],'no-store');
  const state=await (await fetch('http://127.0.0.1:8197/_fixture/state')).json();
  assert.ok(state.returnUrl.startsWith(origin+'/assessment/complete?engagementId='));
  await page.goto(state.returnUrl);
  assert.doesNotMatch(await page.$eval('body',e=>e.innerText),/Payment confirmed/);
  assert.ok(state.activation.startsWith(origin+'/assessment/activate?token='));
  await page.goto(state.activation);
  assert.equal(await page.$eval('form',f=>f.getAttribute('action')),'/assessment/activate');
  // Activate using the existing public form and verify the workspace login handoff.
  for (const input of await page.$$('input[type=password]')) await input.type('correct-horse-battery-staple-42');
  await Promise.all([page.waitForNavigation(),page.click('button[type=submit]')]);
  assert.match(await page.$eval('body',e=>e.innerText),/activated/i);
  assert.ok(await page.$('a[href="/admin/auth/login"]'));
  for(const [legacy,canonical] of [['/start','/assessment/start'],['/admin/public/assessment','/assessment/start'],['/admin/public/activate?token=abc%2B123','/assessment/activate?token=abc%2B123']]) {
    const res=await fetch(origin+legacy,{redirect:'manual'});
    assert.equal(res.status,307); assert.equal(new URL(res.headers.get('location'),origin).href,origin+canonical);
  }
  console.log('PASS: 5 marketing pages at desktop/mobile; purchase navigation; clean form POST; Stripe test iframe under CSP; canonical return and activation; workspace handoff; legacy redirects. Stripe API and SDK simulated; no live payment.');
} finally {
  if(browser) await browser.close();
  for(const child of children.reverse()) child.kill('SIGTERM');
}
