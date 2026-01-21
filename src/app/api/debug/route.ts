import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    tokenExiste: !!process.env.MP_ACCESS_TOKEN,
    tokenInicio: process.env.MP_ACCESS_TOKEN?.slice(0, 10) || null
  })
}
