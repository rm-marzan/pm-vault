import { updateFolder, deleteFolder } from "../../api/postData";
import { toast } from "react-toastify";

const EditFolderModal = ({ folderId, foldername, setFoldername, openEditModal, setOpenEditModal, setFolderData }) => {
    const handleDeleteFolder = () => {
        deleteFolder(folderId, setOpenEditModal, setFolderData);
    }

    const handleEditFolder = () => {
        if(foldername.length === 0 || foldername > 50){
            toast.error("Invalid Input For Folder Name");
        }
        else{
            let myForm = new FormData();
            myForm.append("foldername", foldername);
            updateFolder(myForm, folderId, setOpenEditModal, setFoldername, setFolderData);
        }
    }
    return (
        <div className={`modal ${openEditModal ? 'show' : ''}`} style={{ display: `${openEditModal ? 'block' : 'none'}` }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Folder</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenEditModal(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <label className="form-label fw-bold">Folder Name</label>
                                <input type="text" className="form-control" placeholder="Name" 
                                    value={foldername}
                                    onChange={(e)=>setFoldername(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-between">
                        <div>
                        <button type="button" className="btn btn-dark" onClick={handleEditFolder}>Update</button>
                            <span className="mx-2"></span>
                            <button type="button" className="btn btn-secondary" onClick={()=>{setOpenEditModal(false)}}>Cancel</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteFolder}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFolderModal;