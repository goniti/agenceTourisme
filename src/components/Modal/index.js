import { useState } from 'react'
import { GoX } from 'react-icons/go'

import './modal.scss'

const Modal = ({
	handleSearch,
	handleSelect,
	handleSubmit,
	handleLimit,
	autoSuggest,
	inputValue,
	onChangeValue,
	zoneData,
	hasData,
	cities,
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
						{hasData &&
							cities.map((city, index) => (
								<span key={index} className="tag tag__primary">
									{city}{' '}
									<i className="tag--icon-close" id={index}>
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
										handleSelect(suggest.nom)
										setOpenSuggest(false)
									}}
								>
									{suggest.nom}
								</li>
							))}
						</ul>
					)}
				</div>
				{hasData &&
					zoneData.data.map((item) => (
						<div key={item.id} className="modal__picture__wrapper">
							{item.locations.map((location) => (
								<div key={location.id}>
									<span className="modal__picture__label">{location.municipality}</span>
									<div className="modal__picture__content">
										{location.pictures.map((picture) => (
											<img
												key={picture.id}
												src={picture.src}
												className="modal__picture"
												alt={picture.alt}
											></img>
										))}
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
