import { useState } from 'react'
import { GoTasklist, GoX } from 'react-icons/go'

import './modal.scss'

const Modal = ({
	setSearch,
	inputValue,
	autoSuggest,
	zoneList,
	zoneImage,
	removeZone,
	handleSearch,
	handleSelect,
	handleSubmit,
	handleLimit,
	handleValidate,
	title,
	error,
}) => {
	const [openSuggest, setOpenSuggest] = useState(false)
	const suggestIsLoad = autoSuggest.length > 0
	const imageHasData = zoneImage.length !== 0

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
						{zoneList.map((zone, index) => (
							<span
								key={index}
								className="tag tag__primary"
								onClick={() => removeZone(index)}
							>
								{zone} <GoX size={16} />
							</span>
						))}
					</div>
					{handleLimit ? (
						<div className="suggest__validate">
							<span>{`${handleLimit[1]}`}</span>
							<div className="button--bordered" onClick={handleValidate}>
								Valider mes choix
								<span className="suggest__validate--icon">
									<GoTasklist size={16} />
								</span>
							</div>
						</div>
					) : (
						<div className="suggest__validate">
							<input
								id="city"
								className="suggest__input"
								type="text"
								value={inputValue}
								onChange={(event) => {
									handleSearch()
									setSearch(event.target.value)
									setOpenSuggest(true)
								}}
							/>
							<div className="button--bordered" onClick={handleValidate}>
								Valider mes choix
							</div>
						</div>
					)}
					{suggestIsLoad && openSuggest && (
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
				{imageHasData &&
					zoneImage.data.map((item, index) => (
						<div key={index} className="modal__picture__wrapper">
							<span className="modal__picture__label">{item.municipality}</span>
							<div className="modal__picture__content">
								{item.pictures.map((picture) => (
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
				<div className="modal__form__submit">
					<span className="modal__form__error">{error}</span>
					<input className="button--bordered" type="submit" value="Sauvegarder" />
				</div>
			</form>
		</div>
	)
}
export default Modal
