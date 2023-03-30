import React, { useState } from "react";
import { toast } from "react-toastify";
import ApiURL from "../../api/apiURL";
import { axiosSecureFile } from "../../api/axios";
import { getUserID } from "../../service";

const ImportData = () => {
    const [selectedFile, setSelectedFile] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(selectedFile);
      (async () => {
          let myFormData = new FormData();
          myFormData.append("file",selectedFile);
          axiosSecureFile.post(ApiURL.importItems(getUserID()),myFormData)
          .then(response=>{
              if(response.data.success === true){
                toast.success("Data imported successfully");
              }
              else{
                toast.error(response.data?.message);
                console.log(response.data);
              }
          })
          .catch(error=>{
            toast.error("Server is not responding");
            console.log(error);
          })
      })();
    }
    return (
          <div className="container">
            <h3>Import Data</h3>
            <hr className="bg-danger border-1 border-top border-dark" />
            <div className="card text-dark bg-light mb-3">
              <div className="card-body">
                <p className="card-text">You can export a sample file to follow the expected format. This can help avoid any potential errors or failed submissions during the import process.</p>
              </div>
            </div>
            <p className="fw-bold">Select the import file</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <input
                        type="file"
                        className="form-control-file"
                        id="importFile"
                        onChange={(e)=>setSelectedFile(e.target.files[0])}
                      />
                  </div>
                  <button type="submit" className="btn btn-primary hover-btn">
                        Submit
                  </button>
                </form>
          </div>
    )
  }
  export default ImportData;
  
  