import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const NoteModal = () => {
  var subtitle;
  const [showModal,setshowModal] = React.useState(false);
  function openModal() {
    setshowModal(true);
  }


  function closeModal(){
    setshowModal(false);
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

          <h2>Title of Modal</h2>
          
          <div>I am a modal</div>
          <form>
            <input placeholder="title"/>
            <input placeholder="description"/>
            <button onClick={closeModal}>close</button>
          </form>
        </Modal>
      </div>
    );
}

export default NoteModal