import './confirm.scss'
import React from 'react'
import PropTypes from 'prop-types'

const Confirm = ({ handleRemove, handleCancel }) => {
  return (
    <main className="confirm">
      <div className="confirm__wrapper">
        <p className="confirm__title">Confirmer la suppression de la zone</p>

        <div className="confirm__buttons">
          <button className="confirm__button button--bordered button--bordered--danger" onClick={() => handleRemove()}>
            oui
          </button>
          <button className="confirm__button button--bordered" onClick={() => handleCancel()}>
            non
          </button>
        </div>
      </div>
    </main>
  )
}

Confirm.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
}
export default Confirm
