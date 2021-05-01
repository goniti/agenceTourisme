import './header.scss'
import { GoPlusSmall } from 'react-icons/go'
import PropTypes from 'prop-types'

const Header = ({ hasData, showModal, titleModal }) => {
	console.log(hasData)
	return (
		<header className="App__header" onClick={() => titleModal("Création d'une zone")}>
			{!hasData && <p className="App__header__text">Aucune zone enregistrée</p>}
			<button onClick={showModal} className="button--bordered">
				Ajouter une zone <GoPlusSmall size={16} />
			</button>
		</header>
	)
}

Header.propTypes = {
	hasData: PropTypes.bool.isRequired,
	showModal: PropTypes.func.isRequired,
	titleModal: PropTypes.func.isRequired,
}

export default Header
