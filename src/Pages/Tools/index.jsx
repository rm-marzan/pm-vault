import React, { useState } from "react";
import './tools.scss';
import Generator from "../Tools/Generator";
import ImportData from "../Tools/ImportData";
import ExportData from "../Tools/ExportData";

const Tools = () => {
  const [selectMenu, setSelectMenu] = useState("generator");

  return (
    <div className="container page-container p-5">
    <div className="row">
      <div className="col-sm-6 col-md-3 mb-3">
        <div className="card">
          <div className="card-header text-uppercase fw-bold">
            Tools
          </div>
          <ul className="list-group tools-items list-group-flush">
            <li className={`list-group-item ${selectMenu === 'generator' ? 'active' : ''}`} onClick={() => setSelectMenu("generator")}>
              Generator
            </li>
            <li className={`list-group-item ${selectMenu === 'import' ? 'active' : ''}`} onClick={() => setSelectMenu("import")}>
              Import Data
            </li>
            <li className={`list-group-item ${selectMenu === 'export' ? 'active' : ''}`} onClick={() => setSelectMenu("export")}>
              Export Data
            </li>
          </ul>
        </div>
      </div>
      <div className="col-sm-6 col-md-9">
        <div className="tools-page col-md-6 m-auto shadow p-3 bg-white rounded">
              {selectMenu === "generator" && <Generator/>}
              {selectMenu === "import" && <ImportData/>}
              {selectMenu === "export" && <ExportData/>}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Tools;
