import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout.component";
import LandingMenu from "./pages/landing-menu.component";
import Authentication from "./pages/authpage.component";

import RequireAuth from "./components/require-auth/require-auth.component";
import PersistLogin from "./components/require-auth/persist-login.component";
function App() {
  return (
    <div className="application-container bg-whitesmoke">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                + <Route index element={<LandingMenu />} />
              </Route>
            </Route>
            <Route path="/authentication" element={<Authentication />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
