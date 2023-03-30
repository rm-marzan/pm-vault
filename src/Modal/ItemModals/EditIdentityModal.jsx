const EditIdentityModal = ({ singleItemData, setSingleItemData }) => {
    return (
        <>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Title</label>
                <select
                    className="form-select"
                    value={singleItemData.identity?.title ?? ''}
                    onChange={(e)=>setSingleItemData(prevState => ({
                        ...prevState,
                        identity: {
                            ...prevState.identity,
                            title: e.target.value
                        }
                    }))}
                >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                </select>
            </div>
            <div className="col-6 mb-4">
                <label className="form-label fw-bold">Email</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="example@email.com"
                        value={singleItemData.identity?.email ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            identity: {
                                ...prevState.identity,
                                email: e.target.value
                            }
                        }))}
                    />
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-4">
                        <label className="form-label fw-bold">First Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="First Name"
                                value={singleItemData.identity?.first_name ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    identity: {
                                        ...prevState.identity,
                                        first_name: e.target.value
                                    }
                                }))}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">Middle Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Middle Name"
                                value={singleItemData.identity?.middle_name ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    identity: {
                                        ...prevState.identity,
                                        middle_name: e.target.value
                                    }
                                }))}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">Last Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Last Name"
                                value={singleItemData.identity?.last_name ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    identity: {
                                        ...prevState.identity,
                                        last_name: e.target.value
                                    }
                                }))}
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
                                value={singleItemData.identity?.phone ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    identity: {
                                        ...prevState.identity,
                                        phone: e.target.value
                                    }
                                }))}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">Securiy</label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Securiy"
                                value={singleItemData.identity?.security_number ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    identity: {
                                        ...prevState.identity,
                                        security_number: e.target.value
                                    }
                                }))}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label fw-bold">License</label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="License"
                                value={singleItemData.identity?.license_number ?? ''}
                                onChange={(e)=>setSingleItemData(prevState => ({
                                    ...prevState,
                                    identity: {
                                        ...prevState.identity,
                                        license_number: e.target.value
                                    }
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-4">
                <label className="form-label fw-bold">Address</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Address"
                        value={singleItemData.identity?.address ?? ''}
                        onChange={(e)=>setSingleItemData(prevState => ({
                            ...prevState,
                            identity: {
                                ...prevState.identity,
                                address: e.target.value
                            }
                        }))}
                    />
                </div>
            </div>
        </>
    )
}
export default EditIdentityModal;
