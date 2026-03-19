'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getDashboardStats() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { salesCount: 0, netProfit: 0, lowStockCount: 0 }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const { data: sales } = await supabase
    .from('sales')
    .select('quantity, total_price')
    .eq('user_id', user.id)
    .gte('created_at', today.toISOString())

  const salesCount = sales?.reduce((acc, sale) => acc + sale.quantity, 0) || 0
  const netProfit = sales?.reduce((acc, sale) => acc + Number(sale.total_price), 0) || 0

  const { data: lowStock } = await supabase
    .from('products')
    .select('id')
    .eq('user_id', user.id)
    .lte('stock', 3)

  return {
    salesCount,
    netProfit,
    lowStockCount: lowStock?.length || 0
  }
}

export async function getProducts() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return products || []
}

export async function registerSale(productId: string, quantity: number, pricePerUnit: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: product } = await supabase.from('products').select('stock').eq('id', productId).single()
  
  if (product && product.stock >= quantity) {
    await supabase.from('products').update({ stock: product.stock - quantity }).eq('id', productId)
    
    await supabase.from('sales').insert({
      user_id: user.id,
      product_id: productId,
      quantity: quantity,
      total_price: quantity * pricePerUnit
    })
    
    revalidatePath('/')
    revalidatePath('/inventory')
    return { success: true }
  }
  
  return { success: false, error: 'Not enough stock' }
}

export async function createProduct(name: string, price: number, stock: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  await supabase.from('products').insert({
    user_id: user.id,
    name,
    price,
    stock
  })
  
  revalidatePath('/inventory')
  revalidatePath('/')
  return { success: true }
}

export async function updateProduct(id: string, name: string, price: number, stock: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  await supabase.from('products').update({
    name, price, stock
  }).eq('id', id).eq('user_id', user.id)
  
  revalidatePath('/inventory')
  revalidatePath('/')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  await supabase.from('products').delete().eq('id', id).eq('user_id', user.id)
  
  revalidatePath('/inventory')
  revalidatePath('/')
  return { success: true }
}
