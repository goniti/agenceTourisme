import './modal.scss'
import { useState } from 'react'

const Modal = ({
	setSearch,
	inputValue,
	autoSuggest,
	zoneList,
	handleSearch,
	handleSelect,
	handleSubmit,
	handleLimit,
}) => {
	const [openSuggest, setOpenSuggest] = useState(false)
	const suggestIsLoad = autoSuggest.length > 0
	const imagesFake = ['Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5']
	const generateImage = () => {
		const random = Math.round(Math.random() * 1000)
		return `https://picsum.photos/180/180?random=${random}`
	}

	return (
		<div className="modal">
			<p className="modal__title">Création d'une zone</p>
			<p className="modal__subtitle">Nom de la zone</p>

			<form onSubmit={handleSubmit}>
				<div className="modal__form__suggest">
					<label htmlFor="city" className="suggest__label">
						Ville
					</label>
					{handleLimit ? (
						<span>{`${handleLimit[1]}`}</span>
					) : (
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
				{zoneList.map((municipality, index) => (
					<div key={index} className="modal__picture__wrapper">
						<span className="modal__picture__label">{municipality}</span>
						<div className="modal__picture__content">
							{imagesFake.map((image) => (
								<img
									key={image}
									src={generateImage()}
									className="modal__picture"
									alt={image}
								></img>
							))}
						</div>
					</div>
				))}
				<div className="modal__form__submit">
					<input
						className="button--bordered"
						type="submit"
						value="Sauvegarder"
					/>
				</div>
			</form>
		</div>
	)
}
export default Modal
