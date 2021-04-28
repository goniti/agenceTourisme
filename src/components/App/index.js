import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import { useState } from 'react'

const App = () => {
	const [error, setError] = useState(false)
	const [searchCity, setSearchCity] = useState('')
	const [resultSuggest, setSuggest] = useState([])

	const onChangeSearch = () => {
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
	}

	if (error) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{/* <Header /> */}
			<Modal
				autoSuggest={resultSuggest}
				setSearch={setSearchCity}
				inputValue={searchCity}
				handleSearch={onChangeSearch}
			/>
		</div>
	)
}
export default App
