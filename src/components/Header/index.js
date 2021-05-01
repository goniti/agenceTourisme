import './header.scss'
import PropTypes from 'prop-types'
import { GoPlusSmall } from 'react-icons/go'

const Header = ({ handleTitleModal, touristPlaces, showModal }) => {
	console.log(touristPlaces)
	const noPlaces = Object.entries(touristPlaces).length === 0

	return (
		<header className="App__header" onClick={() => handleTitleModal("Création d'une zone")}>
			{noPlaces && <p className="App__header__text">Aucune zone enregistrée</p>}
			<button onClick={showModal} className="button--bordered">
				Ajouter une zone <GoPlusSmall size={16} />
			</button>
		</header>
	)
}

Header.propTypes = {
	touristPlaces: PropTypes.shape({
		data: PropTypes.arrayOf(
			PropTypes.shape({
				municipality: PropTypes.string,
				pictures: PropTypes.arrayOf(
					PropTypes.shape({
						alt: PropTypes.string,
						id: PropTypes.string,
						src: PropTypes.string,
					}).isRequired
				),
			})
		),
	}),
}

export default Header
