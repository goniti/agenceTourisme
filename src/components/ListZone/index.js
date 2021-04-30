import './listzone.scss'
import { GoDiffIgnored, GoTrashcan } from 'react-icons/go'
import PropTypes from 'prop-types'

const ListZone = ({ listPlaces, editZone, removeZone, handleTitleModal }) =>
	Object.entries(listPlaces).length !== 0 && (
		<main className="listzone__wrapper">
			<div className="listzone__header">
				<h2>Mes zones touristiques</h2>
				<i className="listzone__icon" onClick={() => handleTitleModal('Editer les zones')}>
					<GoDiffIgnored size={22} onClick={editZone} />
				</i>
			</div>
			<ul className="listzone__content">
				{listPlaces.data.map((zone, index) => (
					<div key={index}>
						<li className="listzone__item" onClick={() => removeZone(index)}>
							<i className="listzone__icon">
								<GoTrashcan size={16} />
							</i>
							{zone.municipality}
						</li>
						<div className="listzone__picture__container">
							{zone.pictures.map((picture) => (
								<img
									key={picture.id}
									src={picture.src}
									className="modal__picture"
									alt={picture.alt}
								></img>
							))}
						</div>
					</div>
				))}
			</ul>
		</main>
	)

ListZone.propTypes = {
	listPlaces: PropTypes.shape({
		data: PropTypes.arrayOf(
			PropTypes.shape({
				municipality: PropTypes.string,
				pictures: PropTypes.arrayOf(
					PropTypes.shape({
						alt: PropTypes.string,
						id: PropTypes.string,
						src: PropTypes.string,
					}).isRequired
				),
			})
		),
	}),
	editZone: PropTypes.func,
	handleTitleModal: PropTypes.func,
	removeZone: PropTypes.func,
}

export default ListZone
