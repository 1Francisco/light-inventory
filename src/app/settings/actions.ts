'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import Stripe from 'stripe'
import { redirect } from 'next/navigation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any
})

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  
  if (!profile) {
    // Generar un perfil por defecto si el trigger no funcionó a tiempo
    const { data: newProfile } = await supabase.from('profiles').insert({ id: user.id, business_name: 'Mi Negocio' }).select().single()
    return newProfile
  }
  
  return profile
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const businessName = formData.get('business_name') as string

  await supabase.from('profiles').update({ business_name: businessName }).eq('id', user.id)
  
  revalidatePath('/settings')
  revalidatePath('/')
}

export async function createCheckoutSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  if (!process.env.STRIPE_SECRET_KEY) {
     throw new Error('STRIPE_SECRET_KEY no configurado en variables de entorno')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID, // Definido en Stripe Dashboard (Suscripción o pago único)
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/settings?canceled=true`,
    client_reference_id: user.id, 
    customer_email: user.email
  })

  redirect(session.url as string)
}

export async function createPortalSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const profile = await getProfile()
  if (!profile?.stripe_customer_id) throw new Error('No es cliente de Stripe')

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/settings`,
  })

  redirect(session.url)
}
