import { ToastContainer } from "react-toastify";
import Headbar from "./components/headbar-component";
import { BrowserRouter, Route, Routes } from "react-router";
import authService from "./services/auth.service";
import HomePage from "./home/HomePage";
import LoginPage from "./authentication/LoginPage";
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from "./projects/ProjectPage";
import NewProjectPage from "./projects/NewProjectPage";
import RegistrationPage from "./authentication/RegisterPage";


function App() {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Headbar />

        <div className="px-16 pt-10px h-dvh">
          <Routes>
            <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
            <Route path="/projects" element={isAuthenticated ? <ProjectsPage /> : <LoginPage />} />
            <Route path="/projects/:id" element={isAuthenticated ? <ProjectPage /> : <LoginPage />} />
            <Route path="/new-project" element={isAuthenticated ? <NewProjectPage /> : <LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/signin" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
