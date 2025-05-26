import ContactForm from './components/ContactForm'

export default async function HomePage() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/forms/2`)
    const form = await response.json()
    return <ContactForm form={form} />
  } catch (error) {
    console.error('Error fetching form data:', error)
    return <div>Error loading form</div>
  }
}
