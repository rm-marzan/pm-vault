import { useState } from "react"
import { moveFolder } from "../../api/postData";
import { MenuItemConsumer } from "../../contexts/menuContext";

const MoveFolderModal = ({ selectedItems, setSelectedItems, setCheckAll, setItemsData, openPopup, setOpenPopup }) => {
    const [folderId, setFolderId] = useState('');

    const handleMoveFolder = () => {
        moveFolder(folderId, selectedItems, setOpenPopup, setSelectedItems, setCheckAll, setItemsData);
    }
    return (
        <div className={`modal ${openPopup ? 'show' : ''}`} style={{ display: `${openPopup ? 'block' : 'none'}` }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Move To Folder</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setOpenPopup(false)}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                        <div className="col-6 mb-4">
                                <label className="form-label fw-bold">Folders</label>
                                <select
                                    className="form-select"
                                    value={folderId}
                                    onChange={(e)=>setFolderId(e.target.value)}
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
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-start">
                        <button type="button" className="btn btn-dark" onClick={handleMoveFolder}>Move</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>{setOpenPopup(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoveFolderModal;