import React from "react";
import { PiUser } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avvvatars from "avvvatars-react";
import { logout } from "../features/user";
import { IoMdAdd } from "react-icons/io";

function Navbar() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="link--containers">
        <Link to={"/home"} className="link">
          <h3>IMDB CLONE APP</h3>
        </Link>
      </div>
      <div className="navbar--links">
        <div className="navbar--links-header">
          <Link to={"/addmovie"} className="link" style={{ marginLeft: "10px" }}>
            <p className="nav--links">Add Movie</p>
          </Link>
          <Link to={"/actors"} className="link">
            <p className="nav--links">Actors</p>
          </Link>
          <Link to={"/producers"} className="link">
            <p className="nav--links">Producers</p>
          </Link>
        </div>
        {user.name.length ? (
          <>
            <button
              className="logout--btn"
              onClick={() => {
                localStorage.clear();
                dispatch(logout());
                alert("Logged out successfully");
              }}
            >
              Logout
            </button>
            <Avvvatars value={user.name} size={36} />
          </>
        ) : (
          <div className="profile--background">
            <Link to={"/login"} className="link">
              <PiUser className="usericon" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
