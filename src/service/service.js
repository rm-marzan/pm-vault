const getUserID = () => {
  return (sessionStorage.getItem("userID"));
};

const getUserName = () => {
  return (sessionStorage.getItem("userName"));
};

const getUserToken = () => {
  return (sessionStorage.getItem("userToken"));
};

const isLoggedIn = () => {
  return sessionStorage.getItem("userID") || false;
};

const logout = () => {
  sessionStorage.clear();
};

export { getUserID, getUserName, getUserToken, isLoggedIn, logout };
