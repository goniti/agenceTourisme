import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from '../Header'
import Modal from '../Modal'
//import ListZone from '../ListZone'
import './App.scss'

const App = () => {
	//* Hook data management
	const [dataCreateZone, setDataCreateZone] = useState({})
	//* Hook for an auto suggest system
	const [searchSuggest, setSearchSuggest] = useState('')
	const [resultSuggest, setResultSuggest] = useState({})
	const [errorApiRequest, setError] = useState(false)
	//* Hook for Modal
	const [selectedOption, setSelectedOption] = useState([])
	const [openModal, setOpenModal] = useState(false)
	const [titleModal, setTitleModal] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const onChangeSearch = () => {
		fetch(`https://geo.api.gouv.fr/communes?nom=${searchSuggest}&boost=population&limit=5`)
			.then((response) => response.json())
			.then((json) => {
				setResultSuggest(json.map((results) => results))
				setError(false)
			})
			.catch(() => {
				setError(true)
			})
	}
	// Handle Data
	const generateData = () => {
		const numberOfImage = 5
		let cityData = {}
		let srcImages = []
		let images = []
		let count = 0

		for (let indexData = 0; indexData < selectedOption.length + 1; indexData++) {
			srcImages = []
			for (let indexImage = 0; indexImage < numberOfImage; indexImage++) {
				count++
				srcImages.push({
					id: uuidv4(),
					src: `https://picsum.photos/180/180?random=${count}`,
					alt: `Photo numero 0${[indexImage + 1]}`,
				})
			}

			images.push({
				id: indexData,
				municipality: `${selectedOption[indexData]}`,
				pictures: srcImages,
			})
		}
		cityData.data = images
		return cityData
	}
	//TODO Creation de l'objet ci dessu

	// Handle modal
	const showTitleModal = (title) => {
		setTitleModal(title)
	}
	const onSelect = (option) => {
		const forbidsDuplication = selectedOption.includes(option)
		if (forbidsDuplication) {
			return
		}
		setSelectedOption((oldOption) => [...oldOption, option])
		setSearchSuggest('')
		setErrorMessage('')
		setDataCreateZone(generateData)
	}

	const onSubmit = (event) => {
		event.preventDefault()
		if (dataCreateZone.length === 0) {
			return setErrorMessage('Choisir au minimum une ville avant de sauvegarder')
		}

		setOpenModal(false)
	}

	const limitReached = () => {
		if (selectedOption.length > 2) {
			return [true]
		}
	}

	const isThereAnyData = () => {
		return Object.entries(dataCreateZone).length !== 0
	}

	if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
	return (
		<div className="App">
			{!openModal && (
				<Header
					hasData={isThereAnyData()}
					showModal={setOpenModal}
					titleModal={showTitleModal}
				/>
			)}
			{openModal && (
				<Modal
					handleSearch={onChangeSearch}
					handleSubmit={onSubmit}
					handleLimit={limitReached()}
					handleSelect={onSelect}
					cities={selectedOption}
					inputValue={searchSuggest}
					onChangeValue={setSearchSuggest}
					autoSuggest={resultSuggest}
					zoneData={dataCreateZone}
					hasData={isThereAnyData()}
					title={titleModal}
					error={errorMessage}
				/>
			)}
		</div>
	)
}
export default App
