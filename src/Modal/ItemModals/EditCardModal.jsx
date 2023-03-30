import { useState } from "react";
import Variables from "../../constants/variables";
import { toast } from "react-toastify";

const EditCardModal = ({ singleItemData, setSingleItemData }) => {
    const brands = Variables.brands;
    const months = Variables.months;
    const [showPassword, setShowPassword] = useState(false);

    const copyToClipboard = (value) => {
        toast.success("Copied");
        navigator.clipboard.writeText(value);
    }
    return (
        <>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Cardholder Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username"
                        value={singleItemData.card?.cardholder_name ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            card: {
                                ...prevState.card,
                                cardholder_name: e.target.value
                            }
                        }))}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard(singleItemData.card.cardholder_name)}></i>
                    </span>
                </div>
            </div>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Brand</label>
                <select
                    className="form-select"
                    value={singleItemData.card?.brand ?? ''}
                    onChange={(e)=>setSingleItemData(prevState => ({
                        ...prevState,
                        card: {
                            ...prevState.card,
                            brand: e.target.value
                        }
                    }))}
                >
                    <option value="">-- Select --</option>
                    {brands.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Number</label>
                <div className="input-group mb-3">
                    <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password"
                        value={singleItemData.card?.number ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            card: {
                                ...prevState.card,
                                number: e.target.value
                            }
                        }))}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard()}></i>
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
            <div className="col-6 mb-4">
                <div className="row">
                    <div className="col-6">
                        <label className="form-label fw-bold">Expiration month</label>
                        <select
                            className="form-select"
                            value={singleItemData.card?.exp_month ?? ''}
                            onChange={(e)=>setSingleItemData(prevState => ({
                                ...prevState,
                                card: {
                                    ...prevState.card,
                                    exp_month: e.target.value
                                }
                            }))}
                        >
                            <option value="">-- Select --</option>
                            {months.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="form-label fw-bold">Expiration Year</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Ex: 2023"
                                value={singleItemData.card?.exp_year ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    card: {
                                        ...prevState.card,
                                        exp_year: e.target.value
                                    }
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Security Code (CVV)</label>
                <div className="input-group mb-3">
                    <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password"
                        value={singleItemData.card?.cvv ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            card: {
                                ...prevState.card,
                                cvv: e.target.value
                            }
                        }))}
                    />
                    <span className="input-group-text">
                        <i className="bi bi-files cursor-pointer" onClick={()=>copyToClipboard()}></i>
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
        </>
    )
}
export default EditCardModal;
