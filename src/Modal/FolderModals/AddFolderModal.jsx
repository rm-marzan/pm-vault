import { useState } from "react"
import { addFolder } from "../../api/postData";
import { getUserID } from "../../service";
import { toast } from "react-toastify";

const AddFolderModal = ({ openAddModal, setOpenAddModal, setFolderData }) => {
    const userId = getUserID();
    const [foldername, setFoldername] = useState('');

    const handleAddFolder = (e) => {
        e.preventDefault();
        if(foldername.length === 0 || foldername > 50){
            toast.error("Invalid Input For Folder Name");
        }
        else{
            let myForm = new FormData();
            myForm.append("user_id", userId);
            myForm.append("foldername", foldername);
            addFolder(myForm, setOpenAddModal, setFoldername, setFolderData);
        }
    }
    return (
        <div className={`modal ${openAddModal ? 'show' : ''}`} style={{ display: `${openAddModal ? 'block' : 'none'}` }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add New Folder</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenAddModal(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <label className="form-label fw-bold">Folder Name</label>
                                <input type="text" className="form-control" placeholder="Name" 
                                    required
                                    value={foldername}
                                    onChange={(e)=>setFoldername(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-start">
                        <button type="button" className="btn btn-dark" onClick={handleAddFolder}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>{setOpenAddModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFolderModal;