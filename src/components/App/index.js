import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import { useState } from 'react'

const App = () => {
	const [openModal, setOpenModal] = useState(false)
	const [error, setError] = useState(false)
	const [searchCity, setSearchCity] = useState('')
	const [resultSuggest, setSuggest] = useState([])
	const [selectedResults,setResults] = useState([])
// console.log("searchCity", searchCity);
// console.log("resultSuggest", resultSuggest);
// console.log("selectedResults", selectedResults);

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

	// const onSubmit = (event) => {
	// 	event.preventDefault()
	// 	setResults(oldResult => [...oldResult, searchCity])
	// 	console.log("selectedResults", selectedResults);
	// }

	const onSelect = (option) => {
		console.log(option);
		// setSearchCity(option)
		//setResults(oldResult => [...oldResult, option])
	}
	

	if (error) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{!openModal && 
			<Header createList={setOpenModal}/> 
			}
			{openModal && (
				<Modal
					autoSuggest={resultSuggest}
					setSearch={setSearchCity}
					inputValue={searchCity}
					handleSearch={onChangeSearch}
					handleSelect={onSelect}
					// handleSubmit={onSubmit}
				/>
			)}
		</div>
	)
}
export default App
