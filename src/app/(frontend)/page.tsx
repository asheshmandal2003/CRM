import InfoBox from './components/InfoBox'
import SearchForm from './components/SearchForm'

export default async function HomePage() {
  return (
    <div>
      <SearchForm />
      <InfoBox />
    </div>
  )
}
