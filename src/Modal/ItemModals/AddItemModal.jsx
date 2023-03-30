import { useState } from "react";
import AddLoginModal from "./AddLoginModal";
import AddCardModal from "./AddCardModal";
import AddIdentityModal from "./AddIdentityModal";
import { getUserID, getUserName } from "../../service";
import { MenuItemConsumer } from "../../contexts/menuContext";
import { addItem } from "../../api/postData";
import { toast } from "react-toastify";
import Variables from "../../constants/variables";
import Validation from "../../validation/validation";

const AddItemModal = ({ setItemsData, openPopup, setOpenPopup }) => {
    const userId = getUserID();
    const types = Variables.types;

    const fieldValues= {  selectItemType: 1,  organizationId: '',  folderId: '',  itemName: '',  note: '',  favorite: '',  loginUsername: '',  loginPassword: '',  loginUrls: [''],  cardCardholderName: '',  cardBrand: '',  cardNumber: '',  cardExpMonth: '',  cardExpYear: '',  cardCvv: '',  identityTitle: '',  identityUsername: '',  identityFirstName: '',  identityMiddleName: '',  identityLastName: '',  identityAddress: '',  identityPhone: '',  identityEmail: '',  identitySecurityNumber: '',  identityLicenseNumber: ''};
    const[stateValues ,setstateValues] = useState({...fieldValues});

    const handleAddItem = (e) => {
        e.preventDefault();
        if(stateValues.itemName.length === 0 || stateValues.itemName.length > 50){
            toast.error("Invalid Name Format");
        }
        else if(stateValues.loginUsername && !(Validation.nameRegex).test(stateValues.loginUsername)){
            toast.error("Invalid userame format");
        }
        else{
            let myForm = new FormData();
            myForm.append("user_id", userId);
            myForm.append("organization_id", stateValues.organizationId);
            myForm.append("folder_id", stateValues.folderId);
            myForm.append("name", stateValues.itemName);
            myForm.append("type", stateValues.selectItemType);
            myForm.append("notes", stateValues.note);
            myForm.append("favorite", stateValues.favorite ? 1 : 0);
    
            if(stateValues.selectItemType === 1){
                myForm.append("username", stateValues.loginUsername);
                myForm.append("password", stateValues.loginPassword);
                myForm.append("urls", stateValues.loginUrls);
            }
            else if(stateValues.selectItemType === 2){
                myForm.append("cardholder_name", stateValues.cardCardholderName);
                myForm.append("brand", stateValues.cardBrand);
                myForm.append("number", stateValues.cardNumber);
                myForm.append("exp_month", stateValues.cardExpMonth);
                myForm.append("exp_year", stateValues.cardExpYear);
                myForm.append("cvv", stateValues.cardCvv);
            }
            else if(stateValues.selectItemType === 3){
                myForm.append("title", stateValues.identityTitle);
                myForm.append("username", stateValues.identityUsername);
                myForm.append("first_name", stateValues.identityFirstName);
                myForm.append("middle_name", stateValues.identityMiddleName);
                myForm.append("last_name", stateValues.identityLastName);
                myForm.append("address", stateValues.identityAddress);
                myForm.append("phone", stateValues.identityPhone);
                myForm.append("email", stateValues.identityEmail);
                myForm.append("security_number", stateValues.identitySecurityNumber);
                myForm.append("license_number", stateValues.identityLicenseNumber);
            }
            // Api Call
            addItem(myForm, setOpenPopup, fieldValues, setstateValues, setItemsData);
        }
    }
    return (
        <div className={`modal ${openPopup ? 'show' : ''}`} style={{ display: `${openPopup ? 'block' : 'none'}` }}>
            <div className="modal-dialog modal-dialog-scrollable modal__width">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add New ITEM</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenPopup(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">What type of item is this?</label>
                                        <select
                                            className="form-select"
                                            value={stateValues.selectItemType}
                                            onChange={(e)=>setstateValues({...stateValues, selectItemType: parseInt(e.target.value)})}
                                        >
                                            {types.map((data, index) => (
                                                <option key={index} value={data.id}>{data.type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-4">
                                <label className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" placeholder="Name" required value={stateValues.itemName} onChange={(e)=>setstateValues({...stateValues, itemName: e.target.value})}/>
                            </div>
                            <div className="col-6 mb-4">
                                <label className="form-label fw-bold">Folder</label>
                                <select
                                    className="form-select"
                                    value={stateValues.folderId}
                                    onChange={(e)=>setstateValues({...stateValues, folderId: e.target.value})}
                                >
                                <option value={null}>-- Select --</option>
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
                            {stateValues.selectItemType === 1 &&
                                <AddLoginModal
                                    stateValues={stateValues}
                                    setstateValues={setstateValues}
                                />
                            }
                            {stateValues.selectItemType === 2 &&
                                <AddCardModal
                                    stateValues={stateValues}
                                    setstateValues={setstateValues}
                                />
                            }
                            {stateValues.selectItemType === 3 &&
                                <AddIdentityModal
                                    stateValues={stateValues}
                                    setstateValues={setstateValues}
                                />
                            }
                            <div className="col-12 mb-4">
                                <label className="form-label fw-bold">Notes</label>
                                <textarea className="form-control" rows="3" value={stateValues.note} onChange={(e)=>setstateValues({...stateValues, note: e.target.value})}/>
                            </div>
                            <div className="col-12 mb-4">
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Who owns this item?</label>
                                        <select
                                            className="form-select"
                                            value={stateValues.organizationId}
                                            onChange={(e)=>setstateValues({...stateValues, organizationId: e.target.value})}
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
                                            checked={stateValues.favorite}
                                            onChange={(e)=>setstateValues({...stateValues, favorite: e.target.checked ? 1 : 0})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-start">
                        <button type="button" className="btn btn-dark" onClick={handleAddItem}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>{setOpenPopup(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddItemModal;
