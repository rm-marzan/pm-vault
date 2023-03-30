import { useState } from "react";
import { toast } from "react-toastify";
const AddLoginModal = ( props ) => {
    const [showPassword, setShowPassword] = useState(false);

    const { stateValues, setstateValues } = props;
    const copyToClipboard = (value) => {
        toast.success("Copied");
        navigator.clipboard.writeText(value);
    }
    const handleAddField = () => {
        if (stateValues.loginUrls[stateValues.loginUrls.length-1] !== "") {
            setstateValues({...stateValues, loginUrls: [...stateValues.loginUrls, '']});
        }
    };
    const handleFieldChange = (index, event) => {
        const fieldData = [...stateValues.loginUrls];
        fieldData[index] = event.target.value;
        setstateValues({...stateValues, loginUrls: fieldData});
    };
    return (
        <>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Username</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={stateValues.loginUsername}
                        onChange={(e)=>setstateValues({...stateValues, loginUsername: e.target.value})}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard(stateValues.loginUsername)}></i>
                    </span>
                </div>
            </div>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Password</label>
                <div className="input-group mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={stateValues.loginPassword}
                        onChange={(e)=>setstateValues({...stateValues, loginPassword: e.target.value})}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard(stateValues.loginPassword)}></i>
                    </span>
                    <span className="input-group-text">
                        <div className="cursor-pointer" onClick={()=>setShowPassword((prevShow) => !prevShow)}>
                            {showPassword ? (
                                <i className="bi bi-eye"></i>
                            ) : (
                                <i className="bi bi-eye-slash"></i>
                            )}
                        </div>
                    </span>
                </div>
            </div>
            { stateValues.loginUrls.map((field, index) => (
                <div key={index} className="col-6 mb-4">
                    <label className="form-label fw-bold">URL {index+1}</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="https://google.com"
                            value={field}
                            onChange={(e) => handleFieldChange(index, e)}
                        />
                        <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard(field)}></i>
                        </span>
                    </div>
                </div>
            ))}
            <div className="col-12 mb-4">
                <i className="bi bi-plus-circle hover-text" onClick={handleAddField}> New URL</i>
            </div>
        </>
    )
}
export default AddLoginModal;
