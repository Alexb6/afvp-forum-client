import React from "react";

import SignInMember from "./sign-in-member/sign-in-member.component";
import SignInDonor from "./sign-in-donor/sign-in-donor.component";

import "./login-page.styles.scss";

const LoginPage = () => (
  <div className="login-page">
    <div className="login-titlebar container-fluid">
      <h1 className="titlebar-title container">Connexion à son espace...</h1>
    </div>
    <div className="login-section container">
      <div className="login-row row">
        <SignInMember />
        <SignInDonor />
      </div>
    </div>
  </div>
);

export default LoginPage;
