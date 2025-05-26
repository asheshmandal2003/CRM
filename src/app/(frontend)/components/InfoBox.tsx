'use client'

import { useRouter } from 'next/navigation'
import './InfoBox.css'

function InfoBox() {
  const router = useRouter()
  return (
    <div className="info-box">
      <p className="info">
        For accessing the admin panel, please use the following credentials:
        <br />
        <br />
        <strong className="info-email">email:</strong> admin@example.com
        <br />
        <strong className="info-password">Password:</strong> admin
      </p>
      <button className="info-button" onClick={() => router.push('/admin')}>
        Go to Admin Panel
      </button>
    </div>
  )
}

export default InfoBox
