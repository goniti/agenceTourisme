import './header.scss'

const Header = ({ createList, touristList }) => {
	const limitZone = 3 // the 0 is taken into account
	const numberOfzone = touristList.length
	const remainingZone = limitZone - numberOfzone
	const noZone = numberOfzone === 0
	const canStillSave = numberOfzone > 0 && numberOfzone < limitZone

	const setShowButton = () => {
		if (noZone) {
			return console.log('Aucune zone enregistrée')
		} else if (canStillSave) {
			return console.log(
				`Vous pouvez encore enregistrer ${remainingZone} zone(s).`
			)
		} else return console.log('hide')
	}

	return (
		<header className="App__header">
			<p className="App__header__text">Aucune zone enregistrée</p>
			<button
				onClick={createList}
				className="App__header__button App__header__button--add"
			>
				Créez en une
			</button>
			{setShowButton()}
			<p>Vous pouvez encore enregistrer x zones.</p>
			<button>Ajouter</button>
		</header>
	)
}

export default Header
