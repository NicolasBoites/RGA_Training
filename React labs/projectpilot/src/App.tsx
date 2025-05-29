import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from './projects/NewProjectPage';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/" className="button rounded">
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink to="/projects" className="button rounded">
            Projects
          </NavLink>
          <NavLink to="/new-project" className="button rounded">
            New Project
          </NavLink>
        </header>

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/new-project" element={<NewProjectPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
