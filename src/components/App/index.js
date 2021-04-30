import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import ListZone from '../ListZone'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
	const [openModal, setOpenModal] = useState(false)
	const [errorApiRequest, setError] = useState(false)
	const [searchData, setSearchData] = useState('')
	const [resultSuggest, setSuggest] = useState({})
	const [selectedResults, setResults] = useState([])
	const [touristZoneSave, setSave] = useState([]) //TODO refacto fusion touristZoneSave and imagesFake
	const [titleModal, setTitleModal] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [imagesFake, setImagesFake] = useState([])

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
		setResults((oldResult) => [...oldResult, option])
		setSearchData('')
		setErrorMessage('')
	}

	const onSubmit = (event) => {
		event.preventDefault()
		if (typeof selectedResults[0] !== 'string') {
			return setErrorMessage('choisir au minimum 1 ville')
		}

		localStorage.setItem('registeredZone', JSON.stringify(selectedResults))
		setSave(JSON.parse(localStorage.getItem('registeredZone')))
		setOpenModal(false)
	}

	const onRemove = (id) => {
		console.log('index =', id)

		// Todo Deleting an area with confirmation
	}

	const limitReached = (message) => {
		if (selectedResults.length > 2) {
			return [true, message]
		}
	}

	const changeTitleModal = (title) => {
		setTitleModal(title)
	}

	const generateImage = () => {
		const numberOfImage = 5
		let userSaving = {}
		let srcImages = []
		let images = []

		for (let randomizeImage = 0; randomizeImage < numberOfImage; randomizeImage++) {
			const random = Math.round(Math.random() * 1000)
			srcImages.push({
				id: uuidv4(),
				src: `https://picsum.photos/180/180?random=${random}`,
				alt: `Photo numero 0${[randomizeImage + 1]}`,
			})
		}

		for (let indexResults = 0; indexResults < selectedResults.length; indexResults++) {
			images.push({ municipality: `${selectedResults[indexResults]}`, pictures: srcImages })
		}

		//! error with objet fake data, it's duplicated
		//console.log('images', images)
		userSaving.data = images
		return userSaving
	}

	const onValidate = () => {
		if (selectedResults.length === 0) {
			return
		}
		setImagesFake(generateImage)
	}

	if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{!openModal && (
				<>
					<Header
						showModal={setOpenModal}
						touristList={touristZoneSave}
						handleTitleModal={changeTitleModal}
					/>
					<ListZone
						handleTitleModal={changeTitleModal}
						editZone={setOpenModal}
						zoneSaved={touristZoneSave}
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
					zoneList={selectedResults}
					zoneImage={imagesFake}
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
