import { useState } from "react"
import { addOrg } from "../../api/postData";
import { getUserID } from "../../service";
import Validation from "../../validation/validation";
import { toast } from "react-toastify";

const AddOrgModal = ({  openAddModal, setOpenAddModal, setOrgData }) => {
    const userId = getUserID();
    const [orgname, setOrgname] = useState('');
    const [email, setEmail] = useState('');
    
    const handleAddOrg = (e) => {
        e.preventDefault();
        if(orgname.length === 0 || orgname > 50){
            toast.error("Invalid Input For Name");
        }
        else if(!(Validation.emailRegex).test(email)){
            toast.error("Invalid Email");
        }
        else{
            let myForm = new FormData();
            myForm.append("user_id", userId);
            myForm.append("orgname", orgname);
            myForm.append("email", email);
            addOrg(myForm, setOpenAddModal, setOrgname, setEmail, setOrgData);
        }
    }
    return (
        <div className={`modal ${openAddModal ? 'show' : ''}`} style={{ display: `${openAddModal ? 'block' : 'none'}` }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Organization</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenAddModal(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <label className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" placeholder="Name" 
                                    required
                                    value={orgname}
                                    onChange={(e)=>setOrgname(e.target.value)}
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <label className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" placeholder="Email" 
                                    required
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-start">
                        <button type="button" className="btn btn-dark" onClick={handleAddOrg}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>{setOpenAddModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrgModal;
