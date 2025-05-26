'use client'

import React from 'react'
import './SearchForm.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function SearchForm() {
  const [disabled, setDisabled] = React.useState(false)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabled(true)
    const formId = inputRef.current?.value.trim()
    if (formId) {
      router.push(`/contact-form/${formId}`)
    } else {
      toast.warning('Please enter a form ID to search.')
    }
  }

  return (
    <div className="search-box">
      <h1 className="search-title">Search Form</h1>
      <p className="search-description">Enter the form ID to redirect to the form</p>
      <form className="search-form" onSubmit={handleSubmit} id="search-form">
        <input
          type="text"
          name="id"
          placeholder="Enter form ID..."
          className="search-input"
          ref={inputRef}
        />
        <button type="submit" className="search-button" disabled={disabled}>
          {disabled ? 'Redirecting...' : 'Go to Form'}
        </button>
      </form>
    </div>
  )
}

export default SearchForm
