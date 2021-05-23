import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const NoteModal = ({ Title, titlePH, descriptionPH }) => {
  const [showModal, setshowModal] = React.useState(false)
  function openModal() {
    setshowModal(true)
  }

  function closeModal() {
    setshowModal(false)
  }
  function addNote() {
    // integration or backend code for adding to specific database
  }

  return (
    <div>
      <button onClick={openModal}>Add Note</button>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{Title}</h2>

        <form>
          <input type="text" placeholder={titlePH} />
          <br />
          <textarea type="text" placeholder={descriptionPH} />
          <br />
          <button onClick={addNote}>Add</button>
          <button onClick={closeModal}>close</button>
        </form>
      </Modal>
    </div>
  )
}

export default NoteModal
