import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <div className="fixed-top border" style={{ backgroundColor: "lightgreen" }}>
      <nav className="navbar">
        <div>
          <img
            src="https://play-lh.googleusercontent.com/cWG9-bk2_zLdKsN9vsYEdbCReVfzgXU6FeHUmLI8a24FoZ05TpOLYXInCQ278FTwCw"
            width={30}
            height={30}
            alt="logo"
            className="ms-5"
          />
        </div>
        <Link className="nav-link" to="/" activeClassName="active">
          Home
        </Link>
        <Link className="nav-link" to="/signin" activeClassName="active">
          Login
        </Link>
        <Link className="nav-link" to="/register" activeClassName="active">
          Signup
        </Link>
        <div>
          {user && (
            <>
              <span className="pe-4">
                Signed is as {user.displayName || user.email}
              </span>
              <button
                className="btn btn-primary btn-sm me-3"
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
