import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any,
});

// Using Service Role Key to bypass RLS in the webhook (since it's a server-to-server call without user auth)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed.', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    ) as Stripe.Subscription;

    const userId = session.client_reference_id;

    if (userId) {
      await supabase
        .from('profiles')
        .update({
          is_pro: true,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          stripe_price_id: subscription.items.data[0].price.id,
          stripe_current_period_end: new Date(
            (subscription as any).current_period_end * 1000
          ).toISOString(),
        })
        .eq('id', userId);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = await stripe.subscriptions.retrieve(
      (event.data.object as Stripe.Subscription).id
    );

    await supabase
      .from('profiles')
      .update({
        is_pro: false,
        stripe_subscription_id: null,
      })
      .eq('stripe_customer_id', subscription.customer as string);
  }

  return new NextResponse('OK', { status: 200 });
}
