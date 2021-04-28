import './modal.scss'

const Modal = () => {
	const randomNumber= Math.round(Math.random())
	let count = 0
return (
	<div className="modal">
		<p className="modal__title">Création d'une zone</p>
		<p className="modal__subtitle">Nom de la zone</p>

		<form>
			<div className="modal__form__suggest">
				<label htmlFor="city" className="suggest__label">
					Ville
				</label>
				<input id="city" className="suggest__input" type="text" />
				<ul className="suggest__items">
					<span className="suggest__items__label">Suggestions</span>
					<li className="suggest__item">Paris</li>
					<li className="suggest__item">Grésy sur aix</li>
					<li className="suggest__item">Grenoble</li>
				</ul>
			</div>

			<span className="modal__picture__label">Images</span>
			<div className="modal__picture__group">
				<img src={`https://picsum.photos/180/180?random=${randomNumber+count}${count++}`} className="modal__picture" alt="Zone touristique"></img>
				<img src={`https://picsum.photos/180/180?random=${randomNumber+count}${count++}`} className="modal__picture" alt="Zone touristique"></img>
				<img src={`https://picsum.photos/180/180?random=${randomNumber+count}${count++}`} className="modal__picture" alt="Zone touristique"></img>
				<img src={`https://picsum.photos/180/180?random=${randomNumber+count}${count++}`} className="modal__picture" alt="Zone touristique"></img>
				<img src={`https://picsum.photos/180/180?random=${randomNumber+count}${count++}`} className="modal__picture" alt="Zone touristique"></img>
			</div>
			<div className="modal__form__submit">
			<input className="button--bordered" type="submit" value="Sauvegarder" />
			</div>
		</form>
	</div>
)
}
export default Modal
