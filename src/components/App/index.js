import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import ListZone from '../ListZone'
import { useState } from 'react'

const App = () => {
	const [openModal, setOpenModal] = useState(false)
	const [errorApiRequest, setError] = useState(false)
	const [searchCity, setSearchCity] = useState('')
	const [resultSuggest, setSuggest] = useState({})
	const [selectedResults, setResults] = useState([])
	const [touristZoneSave, setSave] = useState([])
	console.log('save', touristZoneSave.length)

	const onChangeSearch = () => {
		fetch(
			`https://geo.api.gouv.fr/communes?nom=${searchCity}&boost=population&limit=5`
		)
			.then((response) => response.json())
			.then((json) => {
				setSuggest(json.map((results) => results))
				setError(false)
			})
			.catch(() => {
				setError(true)
			})
	}

	const onSelect = (option) => {
		//console.log("Filter",selectedResults.filter(item => item !== option));
		setResults((oldResult) => [...oldResult, option])
	}

	const onSubmit = (event) => {
		event.preventDefault()
		localStorage.setItem('registeredZone', JSON.stringify(selectedResults))
		setSave(JSON.parse(localStorage.getItem('registeredZone')))
		setOpenModal(false)
	}

	const limitReached = (message) => {
		if (selectedResults.length > 2) {
			return [true, message]
		}
	}

	if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{!openModal && (
				<>
					<Header createList={setOpenModal} touristList={touristZoneSave}/>
					<ListZone zoneSaved={touristZoneSave} />
				</>
			)}
			{openModal && (
				<Modal
					setSearch={setSearchCity}
					inputValue={searchCity}
					autoSuggest={resultSuggest}
					zoneList={selectedResults}
					handleSearch={onChangeSearch}
					handleSelect={onSelect}
					handleLimit={limitReached('La liste des villes est compléter !')}
					handleSubmit={onSubmit}
				/>
			)}
		</div>
	)
}
export default App
