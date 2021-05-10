import React from 'react'
import PropTypes from 'prop-types'
import { ReactSortable } from 'react-sortablejs'
import './pictureGallery.scss'

const PictureGallery = ({ data, onUpdatePictures }) => {
  return (
    <>
      {data.municipalities.map((municipality) => {
        const updatePictures = (picturesCollection) => {
          const updatedMunicipality = {
            ...municipality,
            pictures: picturesCollection,
          }

          onUpdatePictures(updatedMunicipality, data.id)
        }

        return (
          <div key={municipality.id}>
            <p className="modal__picture__label">{municipality.municipality}</p>
            <div className="modal__picture__wrapper">
              <ReactSortable animation={400} delay={5} list={municipality.pictures} setList={updatePictures}>
                {municipality.pictures.map((picture) => (
                  <img key={picture.id} src={picture.src} alt={picture.alt} className="modal__picture" />
                ))}
              </ReactSortable>
            </div>
          </div>
        )
      })}
    </>
  )
}

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
  ).isRequired,
  onUpdatePictures: PropTypes.func,
}

export default PictureGallery
