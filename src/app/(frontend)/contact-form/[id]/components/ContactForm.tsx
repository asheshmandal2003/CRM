'use client'

import React from 'react'
import './ContactForm.css'
import { toast } from 'react-toastify'

function ContactForm({ form }: { form: any }) {
  const [disabled, setDisabled] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisabled(true)
    try {
      const formData = new FormData(e.currentTarget)

      const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
        field: name,
        value: value.toString(),
      }))

      const response = await fetch(`/api/form-submissions`, {
        method: 'POST',
        body: JSON.stringify({
          form: form.id,
          submissionData: dataToSend,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      toast.success('Thank you for contacting us! We will get back to you soon.')
      formRef.current?.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(
        error instanceof Error ? error.message : 'An error occurred while submitting the form.',
      )
    } finally {
      setDisabled(false)
    }
  }
  return (
    <div className="contact-form-container">
      <h1>{form?.title}</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        {form.fields?.map((field: any) => {
          return (
            <div className="form-field" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              {field.blockType === 'textarea' ? (
                <textarea
                  id={field.id}
                  name={field.name}
                  required={field.required}
                  placeholder={field.blockName}
                />
              ) : (
                <input
                  type={field.blockType}
                  id={field.id}
                  name={field.name}
                  required={field.required}
                  placeholder={field.blockName}
                />
              )}
            </div>
          )
        })}

        <button type="submit" disabled={disabled}>
          {disabled ? 'Sending...' : form.submitButtonLabel}{' '}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
