import EditLoginModal from "./EditLoginModal";
import EditCardModal from "./EditCardModal";
import EditIdentityModal from "./EditIdentityModal";
import { updateItem, deleteItem, restoreItem, permanentDeleteItem } from "../../api/postData";
import { getUserName } from "../../service";
import { MenuItemConsumer } from "../../contexts/menuContext";
import { useState } from "react";

const EditItemModal = ({ openPopup, setOpenPopup, singleItemData, setSingleItemData, setItemsData }) => {
    const itemId = singleItemData.id;
    const isDeleted = singleItemData.deleted_at;
    const [urlFields, setUrlFields] = useState('');

    const handleDeleteItem = () => {
        deleteItem(itemId, setOpenPopup, setItemsData);
    }

    const handlePermanentDeleteItem = () => {
        permanentDeleteItem(itemId, setOpenPopup, setItemsData);
    }

    const handleRestoreItem = () => {
        restoreItem(itemId, setOpenPopup, setItemsData);
    }

    const handleUpdateItem = () => {
        let myForm = new FormData();
        myForm.append("organization_id", singleItemData.organization_id ?? '');
        myForm.append("folder_id", singleItemData.folder_id ?? '');
        myForm.append("name", singleItemData.name ?? '');
        myForm.append("type", singleItemData.type ?? '');
        myForm.append("notes", singleItemData.notes ?? '');
        myForm.append("favorite", singleItemData.favorite ? 1 : 0);
        // Login
        if(singleItemData.type === 1){
            myForm.append("username", singleItemData.login?.username ?? '');
            myForm.append("password", singleItemData.login?.password ?? '');
            myForm.append("urls", singleItemData.login?.urls ?? '');
        }
        else if(singleItemData.type === 2){
            myForm.append("cardholder_name", singleItemData.card?.cardholder_name ?? '');
            myForm.append("brand", singleItemData.card?.brand ?? '');
            myForm.append("number", singleItemData.card?.number ?? '');
            myForm.append("exp_month", singleItemData.card?.exp_month ?? '');
            myForm.append("exp_year", singleItemData.card?.exp_year ?? '');
            myForm.append("cvv", singleItemData.card?.cvv ?? '');
        }
        // Identify
        else if(singleItemData.type === 3){
            myForm.append("title", singleItemData.identity?.title ?? '');
            myForm.append("username", singleItemData.identity?.username ?? '');
            myForm.append("first_name", singleItemData.identity?.first_name ?? '');
            myForm.append("middle_name", singleItemData.identity?.middle_name ?? '');
            myForm.append("last_name", singleItemData.identity?.last_name ?? '');
            myForm.append("address", singleItemData.identity?.address ?? '');
            myForm.append("phone", singleItemData.identity?.phone ?? '');
            myForm.append("email", singleItemData.identity?.email ?? '');
            myForm.append("security_number", singleItemData.identity?.security_number ?? '');
            myForm.append("license_number", singleItemData.identity?.license_number ?? '');
        }
        updateItem(itemId, myForm, setOpenPopup, setItemsData);
    }
    return (
        <div className={`modal ${openPopup ? 'show' : ''}`} style={{ display: `${openPopup ? 'block' : 'none'}` }}>
            <div className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: "60%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">EDIT ITEM</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenPopup(false)}}></button>
                    </div>
                    <div className="modal-body">
                        {singleItemData && 
                            <div className="row">
                                <div className="col-6 mb-4">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" placeholder="Name"
                                        value={singleItemData.name ?? ''}
                                        onChange={(e)=>setSingleItemData(prevState => ({
                                            ...prevState,
                                            name: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="col-6 mb-4">
                                <label className="form-label fw-bold">Folder</label>
                                <select
                                    className="form-select"
                                    value={singleItemData.folder_id ?? ''}
                                    onChange={(e)=>setSingleItemData(prevState => ({
                                        ...prevState,
                                        folder_id: e.target.value
                                    }))}
                                >
                                    <option value=''>-- Select --</option>
                                    <MenuItemConsumer>
                                        {({ loading, folderData }) => {
                                            return (
                                                <>
                                                    {!loading && folderData.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.foldername}</option>
                                                    ))}
                                                </>
                                            )
                                        }}
                                    </MenuItemConsumer>
                                </select>
                            </div>
                                {singleItemData.type === 1 &&
                                    <EditLoginModal
                                        singleItemData = {singleItemData}
                                        urlFields = {urlFields}
                                        setSingleItemData = {setSingleItemData}
                                        setUrlFields = {setUrlFields}
                                    />
                                }
                                {singleItemData.type === 2 &&
                                    <EditCardModal
                                        singleItemData = {singleItemData}
                                        setSingleItemData = {setSingleItemData}
                                    />
                                }
                                {singleItemData.type === 3 &&
                                    <EditIdentityModal
                                        singleItemData = {singleItemData}
                                        setSingleItemData = {setSingleItemData}
                                    />
                                }
                                <div className="col-12 mb-4">
                                    <label className="form-label">Notes</label>
                                    <textarea className="form-control" rows="3"
                                        value={singleItemData.notes ?? ''}
                                        onChange={(e)=>setSingleItemData(prevState => ({
                                            ...prevState,
                                            notes: e.target.value
                                        }))}
                                    ></textarea>
                                </div>
                                <div className="col-12 mb-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="form-label fw-bold">Who owns this item?</label>
                                            <select
                                                className="form-select"
                                                value={singleItemData.organization_id ?? ''}
                                                onChange={(e)=>setSingleItemData(prevState => ({
                                                    ...prevState,
                                                    organization_id: e.target.value
                                                }))}
                                            >
                                                <option value="">{getUserName()}</option>
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
                                <div className="col-12 mb-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="favCheckbox" className="form-label fw-bold">Favorite</label>
                                            <span className="mx-1"></span>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="favCheckbox"
                                                checked={singleItemData.favorite ?? 0}
                                                onChange={(e)=>setSingleItemData(prevState => ({
                                                    ...prevState,
                                                    favorite: e.target.checked ? 1 : 0
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer bg-light justify-content-between">
                        {isDeleted ? (
                            <>
                                <div>
                                    <button type="button" className="btn btn-dark" onClick={handleRestoreItem}>Restore</button>
                                    <span className="mx-2"></span>
                                    <button type="button" className="btn btn-secondary" onClick={()=>{setOpenPopup(false)}}>Cancel</button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={handlePermanentDeleteItem}>Permanently Delete</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <button type="button" className="btn btn-dark" onClick={handleUpdateItem}>Update</button>
                                    <span className="mx-2"></span>
                                    <button type="button" className="btn btn-secondary" onClick={()=>{setOpenPopup(false)}}>Cancel</button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteItem}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )
  }
  export default EditItemModal;