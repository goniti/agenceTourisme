import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import { useState } from 'react'

const App = () => {
	const [openModal, setOpenModal] = useState(false)
	const [errorApiRequest, setError] = useState(false)
	const [searchCity, setSearchCity] = useState('')
	const [resultSuggest, setSuggest] = useState([])
	const [selectedResults, setResults] = useState([])
	console.log(selectedResults)

	const limitReached = (message) => {
		if (selectedResults.length > 2) {
			return [true, message]
		}
	}

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

	const onSelect = (option) => {
		setResults((oldResult) => [...oldResult, option])
	}

	if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{!openModal && <Header createList={setOpenModal} />}
			{openModal && (
				<Modal
					autoSuggest={resultSuggest}
					setSearch={setSearchCity}
					inputValue={searchCity}
					handleSearch={onChangeSearch}
					handleSelect={onSelect}
					handleLimit={limitReached('La liste des villes est compléter !')}
				/>
			)}
		</div>
	)
}
export default App
