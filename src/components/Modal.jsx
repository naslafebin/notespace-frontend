import { useNavigate } from "react-router-dom"
import "./Modal.css"
import { toast } from "react-toastify"


const Modal = ({handleIsOpen, deleteNote}) => {

    const navigate = useNavigate()

    const handleDeleteNote = () => {
        deleteNote()
        navigate("/")
        toast.success("Note deleted successfully")

    }
  return (
    <div className="c-modal-overlay">
      <div className="c-modal">
        <button className="close-button" onClick={handleIsOpen}>×</button>
        <div className="c-modal-content">
          <h2>Delete Note</h2>
          <p>Do you want to delete this note?</p>
          <span className="d-flex justify-content-center">
            <button className="btn btn-danger me-3" onClick={handleDeleteNote}>Delete</button>
            <button className="btn btn-primary" onClick={handleIsOpen}>Cancel</button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Modal