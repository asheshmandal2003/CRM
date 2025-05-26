'use client'

import './InfoBox.css'

function InfoBox() {
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
      <a className="info-button" href="/admin" target="_blank">
        Go to Admin Panel
      </a>
    </div>
  )
}

export default InfoBox
