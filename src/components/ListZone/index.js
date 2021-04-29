import './listzone.scss'
import { GoDiffIgnored } from 'react-icons/go'

const ListZone = ({ zoneSaved, editZone, handleTitleModal }) =>
	zoneSaved.length > 0 && (
		<main>
			<h2>Mes zones touristiques</h2>
			<span onClick={() => handleTitleModal('Editer les zones')}>
				<GoDiffIgnored size={16} onClick={editZone} />
			</span>

			<ul>
				{zoneSaved.map((zone, index) => (
					<li key={index}>{zone}</li>
				))}
			</ul>
		</main>
	)
export default ListZone
