import './App.scss'
import Header from '../Header'
import Modal from '../Modal'
import { useState } from 'react'

const App = () => {
	const [value, setValue] = useState('')
	console.log('onChange typing value', value)
	const onSubmit = () => {
		setValue('')
		console.log('submited', value)
	}

	return (
		<div className="App">
			{/* <Header /> */}

			<Modal setSearch={setValue} inputValue={value} handleSubmit={onSubmit} />
		</div>
	)
}
export default App
