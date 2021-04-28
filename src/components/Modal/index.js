import './modal.scss'

const Modal = ({ setSearch, inputValue, handleSearch, autoSuggest }) => {
	const generateImage = () => {
		const random = Math.round(Math.random() * 1000)
		return `https://picsum.photos/180/180?random=${random}`
	}
	const imagesFake = ['Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5']
	const inputIsEmpty = inputValue.length === 0
	return (
		<div className="modal">
			<p className="modal__title">Création d'une zone</p>
			<p className="modal__subtitle">Nom de la zone</p>

			<form>
				<div className="modal__form__suggest">
					<label htmlFor="city" className="suggest__label">
						Ville
					</label>
					<input
						id="city"
						className="suggest__input"
						type="text"
						value={inputValue}
						onChange={(event) => {
							setSearch(event.target.value)
							handleSearch()
						}}
					/>
					{!inputIsEmpty && (
						<ul className="suggest__items">
							<span className="suggest__items__label">Suggestions</span>
							{autoSuggest.map((suggest) => (
								<li key={suggest} className="suggest__item">
									{suggest}
								</li>
							))}
						</ul>
					)}
				</div>

				<span className="modal__picture__label">Images</span>
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
