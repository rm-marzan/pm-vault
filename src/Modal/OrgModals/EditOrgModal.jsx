import { deleteOrg } from "../../api/postData";

const EditOrgModal = ({ orgId, openEditModal, setOpenEditModal, setOrgData }) => {
    const handleDeleteOrg = () => {
        deleteOrg(orgId, setOpenEditModal, setOrgData);
    }
    return (
        <div className={`modal ${openEditModal ? 'show' : ''}`} style={{ display: `${openEditModal ? 'block' : 'none'}` }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Leave Organization?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenEditModal(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <button type="button" className="btn btn-danger" onClick={handleDeleteOrg}>Leave</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrgModal;