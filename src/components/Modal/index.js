import { useState } from 'react'
import { GoX } from 'react-icons/go'

import './modal.scss'

const Modal = ({
	handleSearch,
	handleSubmit,
	handleLimit,
	handleSelect,
	handleRemove,
	zoneId,
	cities,
	inputValue,
	onChangeValue,
	autoSuggest,
	zoneData,
	hasData,
	title,
	error,
}) => {
	const [openSuggest, setOpenSuggest] = useState(false)
	const userWrite = autoSuggest.length >= 0

	return (
		<div className="modal">
			<p className="modal__title">{title}</p>
			<p className="modal__subtitle">Nom de la zone</p>

			<form onSubmit={handleSubmit}>
				<div className="modal__form__suggest">
					<div className="suggest__city">
						<label htmlFor="city" className="suggest__label">
							Ville
						</label>
						{cities.map((city) => (
							<span key={city.id} className="tag tag__primary">
								{city.name}
								<i
									className="tag--icon-close"
									id={city.id}
									onClick={() => handleRemove(city.name, zoneId)}
								>
									<GoX size={16} />
								</i>
							</span>
						))}
					</div>
					{handleLimit ? (
						<div className="suggest__validate">
							La limite de ville pour cette zone est atteinte.
						</div>
					) : (
						<div className="suggest__validate">
							<input
								id="city"
								className="suggest__input"
								type="text"
								value={inputValue}
								onChange={(event) => {
									onChangeValue(event.target.value)
									setOpenSuggest(true)
									handleSearch()
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
						<div key={municipality.id} className="modal__picture__wrapper">
							<p className="modal__picture__label">{municipality.municipality}</p>

							{municipality.pictures.map((picture) => (
								<div key={picture.id}>
									<div className="modal__picture__content">
										<img
											src={picture.src}
											alt={picture.alt}
											className="modal__picture"
										></img>
									</div>
								</div>
							))}
						</div>
					))}
				<div className="modal__form__submit">
					<span className="modal__form__error">{error}</span>
					<input className="button--bordered" type="submit" value="Sauvegarder" />
				</div>
			</form>
		</div>
	)
}
export default Modal
