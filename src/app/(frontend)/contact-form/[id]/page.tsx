import ErrorPage from '../../components/ErrorPage'
import ContactForm from './components/ContactForm'

export default async function ContactFormPage({ params }: { params: { id: string } }) {
  try {
    const { id } = params
    const response = await fetch(`${process.env.BASE_URL}/api/forms/${id}`)
    if (!response.ok) {
      throw new Error('Form not found')
    }
    const form = await response.json()
    return <ContactForm form={form} />
  } catch (error) {
    console.error(
      'Error fetching form data:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return <ErrorPage error={error instanceof Error ? error.message : 'Unknown error'} />
  }
}
