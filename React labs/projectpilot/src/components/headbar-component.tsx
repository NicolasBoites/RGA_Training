import ProjectsPage from "../projects/ProjectsPage";
import ProjectPage from "../projects/ProjectPage";
import NewProjectPage from "../projects/NewProjectPage";
import HomePage from "../home/HomePage";
import RegistrationPage from "../authentication/RegisterPage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import LoginPage from "../authentication/LoginPage";

function Headbar() {
  return (
    <BrowserRouter>
      <header className="w-full !h-20 !bg-white">
        <div className=" mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </div>
          <nav className="flex gap-4 w-full !border-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${
                  isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${
                  isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                }`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/new-project"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${
                  isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                }`
              }
            >
              New Project
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${
                  isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                }`
              }
            >
              SignUp
            </NavLink>

            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md !text-slate-700 hover:!bg-slate-200 transition ${
                  isActive ? "font-semibold !text-slate-500 !bg-slate-200" : ""
                }`
              }
            >
              SignIn
            </NavLink>
          </nav>
        </div>
      </header>

      <div className="px-10px pt-10px h-dvh">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Headbar;
