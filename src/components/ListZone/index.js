import './listzone.scss'
import { GoTrashcan } from 'react-icons/go'
import PropTypes from 'prop-types'

const ListZone = ({ dataZones, handleEdit, handleRemove }) => {
  return (
    <ul className="listzone">
      {dataZones.map((zone) => (
        <li key={zone.id} className="listzone__item">
          <i className="listzone__item__icon" onClick={() => handleRemove(zone.id)}>
            <GoTrashcan size={32} />
          </i>
          <span
            className="listzone__item__name"
            onClick={() => {
              handleEdit(zone.id)
            }}
          >
            {zone.title}
          </span>
        </li>
      ))}
    </ul>
  )
}

ListZone.propTypes = {
  dataZones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      municipalities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          municipality: PropTypes.string.isRequired,
          pictures: PropTypes.arrayOf(
            PropTypes.shape({
              alt: PropTypes.string.isRequired,
              id: PropTypes.string.isRequired,
              src: PropTypes.string.isRequired,
            }).isRequired,
          ).isRequired,
        }).isRequired,
      ).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleEdit: PropTypes.func,
  handleRemove: PropTypes.func,
}

export default ListZone
