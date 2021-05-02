import './header.scss'
import { GoPlusSmall } from 'react-icons/go'
import PropTypes from 'prop-types'

const Header = ({ hasData, showModal }) => {
  return (
    <header className="App__header">
      {!hasData && <p className="App__header__text">Aucune zone enregistrée</p>}
      <button onClick={showModal} className="App__header__button button--bordered">
        Ajouter une zone <GoPlusSmall size={16} />
      </button>
    </header>
  )
}

Header.propTypes = {
  showModal: PropTypes.func.isRequired,
  hasData: PropTypes.bool.isRequired,
}

export default Header
