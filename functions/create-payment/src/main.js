import Stripe from 'stripe';

export default async ({ req, res, log, error }) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.json({ success: false, error: "Server Error: Missing Stripe Key" }, 500);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { userId, returnUrl } = JSON.parse(req.body);

    if (!userId) {
        return res.json({ success: false, error: "Missing userId" }, 400);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'QuicklyResumeThis Pro',
              description: 'Unlimited AI & Downloads',
            },
            unit_amount: 999, // $9.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl}?success=true`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        userId: userId,
      },
    });

    return res.json({ success: true, url: session.url });

  } catch (err) {
    error("Stripe Error: " + err.toString());
    return res.json({ success: false, error: "Payment creation failed" }, 500);
  }
};
