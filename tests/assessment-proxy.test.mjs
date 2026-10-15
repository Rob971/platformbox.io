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
  // /assessment/start is intentionally absent: the self-serve checkout is closed
  // (SELF_SERVE_ASSESSMENT_OPEN=false) and is covered by the redirect test below.
  for (const [publicPath, upstream] of [
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
    ['/start/complete', '/assessment/complete'],
    ['/start/cancelled', '/assessment/cancelled'],
    ['/admin/public/assessment/complete', '/assessment/complete'],
    ['/admin/public/activate', '/assessment/activate'],
    ['/admin/public/resend-activation', '/assessment/resend-activation'],
  ]) {
    const res = await proxy(request(legacy + '?token=abc%2B123', 'POST', 'token=abc'));
    assert.equal(res.status, 307);
    assert.equal(res.headers.get('location'), 'https://www.platformbox.io' + canonical + '?token=abc%2B123');
  }
});

test('closed self-serve checkout: every start route redirects to /assessment and never reaches Delivery', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('The closed checkout must redirect before fetching'); });
  for (const startPath of [
    '/assessment/start', '/assessment/start/', '/start', '/start/',
    '/admin/public/assessment', '/admin/public/assessment/', '/admin/public/%61ssessment',
  ]) {
    for (const method of ['GET', 'POST']) {
      const res = await proxy(request(startPath + '?utm=x', method, method === 'POST' ? 'companyName=NewCo' : undefined));
      // GET keeps 307; a stale form POST gets 303 so the browser follows with GET.
      assert.equal(res.status, method === 'GET' ? 307 : 303, `${method} ${startPath}`);
      assert.equal(res.headers.get('location'), 'https://www.platformbox.io/assessment', `${method} ${startPath}`);
      assert.equal(res.headers.get('cache-control'), 'no-store', `${method} ${startPath}`);
    }
  }
});

test('closing the checkout does not touch /admin or the routes existing accounts use', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url) => { calls.push(new URL(url).pathname); return new Response('ok'); });
  for (const [publicPath, upstream] of [
    ['/admin', '/'],
    ['/admin/auth/login', '/auth/login'],
    ['/admin/delivery/users', '/admin/users'],
    ['/assessment/activate', '/public/activate'],
    ['/assessment/resend-activation', '/public/resend-activation'],
    ['/assessment/complete', '/public/assessment/complete'],
    ['/assessment/cancelled', '/public/assessment/cancelled'],
  ]) {
    const res = await proxy(request(publicPath));
    assert.equal(res.status, 200, publicPath);
    assert.equal(calls.at(-1), upstream, publicPath);
  }
});

test('closed checkout: case, ;param, extension and slash variants cannot reach Delivery', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('The closed checkout must redirect before fetching'); });
  for (const startPath of [
    '/admin/public/Assessment', '/admin/public/ASSESSMENT', '/admin/public/assessment;x=1',
    '/admin//public/assessment', '/assessment/start.json', '/start.json', '/Assessment/Start', '/admin/public/assessment.rsc',
  ]) {
    const res = await proxy(request(startPath));
    assert.equal(res.status, 307, startPath);
    assert.equal(res.headers.get('location'), 'https://www.platformbox.io/assessment', startPath);
  }
});
