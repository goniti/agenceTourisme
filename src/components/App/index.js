import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import ListZone from '../ListZone'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
	const [searchData, setSearchData] = useState('')
	const [resultSuggest, setSuggest] = useState({})
	const [selectedOption, setSelectedOption] = useState([])
	const [cachingResult, setCachingResult] = useState([])
	const [saveResult, setSave] = useState({})

	const [openModal, setOpenModal] = useState(false)
	const [titleModal, setTitleModal] = useState('')

	const [errorApiRequest, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const onChangeSearch = () => {
		fetch(`https://geo.api.gouv.fr/communes?nom=${searchData}&boost=population&limit=5`)
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
		setSelectedOption((oldOption) => [...oldOption, option])
		setSearchData('')
		setErrorMessage('')
	}

	const onSubmit = (event) => {
		event.preventDefault()
		if (cachingResult.length === 0) {
			return setErrorMessage('Valider au minimum une ville avant de sauvegarder')
		}

		localStorage.setItem('registeredZone', JSON.stringify(cachingResult))
		setSave(JSON.parse(localStorage.getItem('registeredZone')))
		setCachingResult([])
		setOpenModal(false)
	}

	const onRemove = (id) => {
		console.log('index =', id)

		// Todo Deleting an area with confirmation
	}

	const limitReached = (message) => {
		if (selectedOption.length > 2) {
			return [true, message]
		}
	}

	const changeTitleModal = (title) => {
		setTitleModal(title)
	}

	const generateData = () => {
		const numberOfImage = 5
		let cityData = {}
		let srcImages = []
		let images = []

		for (let indexImage = 0; indexImage < numberOfImage; indexImage++) {
			const random = Math.round(Math.random() * 1000)
			srcImages.push({
				id: uuidv4(),
				src: `https://picsum.photos/180/180?random=${random}`,
				alt: `Photo numero 0${[indexImage + 1]}`,
			})
		}

		for (let indexData = 0; indexData < selectedOption.length; indexData++) {
			images.push({ municipality: `${selectedOption[indexData]}`, pictures: srcImages })
		}

		//! error with objet fake data, it's duplicated
		//console.log('images', images)
		cityData.data = images
		return cityData
	}

	const onValidate = () => {
		if (selectedOption.length === 0) {
			return
		}
		setCachingResult(generateData)
	}

	if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{!openModal && (
				<>
					<Header
						showModal={setOpenModal}
						touristPlaces={saveResult}
						handleTitleModal={changeTitleModal}
					/>
					<ListZone
						handleTitleModal={changeTitleModal}
						editZone={setOpenModal}
						listPlaces={saveResult}
						removeZone={onRemove}
					/>
				</>
			)}
			{openModal && (
				<Modal
					title={titleModal}
					error={errorMessage}
					setSearch={setSearchData}
					inputValue={searchData}
					autoSuggest={resultSuggest}
					zoneList={selectedOption}
					zoneImage={cachingResult}
					removeZone={onRemove}
					handleSearch={onChangeSearch}
					handleSelect={onSelect}
					handleLimit={limitReached('La liste des villes est compléter !')}
					handleSubmit={onSubmit}
					handleValidate={onValidate}
				/>
			)}
		</div>
	)
}
export default App
