import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { getItemsData } from "../../../api/getData";
import { deleteSingleItem, deleteItems, permanentDeleteSingleItem, permanentDeleteItems, restoreSingleItem } from "../../../api/postData";
import { MdMoveUp, MdOutlineDeleteOutline, MdOutlineDriveFolderUpload } from "react-icons/md";
import EditItemModal from '../../../Modal/ItemModals/EditItemModal';
import AddItemModal from '../../../Modal/ItemModals/AddItemModal';
import MoveFolderModal from "../../../Modal/FolderModals/MoveFolderModal";
import MoveOrgModal from "../../../Modal/OrgModals/MoveOrgModal";
import './item.scss';
import "./itemsDropdown.scss";

const ItemList = ({ selectMenu }) => {
  const [loading, setLoading] = useState(true);
  const [itemsData, setItemsData] = useState("");

  const [singleItemData, setSingleItemData] = useState('');
  const [openPopup, setOpenPopup] = useState(false);

  const [checkAll, setCheckAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);
  const [openMoveOrgModal, setOpenMoveOrgModal] = useState(false);
  
  const handleOpenPopup = (item) => {
    setSingleItemData(item);
    setOpenPopup(true);
  }

  const handleItemSelect = (id) => {
    setCheckAll(false);
    if(selectedItems.includes(id)){
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter(ItemId => 
        ItemId !== id
      ));
    }
    else{
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    setCheckAll((prevCheckAll) =>
      !prevCheckAll
    );
    if(checkAll){
      setSelectedItems([]);
    }
    else{
      setSelectedItems(filteredItems().map((item) => item.id));
    }
  };

  const handleRestoreSingleItem = (itemId) => {
    restoreSingleItem(itemId, setItemsData);
  }

  const handleDeleteSingleItem = (itemId) => {
    deleteSingleItem(itemId, setItemsData);
  }

  const handlePermanentDeleteSingleItem = (itemId) => {
    permanentDeleteSingleItem(itemId, setItemsData);
  }

  const handleDeleteItems = () => {
    if(selectMenu.menuType === 'trash'){
      permanentDeleteItems(selectedItems, setItemsData, setCheckAll, setSelectedItems);
    }
    else{
      deleteItems(selectedItems, setItemsData, setCheckAll, setSelectedItems);
    }
  }

  useEffect(() => {
    getItemsData(setItemsData, setLoading);
  }, []);

  useEffect(() => {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
    });
  }, [selectMenu]);

  const filteredItems = () => {
    if (itemsData.length > 0) {
      if(selectMenu.menuType === 'orgs' || selectMenu.menuType === 'items'){
        return itemsData.filter(item => Boolean(!item.deleted_at));
      }
      else if(selectMenu.menuType === 'me'){
        return itemsData.filter(item => (
          Boolean(!item.deleted_at) && Boolean(!item.organization)
        ))
      }
      else if(selectMenu.menuType === 'org'){
        return itemsData.filter(item => (
          Boolean(!item.deleted_at) && (item.organization_id === selectMenu.typeValue)
        ))
      }
      else if(selectMenu.menuType === 'favorite'){
        return itemsData.filter(item => (
          Boolean(!item.deleted_at) && (item.favorite === true)
        ))
      }
      else if(selectMenu.menuType === 'type'){
        return itemsData.filter(item => (
          Boolean(!item.deleted_at) && (item.type === selectMenu.typeValue)
        ))
      }
      else if(selectMenu.menuType === 'folder'){
        return itemsData.filter(item => (
          Boolean(!item.deleted_at) && (item.folder_id === selectMenu.typeValue)
        ))
      }
      else if(selectMenu.menuType === 'trash'){
        return itemsData.filter(item => Boolean(item.deleted_at));
      }
    }
    return itemsData.filter(item => Boolean(!item.deleted_at));
  };

  return (
    <div className=" m-auto item-page">
      <div>
        <div className="section-title pb-4">
          {selectMenu.menuType === '' &&
            <h2>All Items</h2>
          }
          {selectMenu.menuType === 'me' &&
            <h2>My Items</h2>
          }
          {selectMenu.menuType === 'org' &&
            <h2>Organization Items</h2>
          }
          {selectMenu.menuType === 'favorite' &&
            <h2>Fovarite Items</h2>
          }
          {selectMenu.menuType === 'folder' &&
            <h2>Folder Items</h2>
          }
          {selectMenu.menuType === 'type' &&
            <h2>Category Items</h2>
          }
          {(selectMenu.menuType === 'orgs' || selectMenu.menuType === 'items') &&
            <h2>All Items</h2>
          }
          {selectMenu.menuType === 'trash' &&
            <h2>Trashed Items</h2>
          }
            <button onClick={()=>setOpenNewItemModal(true)} className="btn btn-primary hover-btn">
                New Item
            </button>
        </div>
        <div className="item-listing">
            <div className="listing-header">
                <div className="checkbox-container col-md-2">
                  <input type="checkbox" id="select-all" checked={checkAll} onChange={handleSelectAll}/>All
                </div>
                <div className="col-md-6">Name</div>
                <div className="col-md-3">Owner</div>
                  <div className="col-md-1">
                    <div className="three-dot-dropdown">
                      <button type="button" className="three-dot-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                      </button>
                      <ul className="dropdown-menu">
                        {selectMenu.menuType === 'trash' &&
                          <div>
                            <li className="dropdown-item" style={{color: "red"}} onClick={handleDeleteItems}>
                                <MdOutlineDeleteOutline/>
                                Permanentlt Delete Selected
                            </li>
                          </div>
                        }
                        {selectMenu.menuType !== 'trash' &&
                          <div>
                            <li className="dropdown-item" onClick={()=>setOpenMoveFolderModal(true)}>
                                <MdOutlineDriveFolderUpload/>
                                Move Selected
                            </li>
                            <li className="dropdown-item" onClick={()=>setOpenMoveOrgModal(true)}>
                                <MdMoveUp/>
                                Move Selected To Org..
                            </li>
                            <li className="dropdown-item" style={{color: "red"}} onClick={handleDeleteItems}>
                                <MdOutlineDeleteOutline/>
                                Delete Selected
                            </li>
                          </div>
                        }
                      </ul>
                    </div>
                  </div>
            </div>
            {loading ? (
                <div className="loader">
                  <BeatLoader color={"#1e2a3c"} loading={loading} size={20} />
                </div>
            ) : (
              <>
                {itemsData.length > 0 && filteredItems().map((item, index) => (
                    <div className="listing-item" key={index}>
                        <div className="checkbox-container col-md-2">
                          <input type="checkbox" id={`item-${item.id}`}
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleItemSelect(item.id)}
                          />
                          <label htmlFor={`item-${item.id}`}></label>
                        </div>
                        <div className="col-md-6 d-flex">
                          <div className="item-name">
                            <p className="my-0 list-item-name" onClick={()=>handleOpenPopup(item)}>{item.name}</p>
                              <span className="item-type text-muted small">
                                {item.type === 1 ? "Login Item" : item.type === 2 ? "Card Item" : item.type === 3 ? "Identity Item" : "Security"}
                              </span>
                          </div>
                        </div>
                        {item.organization?.orgname ? (
                          <div className="col-md-3">
                              <p className="list-org-name" title={item.organization.orgname}>
                                {item.organization.orgname}
                              </p>
                          </div>
                        ) : (
                          <div className="col-md-3">
                              <p className="list-own-name" title="Me">
                                Me
                              </p>
                          </div>
                        )}
                        <div className="col-md-1" style={{ height: 16 }}>
                          <div className="three-dot-dropdown">
                            <button type="button" className="three-dot-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                            </button>
                            <ul className="dropdown-menu">
                              {selectMenu.menuType === 'trash' &&
                                <div>
                                  <li className="dropdown-item" onClick={()=>handleRestoreSingleItem(item.id)}>
                                      <MdMoveUp/>
                                      Restore Item
                                  </li>
                                  <li className="dropdown-item" style={{color: "red"}} onClick={()=>handlePermanentDeleteSingleItem(item.id)}>
                                      <MdOutlineDeleteOutline/>
                                      Permanentlt Delete
                                  </li>
                                </div>
                              }
                              {selectMenu.menuType !== 'trash' &&
                                <div>
                                  <li className="dropdown-item" style={{color: "red"}} onClick={()=>handleDeleteSingleItem(item.id)}>
                                      <MdOutlineDeleteOutline/>
                                      Delete Selected
                                  </li>
                                </div>
                              }
                            </ul>
                          </div>
                        </div>
                    </div>
                ))}
                {filteredItems().length === 0 && 
                  <div className="col-md-12 text-center fw-bold p-2">
                    <h3>There are no items to show</h3>
                  </div>
                }
              </>
            )}
            {singleItemData &&
              <EditItemModal
                  openPopup = {openPopup}
                  setOpenPopup = {setOpenPopup}
                  singleItemData = {singleItemData}
                  setSingleItemData = {setSingleItemData}
                  setItemsData = {setItemsData}
              />
            }
        </div>
      </div>
      <AddItemModal
          setItemsData = {setItemsData}
          openPopup = {openNewItemModal}
          setOpenPopup = {setOpenNewItemModal}
      />
      <MoveFolderModal
          selectedItems = {selectedItems}
          setSelectedItems = {setSelectedItems}
          setCheckAll = {setCheckAll}
          setItemsData = {setItemsData}
          openPopup = {openMoveFolderModal}
          setOpenPopup = {setOpenMoveFolderModal}
      />
      <MoveOrgModal
          selectedItems = {selectedItems}
          setSelectedItems = {setSelectedItems}
          setCheckAll = {setCheckAll}
          setItemsData = {setItemsData}
          openPopup = {openMoveOrgModal}
          setOpenPopup = {setOpenMoveOrgModal}
      />
    </div>
  );
}
export default ItemList;
