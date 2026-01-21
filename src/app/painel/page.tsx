'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Painel() {
  const router = useRouter()
  const search = useSearchParams()
  const [assinante, setAssinante] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  useEffect(() => {
    const logado = localStorage.getItem('logado')
    if (logado !== 'true') router.push('/')

    if (search.get('paid') === '1') {
      localStorage.setItem('assinante', 'true')
      setAssinante(true)
    } else {
      setAssinante(localStorage.getItem('assinante') === 'true')
    }
  }, [router, search])

  async function pagar() {
    const res = await fetch('/api/pagamento', { method: 'POST' })
    const data = await res.json()
    setCheckoutUrl(data.init_point)
  }

  function sair() {
    localStorage.clear()
    router.push('/')
  }

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: 30 }}>
      <h1>📊 Painel Trend Pro</h1>

      {!assinante && (
        <div style={{ marginTop: 40, background: '#0B1220', padding: 20, borderRadius: 12, maxWidth: 420 }}>
          <h3>🔒 Acesso restrito</h3>
          <p>Assine o plano anual para liberar tudo.</p>

          {!checkoutUrl && (
            <button
              onClick={pagar}
              style={{ padding: 12, background: '#22d3ee', border: 'none', cursor: 'pointer' }}
            >
              Assinar plano anual
            </button>
          )}

          {checkoutUrl && (
            <iframe
              src={checkoutUrl}
              style={{
                width: '100%',
                height: 600,
                border: 'none',
                marginTop: 20,
                borderRadius: 8,
              }}
            />
          )}
        </div>
      )}

      {assinante && (
        <div style={{ marginTop: 30 }}>
          <button>📘 Instruções</button>
          <button>🎥 Vídeos</button>
          <button>📂 Arquivos</button>
          <button>📈 Termômetro</button>
        </div>
      )}

      <button
        onClick={sair}
        style={{ marginTop: 40, background: '#ef4444', color: 'white', border: 'none', padding: 10 }}
      >
        Sair
      </button>
    </main>
  )
}
