import React, { useEffect, useState } from "react";
import { getOrgAndFolderData } from "../../api/getData";
import FoldersBar from "././SideBar/FoldersBar";
import ItemList from "./Items/ItemList";
import ItemsBar from "././SideBar/ItemsBar";
import OrganizationsBar from "././SideBar/OrganizationsBar";
import { MenuItemProvider } from "../../contexts/menuContext";
import './home.scss';

const Home = () => {
  const [selectMenu, setSelectMenu] = useState({ menuType: '', typeValue: '' });
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState("");
  const [folderData, setFolderData] = useState("");

  useEffect(() => {
    getOrgAndFolderData(setOrgData, setFolderData, setLoading);
  }, []);
  return (
    <div className="container page-container p-5">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3 mb-3">
          <div className="card">
            <div className="card-header text-uppercase fw-bold">
              Filter
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                  <OrganizationsBar
                    loading = {loading}
                    orgData = {orgData}
                    selectMenu = {selectMenu}
                    setSelectMenu = {setSelectMenu}
                    setOrgData = {setOrgData}
                  />
                  <ItemsBar
                    selectMenu = {selectMenu}
                    setSelectMenu = {setSelectMenu}
                  />
                  <FoldersBar
                    loading = {loading}
                    folderData = {folderData}
                    selectMenu = {selectMenu}
                    setSelectMenu = {setSelectMenu}
                    setFolderData = {setFolderData}
                  />
              </li>
                <li className="list-group-item text-danger fw-bold text-center cursor-pointer" 
                    onClick={()=> {setSelectMenu({
                      menuType: 'trash',
                      typeValue: ''
                    })}}
                >
                  <i className="bi bi-trash"></i> Trash
                </li>
            </ul>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-9">
            <MenuItemProvider value={{ loading: loading, orgData: orgData, folderData: folderData }}>
              <ItemList
                selectMenu = {selectMenu}
              />
            </MenuItemProvider>
        </div>
      </div>
    </div>
  )
}
export default Home;

