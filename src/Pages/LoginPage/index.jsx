import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosOpen } from "../../api/axios";
import { BiArrowBack } from "react-icons/bi";
import ApiURL from "../../api/apiURL";
import logo from "../../assests/images/home-logo.png";
import { toast, ToastContainer } from "react-toastify";
import Validation from "../../validation/validation";
import { register } from "../../api/postData";
import './login.scss';
import RegistrationModal from "../../Modal/RegistrationModals/RegistrationModal";

const LoginForm = () => {
  const navigate = useNavigate();
  const regToken = process.env.REACT_APP_REGISTER_TOKEN;
  const emailRef = useRef();
  const passwordRef = useRef();
  
  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [openPopup, setOpenPopup] = useState (false);

  // Registration States
  const [regEmail, setRegEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordHint, setRegPasswordHint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      if(email.length===0 || email.length > 255){
        toast.error("Invalid Input For Email");
      }
      else if(password.length===0 || password.length > 255){
          toast.error("Invalid Input For Password");
      }
      else{
        let myFormData = new FormData();
        myFormData.append("email",email);
        myFormData.append("password",password);
        axiosOpen.post(ApiURL.login,myFormData)
        .then(response=>{
            if(response.data.success === true){
              sessionStorage.userID = response?.data?.data?.id;
              sessionStorage.userName = response?.data?.data?.name;
              sessionStorage.userToken = response?.data?.data?.token;
              navigate("/");
            }
            else{
              toast.error("Invalid Credential");
              console.log(response.data);
            }
        })
        .catch(error=>{
          toast.error("Server is not responding");
          console.log(error);
        })
      }
    })();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if(regName.length===0){
      toast.error("Name is Required");
    }
    else if(regEmail.length===0){
        toast.error("Email is Required");
    }
    else if(regPassword.length===0 || regPassword.length < 5){
        toast.error("Password should be at least 5 character");
    }
    else if(!(Validation.emailRegex).test(regEmail)){
        toast.error("Invalid Email");
    }
    else{
        let myFormData = new FormData();
        myFormData.append("email",regEmail);
        myFormData.append("name",regName);
        myFormData.append("password",regPassword);
        myFormData.append("password_hint",regPasswordHint);
        myFormData.append("token",regToken);
        register(myFormData, setOpenPopup);
    }
  }

  const handleForgotPassword = (e) => {
    if (email !== "") {
      //
    }
  };

  const handleForgotPasswordSwitch = () => {
    setForgotPassword(currentValue => !currentValue);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="position-relative login-page">
        <div className="left-section"></div>
        <div className="right-section">
          {forgotPassword && (
            <div className="form-signin">
              <div className="d-flex w-100">
                <BiArrowBack
                  style={{
                    fontSize: "35px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                  onClick={handleForgotPasswordSwitch}
                />
                <img
                  alt="brand logo"
                  src={logo}
                  width="250"
                  height="auto"
                  className="mx-auto"
                />
              </div>
              <h1>Forgot Password</h1>
              <form className="form" onSubmit={handleForgotPassword}>
                <div className="form-floating mb-2">
                  <input
                    className="form-control mb-3"
                    id="floatingInputCustom"
                    type="email"
                    placeholder="name@example.com"
                    ref={emailRef}
                    autoComplete="off"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInputCustom">Email Address</label>
                </div>
                <button
                  className="btn btn-primary login-btn mx-auto w-100"
                  type="submit"
                >
                  Get Password Hint
                </button>
              </form>
            </div>
          )}

          {!forgotPassword && (
            <div className="form-signin">
              <div>
                <img alt="brand logo" src={logo} width="250" height="auto" />
              </div>
              <h1>LOGIN</h1>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingInputCustom"
                    type="email"
                    placeholder="name@example.com"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                  />
                  <label htmlFor="floatingInputCustom">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingPasswordCustom"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    autoComplete="off"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    required
                  />
                  <label htmlFor="floatingPasswordCustom">Master Password</label>
                </div>
                <div className="form-group w-100 d-flex justify-content-between align-items-center mt-4">
                  <button className="btn btn-primary login-btn" type="submit">
                    Login
                  </button>
                  <button
                    className="btn btn-link text-decoration-none text-white"
                    onClick={handleForgotPasswordSwitch}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>

              <p className="pt-4">Don't have an account?
                <span onClick={()=>{setOpenPopup(true)}} className="btn-link"> create account</span>
              </p>
            </div>
          )}
        </div>
        <RegistrationModal
          openPopup={openPopup}
          handleRegisterSubmit={handleRegisterSubmit}
          regEmail={regEmail}
          setRegEmail={setRegEmail}
          regName={regName}
          setRegName={setRegName}
          regPassword={regPassword}
          setRegPassword={setRegPassword}
          regPasswordHint={regPasswordHint}
          setRegPasswordHint={setRegPasswordHint}
          setOpenPopup={setOpenPopup}
        />
      </div>
      <ToastContainer
        position="top-right"
        theme="colored"
      />
    </>
  );
};

export default LoginForm;
