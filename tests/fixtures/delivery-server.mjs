// Isolated in-memory Delivery for the cross-repository browser check. No real payments or email.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const repo = process.env.PBX_DELIVERY_REPO ?? resolve('../platformbox-delivery');
const load = path => import(pathToFileURL(resolve(repo, path)).href);
const { default: Stripe } = await load('node_modules/stripe/esm/stripe.esm.node.js');
const { bootstrap } = await load('tests/helpers.ts');
const { buildApp } = await load('src/http/app.ts');
const sessions = new Stripe('sk_test_fixture').checkout.sessions;
let returnUrl;
Object.getPrototypeOf(sessions).create = async params => {
  returnUrl = params.return_url;
  return { id: 'cs_test_fixture', client_secret: 'cs_test_fixture_secret' };
};
const h = await bootstrap({ BASE_PATH: '/admin', PUBLIC_URL: 'http://localhost:3197/admin',
  STRIPE_SECRET_KEY: 'sk_test_fixture', STRIPE_PUBLISHABLE_KEY: 'pk_test_fixture',
  STRIPE_WEBHOOK_SECRET: 'whsec_fixture', RESEND_API_KEY: '' });
const app = buildApp(h.db, h.env);
app.platformBoxOrgId = h.platformBoxOrgId;
app.get('/_fixture/state', async () => ({
  activation: h.db.get("SELECT link FROM notification WHERE kind='activation' ORDER BY created_at DESC LIMIT 1")?.link,
  returnUrl,
}));
await app.listen({ port: 8197, host: '127.0.0.1' });
process.on('SIGTERM', async () => { await app.close(); h.close(); process.exit(0); });
