import React from 'react'
import './styles.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  description: 'Contact Us - Get in touch with our team for any inquiries or support.',
  title: 'Contact Us',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  )
}
