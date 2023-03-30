import { useState } from "react"
import { moveOrg } from "../../api/postData";
import { MenuItemConsumer } from "../../contexts/menuContext";

const MoveOrgModal = ({ selectedItems, setSelectedItems, setCheckAll, setItemsData, openPopup, setOpenPopup }) => {
    const [orgId, setOrgId] = useState('');
    const handleMoveOrg = () => {
        moveOrg(orgId, selectedItems, setOpenPopup, setSelectedItems, setCheckAll, setItemsData);
    }
    return (
        <div className={`modal ${openPopup ? 'show' : ''}`} style={{ display: `${openPopup ? 'block' : 'none'}` }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Move to Organization</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenPopup(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Organizations</label>
                                        <select
                                            className="form-select"
                                            value={orgId}
                                            onChange={(e)=>setOrgId(e.target.value)}
                                        >
                                            <option value="">---Select---</option>
                                            <MenuItemConsumer>
                                                {({ loading, orgData }) => {
                                                    return (
                                                        <>
                                                            {!loading && orgData.map((item, index) => (
                                                                <option key={index} value={item.id}>{item.orgname}</option>
                                                            ))}
                                                        </>
                                                    )
                                                }}
                                            </MenuItemConsumer>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-start">
                        <button type="button" className="btn btn-dark" onClick={handleMoveOrg}>Move</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>{setOpenPopup(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoveOrgModal;