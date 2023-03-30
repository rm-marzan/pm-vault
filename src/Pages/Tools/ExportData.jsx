import React from "react";
import { getExportData } from "../../api/getData";

const ExportData = () => {    
    const handleSubmit = () => {
      getExportData();
    }
    return (
      <div className="container">
          <h3>Export Data</h3>
          <hr className="bg-danger border-1 border-top border-dark" />
          <div className="card text-dark bg-light mb-3">
            <div className="card-body">
              <h5 className="card-title">EXPORTING INDIVIDUAL VAULT</h5>
              <p className="card-text">Only vault item information will be exported and will not include associated password history or attachments.</p>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary hover-btn">
              Export Data
          </button>
      </div>
    )
  }
  export default ExportData;
  
  