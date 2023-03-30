const AddIdentityModal = ( props ) => {
    const { stateValues, setstateValues } = props;
    return (
        <>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Title</label>
                <select
                    className="form-select"
                    value={stateValues.title}
                    onChange={(e)=>setstateValues({...stateValues, title: e.target.value})}
                >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                </select>
            </div>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Email</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="example@email.com"
                        value={stateValues.identityEmail}
                        onChange={(e)=>setstateValues({...stateValues, identityEmail: e.target.value})}
                    />
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-4">
                        <label className="form-label fw-bold">First Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="First Name"
                                value={stateValues.identityFirstName}
                                onChange={(e)=>setstateValues({...stateValues, identityFirstName: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">Middle Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Middle Name"
                                value={stateValues.identityMiddleName}
                                onChange={(e)=>setstateValues({...stateValues, identityMiddleName: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">Last Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Last Name"
                                value={stateValues.identityLastName}
                                onChange={(e)=>setstateValues({...stateValues, identityLastName: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-4">
                        <label className="form-label fw-bold">Phone</label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Phone"
                                value={stateValues.identityPhone}
                                onChange={(e)=>setstateValues({...stateValues, identityPhone: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">Securiy</label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Securiy"
                                value={stateValues.identitySecurityNumber}
                                onChange={(e)=>setstateValues({...stateValues, identitySecurityNumber: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">License</label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="License"
                                value={stateValues.identityLicenseNumber}
                                onChange={(e)=>setstateValues({...stateValues, identityLicenseNumber: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-4">
                <label className="form-label fw-bold">Address</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Address"
                        value={stateValues.identityAddress}
                        onChange={(e)=>setstateValues({...stateValues, identityAddress: e.target.value})}
                    />
                </div>
            </div>
        </>
    )
}
export default AddIdentityModal;
