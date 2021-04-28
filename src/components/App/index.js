import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import { useState } from 'react'


const App = () => {
	const [value,setValue] = useState("")

	return (
	<div className="App">
		{/* <Header /> */}
		<Modal setSearch={setValue} inputValue={value}/>
	</div>
)
}
export default App
