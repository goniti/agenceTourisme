import './header.scss'

const Header = ({ createList }) => (
	<header className="App__header">
		<p className="App__header__text">Aucune zone enregistrée</p>
		<button
			onClick={createList}
			className="App__header__button App__header__button--add"
		>
			Créez en une
		</button>
	</header>
)

export default Header
