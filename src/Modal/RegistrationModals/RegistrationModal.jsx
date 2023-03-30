import React from "react";

function RegistrationModal(props) {
  const {
    openPopup,
    handleRegisterSubmit,
    regEmail,
    setRegEmail,
    regName,
    setRegName,
    regPassword,
    setRegPassword,
    regPasswordHint,
    setRegPasswordHint,
    setOpenPopup,
  } = props;

  return (
    <div className={`modal ${openPopup ? 'show' : ''}`} style={{ display: `${openPopup ? 'block' : 'none'}` }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
          <form onSubmit={handleRegisterSubmit} style={{ padding: 10 }}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={regEmail}
                required
                onChange={(e) => {
                  setRegEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user"
                value={regName}
                required
                onChange={(e) => {
                  setRegName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={regPassword}
                required
                onChange={(e) => {
                  setRegPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password Hint</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter password hint"
                value={regPasswordHint}
                required
                onChange={(e) => {
                  setRegPasswordHint(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
            <button type="button" className="btn btn-secondary" onClick={() => setOpenPopup(false)}>
              Close
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;