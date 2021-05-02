import { useState } from 'react'
import { GoX } from 'react-icons/go'
import PropTypes from 'prop-types'

import './modal.scss'

const Modal = ({
  handleSuggest,
  handleSubmit,
  handleSelect,
  handleRemove,
  handleNaming,
  zoneId,
  cities,
  inputSuggestValue,
  onChangeValue,
  inputNamingValue,
  onChangeNamingValue,
  autoSuggest,
  zoneData,
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
        value={inputNamingValue}
        onChange={(event) => {
          handleNaming()
          onChangeNamingValue(event.target.value)
        }}
      ></input>

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
        {zoneData &&
          zoneData.municipalities.map((municipality) => (
            <div key={municipality.id}>
              <p className="modal__picture__label">{municipality.municipality}</p>
              <div className="modal__picture__wrapper">
                {municipality.pictures.map((picture) => (
                  <img key={picture.id} src={picture.src} alt={picture.alt} className="modal__picture"></img>
                ))}
              </div>
            </div>
          ))}
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
  handleSuggest: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  handleNaming: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeNamingValue: PropTypes.func,
  zoneId: PropTypes.string.isRequired,
  inputSuggestValue: PropTypes.string,
  inputNamingValue: PropTypes.string,
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
}

export default Modal
