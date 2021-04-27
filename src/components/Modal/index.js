import './modal.scss'

const Modal = () => (
	<div className="modal">
		<p className="modal__title">Création d'une zone</p>
		<p className="modal__subtitle">Nom de la zone</p>

		<form className="modal__form">
			<label className="modal__form__label">Ville</label>
			<input type="text" />
         <ul>
            SUGGESTIONS
            <li>Paris</li>
            <li>Grésy sur aix</li>
            <li>Grenoble</li>
         </ul>

			<span>Images</span>
         <div className="modal__picture__group">
				<img className="modal__picture" alt="Zone touristique"></img>
				<img className="modal__picture" alt="Zone touristique"></img>
				<img className="modal__picture" alt="Zone touristique"></img>
				<img className="modal__picture" alt="Zone touristique"></img>
				<img className="modal__picture" alt="Zone touristique"></img>
			</div>

         <input type='submit' value="Sauvegarder" />
		</form>
	</div>
)

export default Modal
