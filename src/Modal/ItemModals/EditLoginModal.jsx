import { useState } from "react";
import { toast } from "react-toastify";

const EditLoginModal = ({ singleItemData, setSingleItemData }) => {
    const [showPassword, setShowPassword] = useState(false);

    var fieldUrls = singleItemData.login?.urls ?? '';
    if (/\{.*\}/.test(fieldUrls)) {
        fieldUrls = fieldUrls.slice(1, -1);
    }
    fieldUrls = fieldUrls.toString().split(",");

    const copyToClipboard = (value) => {
        toast.success("Copied");
        navigator.clipboard.writeText(value);
    }
    const handleAddField = () => {
        if (fieldUrls[fieldUrls.length-1] !== "") {
            const fieldData = [...fieldUrls];
            fieldData[fieldUrls.length] = '';
            setSingleItemData(prevState => ({
                ...prevState,
                login: {
                    ...prevState.login,
                    urls: fieldData
                }
            }))
        }
    };
    const handleFieldChange = (index, e) => {
        const fieldData = [...fieldUrls];
        fieldData[index] = e.target.value;
        setSingleItemData(prevState => ({
            ...prevState,
            login: {
                ...prevState.login,
                urls: fieldData
            }
        }))
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
                        value={singleItemData.login?.username ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            login: {
                                ...prevState.login,
                                username: e.target.value
                            }
                        }))}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard(singleItemData.login?.username)}></i>
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
                        value={singleItemData.login?.password ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            login: {
                                ...prevState.login,
                                password: e.target.value
                            }
                        }))}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard(singleItemData.login?.password)}></i>
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
            { fieldUrls && fieldUrls.map((field, index) => (
                <div key={index} className="col-6 mb-4">
                    <label className="form-label fw-bold">URL {index+1}</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="https://google.com"
                            value={field ?? ''}
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
export default EditLoginModal;
