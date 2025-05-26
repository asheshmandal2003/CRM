'use client'

import './ErrorPage.css'
import { useRouter } from 'next/navigation'

function ErrorPage({ error = 'An unexpected error occurred' }) {
  const router = useRouter()
  return (
    <div className="error-page">
      <h1 className="error-title">Error</h1>
      <p className="error-message">{error}</p>
      <button onClick={() => router.push('/')} className="error-button">
        Go to Home
      </button>
    </div>
  )
}

export default ErrorPage
