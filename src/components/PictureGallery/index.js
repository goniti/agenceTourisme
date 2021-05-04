import React from 'react'
import PropTypes from 'prop-types'

const PictureGallery = ({data}) => {
return (
  <>
    {data.municipalities.map((municipality) => (
      <div key={municipality.id}>
        <p className="modal__picture__label">{municipality.municipality}</p>
        <div className="modal__picture__wrapper">
          {municipality.pictures.map((picture) => (
            <img key={picture.id} src={picture.src} alt={picture.alt} className='modal__picture'/>
          ))}
        </div>
      </div>
    ))}
  </>
)}

PictureGallery.propTypes = {
  data: PropTypes.shape(
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
            }),
          ),
        }),
      ).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired
}

export default PictureGallery
