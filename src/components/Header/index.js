import './header.scss'
import { GoPlusSmall } from 'react-icons/go'

const Header = ({ handleTitleModal, touristList, showModal }) => {
	const limitZone = 3 // the 0 is taken into account
	const numberOfzone = touristList.length
	const remainingZone = limitZone - numberOfzone
	const noZone = numberOfzone === 0
	const canStillSave = numberOfzone > 0 && numberOfzone < limitZone

	return (
		<header
			className="App__header"
			onClick={() => handleTitleModal("Création d'une zone")}
		>
			{noZone && (
				<>
					<p className="App__header__text">Aucune zone enregistrée</p>
					<button onClick={showModal} className="button--bordered">
						Créez en une
					</button>
				</>
			)}
			{canStillSave && (
				<>
					<p>{`Vous pouvez encore enregistrer ${remainingZone} zone(s)`}</p>
					<button className="button--bordered" onClick={showModal}>
						Ajouter
						<GoPlusSmall size={16} />
					</button>
				</>
			)}
		</header>
	)
}

export default Header
