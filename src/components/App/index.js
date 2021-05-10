import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import Confirm from '../Confirm'
import Header from '../Header'
import ListZone from '../ListZone'
import Modal from '../Modal'
import './App.scss'

const App = () => {
  //* Hook data management
  const [dataZones, setDataZones] = useState([])
  //* Hook for drag and drop Pictures
  const [pictures, setPictures] = useState([])
  //* Hook for defining a zone name
  const [zoneRename, setZoneRename] = useState('')
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
  //* Hook for Confirm
  const [openConfirm, setOpenConfirm] = useState(false)

  const getSuggest = (value) => {
    fetch(`https://geo.api.gouv.fr/communes?nom=${value}&boost=population&limit=5`)
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
      id: uuid(),
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
    localStorage.setItem('saveDataZones', JSON.stringify(dataZonesCopy))
  }

  const generateMunicipality = (municipality) => {
    const numberOfImage = 5
    let srcImages = []

    for (let indexImage = 0; indexImage < numberOfImage; indexImage++) {
      srcImages.push({
        id: uuid(),
        src: `https://picsum.photos/180/180?random=${Math.round(Math.random() * 1000)}`,
        alt: `Photo_${municipality}_0${[indexImage + 1]}`,
        city: municipality,
      })
    }
    setPictures([...pictures, ...srcImages])
    return {
      id: uuid(),
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
      title: `${zoneRename}`,
      municipalities: [],
    }
  }

  const onRemoveZone = (idZone) => {
    let dataZonesCopy = [...dataZones]
    dataZonesCopy = dataZonesCopy.filter((zone) => zone.id !== idZone)
    setDataZones(dataZonesCopy)
  }

  const onRenameZone = (title, idZone) => {
    const zone = dataZones.find((zone) => idZone === zone.id)
    if (zone) {
      zone.title = title
    }
    return
  }

  const updateDataZones = (municipalityToUpdate, id) => {
    const targetZone = dataZones.find((zone) => zone.id === id)
    const zonesToKeep = dataZones.filter((zone) => zone.id !== id)
    const targetMunicipality = targetZone.municipalities.find(
      (municipality) => municipality.municipality === municipalityToUpdate.municipality,
    )

    const municipalitiesToKeep = targetZone.municipalities.filter((municipality) => {
      return municipality.municipality !== targetMunicipality.municipality
    })

    const updatedDataZones = [
      ...zonesToKeep,
      { ...targetZone, municipalities: [...municipalitiesToKeep, municipalityToUpdate] },
    ]

    setDataZones(updatedDataZones)
  }

  const isThereAnyData = () => {
    return dataZones.length > 0
  }

  const clearInput = () => {
    let copyZoneNaming = [...zoneRename]
    copyZoneNaming = ''
    setZoneRename(copyZoneNaming)

    let copySearchSuggest = [...searchSuggest]
    copySearchSuggest = ''
    setSearchSuggest(copySearchSuggest)

    setErrorMessage('')
  }

  const openAddZoneModal = () => {
    showTitleModal("Création d'une zone")
    clearInput()
    setSelectedOption([])
    setOpenModal(true)
    setZoneId(uuid())
  }

  const openEditZoneModal = (id) => {
    showTitleModal("Edition d'une zone")

    const zone = dataZones.find((zone) => zone.id === id)
    const options = zone.municipalities.map((municipality) => {
      return { id: uuid(), name: municipality.municipality }
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
    if (selectedOption.length !== 0 && !zoneRename) {
      return setErrorMessage('Saisissez un nom de zone')
    }
    setOpenModal(false)
  }

  if (errorApiRequest) return <span>Le serveur ne répond pas...</span>
  return (
    <div className="App">
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
          handleSuggest={getSuggest}
          handleSubmit={onSubmit}
          handleSelect={onSelect}
          handleRemove={(idMunicipality, zoneId) => onRemoveMunicipality(idMunicipality, zoneId)}
          handleRenameZone={(renameZone, zoneId) => onRenameZone(renameZone, zoneId)}
          handleUpdatePictures={updateDataZones}
          inputSuggestValue={searchSuggest}
          inputNamingZoneValue={zoneRename}
          onChangeValue={setSearchSuggest}
          onChangeNamingZoneValue={setZoneRename}
          zoneId={zoneId}
          zoneData={getZone()}
          hasData={isThereAnyData()}
          autoSuggest={resultSuggest}
          cities={selectedOption}
          title={titleModal}
          error={errorMessage}
        />
      )}

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
    </div>
  )
}
export default App
