import './header.scss'

const Header = ({createList}) => (
	<header className="App__header">
		<p className="App__header__text">Aucune zone enregistrer</p>
		<button onClick={createList} className="App__header__button App__header__button--add">
			Creez en une
		</button>
	</header>
)

export default Header
