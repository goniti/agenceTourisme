import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import { useState } from 'react'

const App = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [searchCity, setSearchCity] = useState('')
	const [resultSuggest, setSuggest] = useState([])

	const onSubmit = () => {
		setSearchCity('')
		fetch(
			`https://geo.api.gouv.fr/communes?nom=${searchCity}&boost=population&limit=5`
		)
			.then((response) => response.json())
			.then((json) => {
				setSuggest(json.map((results) => results.nom))
				setError(false)
			})
			.catch(() => {
				setError(true)
			})
			.finally(() => {
				setLoading(true)
			})
	}

	if (loading) return <span>Recherche en cours...</span>
	if (error) return <span>Aucune ville trouvée...</span>
	return (
		<div className="App">
			{/* <Header /> */}
			<Modal
				autoSuggest={resultSuggest}
				setSearch={setSearchCity}
				inputValue={searchCity}
				handleSubmit={onSubmit}
			/>
		</div>
	)
}
export default App
