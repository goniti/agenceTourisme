import './listzone.scss'
import { GoX } from 'react-icons/go'

const ListZone = ({ dataZones, handleEdit, handleRemove }) => {
	return (
		<ul>
			{dataZones.map((zone) => (
				<li key={zone.id}>
					<span onClick={() => handleRemove(zone.id)}>
						<GoX size={16} />
					</span>{' '}
					<span onClick={() => handleEdit(zone.id)}>{zone.title}</span>
				</li>
			))}
		</ul>
	)
}

export default ListZone
