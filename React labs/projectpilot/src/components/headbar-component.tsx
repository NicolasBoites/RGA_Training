import { NavLink, useNavigate } from "react-router";
import authService from "../services/auth.service";

function Headbar() {

  const isAuthenticated = authService.isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/signin");
  }

  return (
    <header className="w-full !h-24 !bg-white">
      <div className=" mx-auto flex items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </div>
        <nav className="flex gap-4 w-full !border-0 m-2">
          {
            isAuthenticated ?
              <div className="h-full w-full flex justify-between items-center !p-2">
                <div className="flex flex-row">

                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                      }`
                    }
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    to="/new-project"
                    className={({ isActive }) =>
                      `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                      }`
                    }
                  >
                    New Project
                  </NavLink>
                </div>


                <button
                  onClick={handleLogout}
                  className="!capitalize !bg-neutral-600 !text-white !rounded-lg !h-10 !py-0 !hover:bg-neutral-700 !transition-all !duration-200"
                >
                  Logout
                </button>



              </div>
              :
              <>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                    }`
                  }
                >
                  Sign Up
                </NavLink>

                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </>
          }
        </nav>

      </div>
    </header>


    // </BrowserRouter>
  );
}

export default Headbar;
