import './header.scss'

const Header = ({ createList, touristList }) => {
	const limitZone = 3 // the 0 is taken into account
	const numberOfzone = touristList.length
	const remainingZone = limitZone - numberOfzone
	const noZone = numberOfzone === 0
	const canStillSave = numberOfzone > 0 && numberOfzone < limitZone

	return (
		<header className="App__header">
			{noZone && (
				<>
					<p className="App__header__text">Aucune zone enregistrée</p>
					<button onClick={createList} className="button--bordered">
						Créez en une
					</button>
				</>
			)}
			{canStillSave && (
				<>
					<p>{`Vous pouvez encore enregistrer ${remainingZone} zone(s)`}</p>
					<button className="button--bordered" onClick={createList}>
						Ajouter
					</button>
				</>
			)}
		</header>
	)
}

export default Header
