
import React from "react";
import "./Login.css";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

export default function Login() {
  const { instance, accounts } = useMsal();
  const isAuth = useIsAuthenticated();

  const signIn = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (e) {
      console.error(e);
      alert("Sign-in failed. Please try again.");
    }
  };

  const signOut = () => instance.logoutRedirect();

  return (
    <main className="auth" role="main">
      {/* LEFT: content column */}
      <section className="auth__panel" aria-labelledby="welcome-title">
        <div className="panel__inner">
          <div className="brandword">DELPHI</div>
          <p className="brandtagline">Decision insights for Lifeblood</p>

          {!isAuth ? (
            <>
              <h1 id="welcome-title" className="panel__title">Welcome back</h1>
              <p className="panel__sub strong">Please sign in to continue</p>

              <button
                type="button"
                className="btn btn--microsoft btn--maroon-border"
                onClick={signIn}
                aria-label="Sign in with Microsoft"
              >
                <span className="ms-mark" aria-hidden="true">
                  <span className="sq sq--red" />
                  <span className="sq sq--green" />
                  <span className="sq sq--blue" />
                  <span className="sq sq--yellow" />
                </span>
                <span className="btn__text">Sign in with Microsoft</span>
              </button>

              <p className="legal">
                By continuing, you agree to the <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </>
          ) : (
            <>
              <h1 className="panel__title">Welcome, {accounts[0]?.name || accounts[0]?.username}</h1>
              <p className="panel__sub">You’re signed in.</p>
              <button className="btn btn--maroon-border" onClick={signOut}>Sign out</button>
            </>
          )}
        </div>
      </section>

      {/* RIGHT: media column */}
      <aside className="auth__media" aria-label="Brand illustration">
        <img
          className="media__img"
          src="https://www.maroondah.vic.gov.au/files/content/mycity/v/1/directory/australian-red-cross-lifeblood-ringwood/donorcentre_popup_socialtile.png?dimension=pageimage&w=480"
          alt=""
          aria-hidden="true"
        />
        <div className="media__overlay" aria-hidden="true" />
      </aside>
    </main>
  );
}
