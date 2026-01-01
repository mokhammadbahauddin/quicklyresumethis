import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Client, Users } from 'node-appwrite';

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing Stripe Configuration");
    return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Initialize Appwrite Admin Client
  // Note: We need APPWRITE_API_KEY (Server Secret) for this
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  const users = new Users(client);

  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: "Missing Stripe Signature" }, { status: 400 });
    }
    
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown Error';
      console.error(`Webhook Signature Error: ${msg}`);
      return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        console.log(`Upgrading user ${userId} to pro`);
        // Update user preferences
        await users.updatePrefs(userId, { tier: 'pro' });
      } else {
        console.error("No userId in session metadata");
      }
    }

    return NextResponse.json({ received: true });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown Error';
    console.error("Webhook Error: " + msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
