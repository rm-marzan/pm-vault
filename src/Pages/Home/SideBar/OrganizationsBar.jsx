import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import AddOrgModal from '../../../Modal/OrgModals/AddOrgModal';
import EditOrgModal from '../../../Modal/OrgModals/EditOrgModal';

const OrganizationsBar = ({ loading, orgData, setSelectMenu, setOrgData }) => {
    const [editOrgId, setEditOrgId] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const handleSelectMenu = (orgId, type) => {
        setSelectMenu({
          menuType: type,
          typeValue: orgId
        });
    }

    const handleEditModal = (id) => {
        setEditOrgId(id);
        setOpenEditModal(true);
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    Vaults
                </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div className="accordion-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item side-menu-item" onClick={() => handleSelectMenu(0, 'orgs')}>
                            <i className="bi bi-people-fill"></i> All Vaults
                        </li>
                        <li className="list-group-item side-menu-item" onClick={() => handleSelectMenu(0, 'me')}>
                            <i className="bi bi-person-fill"></i> My Vault
                        </li>
                            {loading ? (
                                <div className="loader">
                                    <BeatLoader color={'#1e2a3c'} loading={loading} size={20} />
                                </div>
                            ) : (
                                <>
                                    {orgData && orgData.map((data, index) => {
                                        return(
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center folder-list">
                                                <div className="side-menu-item" onClick={() => handleSelectMenu(data.id, "org")}>
                                                    <i className="bi bi-building-check"></i> {data.orgname.length > 15 ? data.orgname.slice(0, 15) + ".." :data.orgname}
                                                </div>
                                                <span>
                                                    <i className="bi bi-three-dots-vertical" onClick={()=>handleEditModal(data.id)}></i>
                                                </span>
                                            </li>
                                        )
                                    })}
                                </>
                            )}
                        <li className="list-group-item side-menu-item" onClick={()=>setOpenAddModal(true)}><i className="bi bi-plus"></i> Add Organization</li>
                    </ul>
                </div>
            </div>
            <AddOrgModal
                openAddModal = {openAddModal}
                setOpenAddModal = {setOpenAddModal}
                setOrgData = {setOrgData}
            />
            {editOrgId && 
                <EditOrgModal
                    orgId = {editOrgId}
                    openEditModal = {openEditModal}
                    setOpenEditModal = {setOpenEditModal}
                    setOrgData = {setOrgData}
                />
            }
        </div>
    )
}
export default OrganizationsBar;

