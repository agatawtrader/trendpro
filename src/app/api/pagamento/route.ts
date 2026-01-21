import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'MP_ACCESS_TOKEN não configurado' },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const preference = {
      items: [
        {
          title: 'Trend Pro – Plano Anual',
          quantity: 1,
          unit_price: 997, // altere se quiser
          currency_id: 'BRL'
        }
      ],
      external_reference: 'trendpro_user',
      back_urls: {
        success: `${baseUrl}/painel?paid=1`,
        failure: `${baseUrl}/painel`,
        pending: `${baseUrl}/painel`
      },
      auto_return: 'approved'
    }

    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preference)
      }
    )

    const data = await response.json()

    if (!data.init_point) {
      return NextResponse.json(
        { error: 'Erro ao criar preferência', details: data },
        { status: 500 }
      )
    }

    return NextResponse.json({
      init_point: data.init_point
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno', details: String(error) },
      { status: 500 }
    )
  }
}
