import './header.scss'


function header() {
  return (
    <header className="App__header">
        <p className="App__header--text">Aucune zone enregistrer</p>
        <button className="App__header--button App__header--button-add">Creez en une</button>
    </header>
  )
}

export default header