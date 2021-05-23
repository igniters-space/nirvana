import React, { useRef } from 'react'
import Modal from 'react-modal'
import axe from '../utils/api'

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

const NoteModal = ({ Title, titlePH, descriptionPH, type }) => {
  const [showModal, setshowModal] = React.useState(false)
  const titleR = useRef()
  const descR = useRef()
  function openModal() {
    setshowModal(true)
  }

  function closeModal(e) {
    setshowModal(false)
  }
  async function addNote(e) {
    e.preventDefault()
    await axe.post(`/jars/${type}`, {
      title: titleR.current.value,
      description: descR.current.value,
    })
    closeModal()
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
          <input ref={titleR} type="text" placeholder={titlePH} />
          <br />
          <textarea ref={descR} type="text" placeholder={descriptionPH} />
          <br />
          <button onClick={addNote}>Add</button>
          <button onClick={closeModal}>close</button>
        </form>
      </Modal>
    </div>
  )
}

export default NoteModal
