import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Confirm from '../Confirm'
import Header from '../Header'
import ListZone from '../ListZone'
import Modal from '../Modal'
import './App.scss'

const App = () => {
  //* Hook data management
  const [dataZones, setDataZones] = useState([])
  //* Hook for defining a zone name
  const [zoneNaming, setZoneNaming] = useState('')
  //* Hook for an auto suggest system
  const [searchSuggest, setSearchSuggest] = useState('')
  const [resultSuggest, setResultSuggest] = useState([])
  const [errorApiRequest, setError] = useState(false)
  //* Hook for Modal
  const [selectedOption, setSelectedOption] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [zoneId, setZoneId] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  //*Hook for Confirm
  const [openConfirm, setOpenConfirm] = useState(false)

  const getSuggest = () => {
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

  const onSelect = (cityName, idZone, currentZone) => {
    const forbidsDuplication = selectedOption.find((city) => city.name === cityName)
    if (forbidsDuplication) {
      return
    }
    const selectedOptionCopy = [...selectedOption]
    selectedOptionCopy.push({
      id: uuidv4(),
      name: cityName,
    })

    setSelectedOption(selectedOptionCopy)
    setSearchSuggest('')
    setErrorMessage('')
    const dataZonesCopy = [...dataZones]
    let zone = dataZonesCopy.find((zone) => zone.id === idZone)
    if (zone === undefined) {
      zone = currentZone
      dataZonesCopy.push(zone)
    }
    zone.municipalities.push(generateMunicipality(cityName))
    setDataZones(dataZonesCopy)
  }

  const limitReached = () => {
    if (selectedOption.length > 2) {
      return [true]
    }
  }

  const generateMunicipality = (municipality) => {
    const numberOfImage = 5
    let srcImages = []

    for (let indexImage = 0; indexImage < numberOfImage; indexImage++) {
      srcImages.push({
        id: uuidv4(),
        src: `https://picsum.photos/180/180?random=${Math.round(Math.random() * 1000)}`,
        alt: `Photo numero 0${[indexImage + 1]}`,
      })
    }

    return {
      id: uuidv4(),
      municipality,
      pictures: srcImages,
    }
  }
  const onRemoveMunicipality = (municipalityName, idZone) => {
    let selectedOptionCopy = [...selectedOption]
    selectedOptionCopy = selectedOptionCopy.filter((city) => city.name !== municipalityName)
    setSelectedOption(selectedOptionCopy)

    const dataZonesCopy = [...dataZones]
    let zone = dataZonesCopy.find((zone) => zone.id === idZone)
    if (zone) {
      zone.municipalities = zone.municipalities.filter((municipality) => municipality.municipality !== municipalityName)
    }

    setDataZones(dataZonesCopy)
  }

  const getZone = () => {
    const zone = dataZones.find((zone) => zoneId === zone.id)
    if (zone) {
      return zone
    }

    return {
      id: zoneId,
      title: `${zoneNaming}`,
      municipalities: [],
    }
  }
  const onRemoveZone = (idZone) => {
    let dataZonesCopy = [...dataZones]
    dataZonesCopy = dataZonesCopy.filter((zone) => zone.id !== idZone)
    setDataZones(dataZonesCopy)
  }

  const isThereAnyData = () => {
    return dataZones.length > 0
  }

  const openAddZoneModal = () => {
    showTitleModal("Création d'une zone")
    let copyZoneNaming = [...zoneNaming]
    copyZoneNaming = ''
    setZoneNaming(copyZoneNaming)
    setSelectedOption([])
    setOpenModal(true)
    setZoneId(uuidv4())
  }

  const openEditZoneModal = (id) => {
    showTitleModal("Edition d'une zone")

    const zone = dataZones.find((zone) => zone.id === id)
    const options = zone.municipalities.map((municipality) => {
      return { id: uuidv4(), name: municipality.municipality }
    })
    setSelectedOption([...options])
    setOpenModal(true)
    setZoneId(id)
  }

  const showTitleModal = (title) => {
    setTitleModal(title)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const zone = dataZones.find((zone) => zone.id === zoneId)

    if (zone && zone.municipalities.length === 0) {
      return setErrorMessage('Choisir au minimum une ville avant de sauvegarder')
    } else if (!zoneNaming) {
      return setErrorMessage('Saisissez un nom de zone')
    }

    setOpenModal(false)
  }

  if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
  return (
    <div className="App">
      {!openConfirm && !openModal && <Header hasData={isThereAnyData()} showModal={openAddZoneModal} />}

      {!openConfirm && !openModal && (
        <ListZone
          dataZones={dataZones}
          handleEdit={(idZone) => {
            openEditZoneModal(idZone)
          }}
          handleRemove={(idZone) => {
            setOpenConfirm(true)
            setZoneId(idZone)
          }}
        />
      )}

      {openConfirm && (
        <Confirm
          handleCancel={() => setOpenConfirm(false)}
          handleRemove={() => {
            setOpenConfirm(false)
            onRemoveZone(zoneId)
          }}
        />
      )}

      {!openConfirm && openModal && (
        <Modal
          zoneId={zoneId}
          handleSuggest={getSuggest}
          handleNaming={getZone}
          handleSubmit={onSubmit}
          handleLimit={limitReached()}
          handleRemove={(idMunicipality, zoneId) => onRemoveMunicipality(idMunicipality, zoneId)}
          handleSelect={onSelect}
          cities={selectedOption}
          inputSuggestValue={searchSuggest}
          onChangeValue={setSearchSuggest}
          inputNamingValue={zoneNaming}
          onChangeNamingValue={setZoneNaming}
          autoSuggest={resultSuggest}
          zoneData={getZone()}
          title={titleModal}
          error={errorMessage}
        />
      )}
    </div>
  )
}
export default App
