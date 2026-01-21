import { NextResponse } from 'next/server'

export async function POST() {
  const accessToken = process.env.MP_ACCESS_TOKEN

  const preference = {
    items: [
      {
        title: 'Trend Pro – Plano Anual',
        quantity: 1,
        unit_price: 997,
      },
    ],
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_BASE_URL}/painel?paid=1`,
      failure: `${process.env.NEXT_PUBLIC_BASE_URL}/painel`,
      pending: `${process.env.NEXT_PUBLIC_BASE_URL}/painel`,
    },
    auto_return: 'approved',
  }

  const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preference),
  })

  const data = await res.json()

  return NextResponse.json({
    id: data.id,
    init_point: data.init_point,
  })
}
