import './listzone.scss'

const ListZone = ({ zoneSaved }) => (
	<ul>
		{zoneSaved.map((zone, index) => (
			<li key={index}>{zone}</li>
		))}
	</ul>
)

export default ListZone
