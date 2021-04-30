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

	console.log(saveResult)

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
		const forbidsDuplication = selectedOption.includes(option)
		if (forbidsDuplication) {
			return
		}

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

	const onRemoveResultSaved = (id) => {
		// Todo Deleting with confirmation
		const currentTarget = saveResult.data[id].id
		console.log("l'id target", id)
		console.log('saveResult.data', currentTarget) // saveResult.data Array [ {…}, {…} ]

		console.log(saveResult.data[id].filter((item) => item.id !== id))

		// Uncaught TypeError: saveResult.filter is not a function

		// saveResult.map((item) => item )
		// [{ id: 0, municipality: "Angers", pictures: (5) […] }]

		// console.log(
		// 	'monfiltre',
		// 	saveResult.filter((item) => item.data[id].id !== id)
		// )
		//setSave(saveResult.filter((item) => item.data.id !== id))

		//console.log(saveResult.filter((currentItem) => currentItem.data.id !== id))

		// const deleteItem = id => {
		// 	setItems(prevItems => {
		// 	  return prevItems.filter(item => item.id !== id);
		// 	});
		//   };
		//const item = saveResult.data[target].id
		//console.log(item)
		//saveResult.splice((element) => element.data[target].id === id, 1)
		//console.log(saveResult)
		// const removed = saveResult.filter((item) => {
		// 	return item.id !== id
		// })
		// setSave((oldItem) => [...oldItem, removed])

		//console.log(removed)
	}
	const onRemoveTag = (target, id) => {}

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
			images.push({
				id: indexData,
				municipality: `${selectedOption[indexData]}`,
				pictures: srcImages,
			})
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
						removeZone={onRemoveResultSaved}
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
					removeZone={onRemoveTag}
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
