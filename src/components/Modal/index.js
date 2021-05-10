import React, { useState } from 'react'
import { GoX } from 'react-icons/go'
import PropTypes from 'prop-types'
import PictureGallery from '../PictureGallery'
import './modal.scss'

const Modal = ({
  handleSuggest,
  handleSubmit,
  handleSelect,
  handleRemove,
  handleRenameZone,
  handleUpdatePictures,
  inputSuggestValue,
  inputNamingZoneValue,
  onChangeValue,
  onChangeNamingZoneValue,
  zoneId,
  zoneData,
  hasData,
  autoSuggest,
  cities,
  title,
  error,
}) => {
  const [openSuggest, setOpenSuggest] = useState(false)
  const userWrite = inputSuggestValue !== ''
  const citiesLimit = cities.length > 2
  const buttonSubmit = cities.length === 0

  return (
    <div className="modal">
      <p className="modal__title">{title}</p>

      <label className="modal__subtitle">Nom de la zone</label>
      <input
        value={inputNamingZoneValue}
        onChange={(event) => {
          handleRenameZone(event.target.value, zoneId)
          onChangeNamingZoneValue(event.target.value)
        }}
      />

      <form onSubmit={handleSubmit}>
        <div className="modal__form__suggest">
          <div className="suggest__city">
            <label htmlFor="city" className="suggest__label">
              Ville
            </label>
            {cities.map((city) => (
              <span key={city.id} className="tag tag__primary">
                {city.name}
                <i className="tag--icon-close" id={city.id} onClick={() => handleRemove(city.name, zoneId)}>
                  <GoX size={16} />
                </i>
              </span>
            ))}
          </div>
          {citiesLimit ? (
            <div className="suggest__validate">La limite de ville pour cette zone est atteinte.</div>
          ) : (
            <div className="suggest__validate">
              {userWrite && (
                <i
                  onClick={() => {
                    setOpenSuggest(false)
                    onChangeValue('')
                  }}
                  className="suggest__input__icon"
                >
                  <GoX size={16} />
                </i>
              )}
              <input
                id="city"
                className="suggest__input"
                type="text"
                value={inputSuggestValue}
                onChange={(event) => {
                  onChangeValue(event.target.value)
                  handleSuggest(event.target.value)
                  setOpenSuggest(true)
                }}
              />
            </div>
          )}
          {userWrite && openSuggest && (
            <ul className="suggest__items">
              <span className="suggest__items__label">Suggestions</span>
              {autoSuggest.map((suggest) => (
                <li
                  key={suggest.code}
                  className="suggest__item"
                  onClick={() => {
                    handleSelect(suggest.nom, zoneId, zoneData)
                    setOpenSuggest(false)
                  }}
                >
                  {suggest.nom}
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasData && <PictureGallery data={zoneData} onUpdatePictures={handleUpdatePictures} />}

        <div className="modal__form__submit">
          <span className="modal__form__error">{error}</span>
          {buttonSubmit ? (
            <input className="button--bordered" type="submit" value="Retour" />
          ) : (
            <input className="button--bordered" type="submit" value="Sauvegarder" />
          )}
        </div>
      </form>
    </div>
  )
}

Modal.propTypes = {
  handleUpdatePictures: PropTypes.func,
  handleSuggest: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  handleRenameZone: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeNamingZoneValue: PropTypes.func,
  zoneId: PropTypes.string.isRequired,
  inputSuggestValue: PropTypes.string,
  inputNamingZoneValue: PropTypes.string,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  autoSuggest: PropTypes.arrayOf(
    PropTypes.shape({
      _score: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      codeDepartement: PropTypes.string.isRequired,
      codeRegion: PropTypes.string.isRequired,
      codesPostaux: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      nom: PropTypes.string.isRequired,
      population: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  hasData: PropTypes.bool,
  zoneData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    municipalities: PropTypes.array,
  }).isRequired,
}

export default Modal
