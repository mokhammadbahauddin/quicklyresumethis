import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { users } from '@/lib/appwrite-admin';
import { Query } from 'node-appwrite';

export async function POST(req: Request) {
  const body = await req.text();
  // Await headers() in Next.js 15/16
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET missing");
      return new Response('Config Error', { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const email = session.customer_details?.email || session.email;

    if (email) {
       try {
         const userList = await users.list([
            Query.equal('email', email)
         ]);

         if (userList.users.length > 0) {
            const user = userList.users[0];
            await users.updatePrefs(user.$id, { tier: 'pro' });
            console.log(`User ${user.$id} upgraded to PRO via Stripe.`);
         } else {
            console.warn(`User with email ${email} not found in Appwrite.`);
         }
       } catch (e) {
         console.error("Appwrite Update Failed", e);
         return new Response('Appwrite Update Failed', { status: 500 });
       }
    }
  }

  return new Response('OK', { status: 200 });
}
