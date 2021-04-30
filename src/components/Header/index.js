import './header.scss'
import { GoPlusSmall } from 'react-icons/go'

const Header = ({ handleTitleModal, touristPlaces, showModal }) => {
	const noPlaces = Object.entries(touristPlaces).length === 0
	let canStillSave = false
	let remainingZone = 0

	if (!noPlaces) {
		const countZone = Object.entries(touristPlaces).length
		const limitZone = 3
		canStillSave = touristPlaces.data.length < limitZone
		remainingZone = limitZone - countZone
	}

	return (
		<header className="App__header" onClick={() => handleTitleModal("Création d'une zone")}>
			{noPlaces && (
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
