import './modal.scss'
import { useState } from 'react'

const Modal = ({
	setSearch,
	inputValue,
	handleSearch,
	autoSuggest,
	handleSelect,
	handleLimit,
	zoneList,
}) => {
	const [openSuggest, setOpenSuggest] = useState(false)
	const imagesFake = ['Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5']
	const generateImage = () => {
		const random = Math.round(Math.random() * 1000)
		return `https://picsum.photos/180/180?random=${random}`
	}

	return (
		<div className="modal">
			<p className="modal__title">Création d'une zone</p>
			<p className="modal__subtitle">Nom de la zone</p>

			<form>
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
					{openSuggest && (
						<ul className="suggest__items">
							<span className="suggest__items__label">Suggestions</span>
							{autoSuggest.map((suggest) => (
								<li
									key={suggest}
									className="suggest__item"
									onClick={() => {
										handleSelect(suggest)
										setOpenSuggest(false)
									}}
								>
									{suggest}
								</li>
							))}
						</ul>
					)}
				</div>
				{zoneList.map((municipality) => (
					<>
						<span key={municipality} className="modal__picture__label">
							{municipality}
						</span>
						<div className="modal__picture__group">
							{imagesFake.map((image) => (
								<img
									key={image}
									src={generateImage()}
									className="modal__picture"
									alt={image}
								></img>
							))}
						</div>
					</>
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
