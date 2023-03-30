import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import AddFolderModal from '../../../Modal/FolderModals/AddFolderModal';
import EditFolderModal from '../../../Modal/FolderModals/EditFolderModal';

const FoldersBar = ({ loading, folderData, setSelectMenu, setFolderData }) => {
    const [editFolderId, setEditFolderId] = useState(null);
    const [editFoldername, setEditFoldername] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    
    const handleSelectMenu = (folderId) => {
        setSelectMenu({
          menuType: 'folder',
          typeValue: folderId
        });
    }

    const handleEditModal = (folder_id, folder_name) => {
        setEditFolderId(folder_id);
        setEditFoldername(folder_name);
        setOpenEditModal(true);
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                Folders
            </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                <div className="accordion-body">
                    <ul className="list-group list-group-flush">
                        {loading ? (
                            <div className="loader">
                                <BeatLoader color={'#1e2a3c'} loading={loading} size={25} />
                            </div>
                        ) : (
                            <>
                                {folderData && folderData.map((data, index) => {
                                    return(
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center folder-list">
                                            <div className="side-menu-item" onClick={() => handleSelectMenu(data.id)}>
                                                <i className="bi bi-folder2"></i> {data.foldername.length > 15 ? data.foldername.slice(0, 15) + ".." :data.foldername}
                                            </div>
                                            <span>
                                                <i className="bi bi-three-dots-vertical" onClick={()=>handleEditModal(data.id, data.foldername)}></i>
                                            </span>
                                        </li>
                                    )
                                })}
                            </>
                        )}
                        <li className="list-group-item side-menu-item" onClick={()=>setOpenAddModal(true)}><i className="bi bi-plus"></i> Add Folder</li>
                    </ul>
                </div>
            </div>
            <AddFolderModal
                openAddModal = {openAddModal}
                setOpenAddModal = {setOpenAddModal}
                setFolderData = {setFolderData}
            />
            {editFolderId && 
                <EditFolderModal
                    folderId = {editFolderId}
                    foldername = {editFoldername}
                    openEditModal = {openEditModal}
                    setFoldername = {setEditFoldername}
                    setOpenEditModal = {setOpenEditModal}
                    setFolderData = {setFolderData}
                />
            }
        </div>
    )
}
export default FoldersBar;

