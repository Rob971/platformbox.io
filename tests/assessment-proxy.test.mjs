import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proxy } from '../src/proxy.ts';

function request(path, method = 'GET', body) {
  const req = new Request('https://www.platformbox.io' + path, { method, body });
  return Object.assign(req, { nextUrl: new URL(req.url) });
}

test('public routes forward to the existing Delivery handlers, preserving bodies and queries', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    calls.push({ url, body: init.body ? await new Response(init.body).text() : '' });
    return new Response('<form action="/assessment/start">Company name</form>', {
      headers: { 'content-type': 'text/html', 'content-encoding': 'gzip',
        'content-security-policy': "script-src https://js.stripe.com",
        'set-cookie': 'session=example; Path=/; HttpOnly; SameSite=Lax' },
    });
  });
  for (const [publicPath, upstream] of [
    ['/assessment/start', '/public/assessment'],
    ['/assessment/complete', '/public/assessment/complete'],
    ['/assessment/cancelled', '/public/assessment/cancelled'],
    ['/assessment/activate', '/public/activate'],
    ['/assessment/resend-activation', '/public/resend-activation'],
    ['/admin/auth/login', '/auth/login'],
    ['/admin/delivery/users', '/admin/users'],
  ]) {
    const res = await proxy(request(publicPath + '?token=abc%2B123', 'POST', 'companyName=NewCo'));
    assert.equal(new URL(calls.at(-1).url).pathname, upstream);
    assert.equal(new URL(calls.at(-1).url).search, '?token=abc%2B123');
    assert.equal(calls.at(-1).body, 'companyName=NewCo');
    assert.equal(res.headers.get('content-encoding'), null);
    assert.equal(res.headers.get('content-security-policy'), 'script-src https://js.stripe.com');
    assert.equal(res.headers.getSetCookie().length, 1);
    assert.match(await res.text(), /Company name/);
  }
});

test('legacy public links redirect without losing POST semantics or query strings', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Legacy routes must redirect before fetching'); });
  for (const [legacy, canonical] of [
    ['/start', '/assessment/start'],
    ['/start/complete', '/assessment/complete'],
    ['/admin/public/assessment', '/assessment/start'],
    ['/admin/public/assessment/complete', '/assessment/complete'],
    ['/admin/public/activate', '/assessment/activate'],
    ['/admin/public/resend-activation', '/assessment/resend-activation'],
  ]) {
    const res = await proxy(request(legacy + '?token=abc%2B123', 'POST', 'token=abc'));
    assert.equal(res.status, 307);
    assert.equal(res.headers.get('location'), 'https://www.platformbox.io' + canonical + '?token=abc%2B123');
  }
});
