import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Layout, LoginForm, PageNotFound, Tools } from "./Pages";
import User from "./Pages/User";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<User />} />
          <Route path="tools" element={<Tools />} />
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

export default App;
