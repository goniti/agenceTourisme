import './confirm.scss'

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

export default Confirm
