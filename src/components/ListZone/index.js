import './listzone.scss'
import { GoDiffIgnored, GoTrashcan } from 'react-icons/go'

const ListZone = ({ zoneSaved, editZone, removeZone, handleTitleModal }) =>
	zoneSaved.length > 0 && (
		<main className="listzone__wrapper">
			<div className="listzone__header">
				<h2>Mes zones touristiques</h2>
				<i
					className="listzone__icon"
					onClick={() => handleTitleModal('Editer les zones')}
				>
					<GoDiffIgnored size={22} onClick={editZone} />
				</i>
			</div>
			<ul className="listzone__content">
				{zoneSaved.map((zone, index) => (
					<li key={index} className="listzone__item"  onClick={() => removeZone(index)}>
						<i className="listzone__icon">
							<GoTrashcan size={16} />
						</i>
						{zone}
					</li>
				))}
			</ul>
		</main>
	)
export default ListZone
