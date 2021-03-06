import React from "react";

function Navbar(props) {
    const signOut = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("id");
    }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Virtual Shoppers
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            {localStorage.getItem("authToken") != undefined ? (
              <li class="nav-item">
                <a
                  class="nav-link"
                  href={`/dashboard/${localStorage.getItem("id")}`}
                >
                  Dashboard
                </a>
              </li>
            ) : (
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}
            {localStorage.getItem("authToken") != undefined ? (
              <li class="nav-item">
                <a class="nav-link" href="/" onClick={signOut}>
                  Logout
                </a>
              </li>
            ) : (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register as
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="/register">
                      Seller
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/registerCustomer">
                      Customer
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
