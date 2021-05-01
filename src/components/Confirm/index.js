//import './confirm.scss'

const Confirm = ({ handleRemove, handleCancel }) => {
	return (
		<>
			<div>
				<span>Confirmer la suppression de la zone</span>
			</div>
			<div>
				<button onClick={() => handleRemove()}>oui</button>
				<button onClick={() => handleCancel()}>non</button>
			</div>
		</>
	)
}

export default Confirm
