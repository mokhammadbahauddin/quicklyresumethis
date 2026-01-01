import Stripe from 'stripe';
import { Client, Users } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      error("Missing Stripe Configuration");
      return res.json({ error: "Server Configuration Error" }, 500);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const users = new Users(client);

  try {
    const sig = req.headers['stripe-signature'];

    // Note: In Appwrite, req.body is the raw body string for webhooks usually
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      error(`Webhook Signature Error: ${err.message}`);
      return res.json({ error: `Webhook Error: ${err.message}` }, 400);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId;

      if (userId) {
        log(`Upgrading user ${userId} to pro`);
        // Update user preferences
        await users.updatePrefs(userId, { tier: 'pro' });
      } else {
        error("No userId in session metadata");
      }
    }

    return res.json({ received: true });

  } catch (err) {
    error("Webhook Error: " + err.toString());
    return res.json({ success: false, error: err.toString() }, 500);
  }
};
