'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Painel() {
  const router = useRouter()

  useEffect(() => {
    const logado = localStorage.getItem('logado')
    if (logado !== 'true') {
      router.push('/')
    }
  }, [router])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#020617',
      color: 'white',
      padding: 30,
      fontFamily: 'Arial'
    }}>
      <h1>📊 Painel Trend Pro</h1>

      <div style={{ marginTop: 30 }}>
        <button disabled style={{ opacity: 0.4 }}>🔒 Indicador</button>
        <button disabled style={{ opacity: 0.4 }}>🔒 Estratégias</button>
        <button disabled style={{ opacity: 0.4 }}>🔒 Materiais</button>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem('logado')
          router.push('/')
        }}
        style={{
          marginTop: 40,
          background: '#ef4444',
          color: 'white',
          border: 'none',
          padding: 12,
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </main>
  )
}
