import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Alert from "../components/alert.component";
import type { AxiosResponse } from "axios";
import Loader from "../components/loader.component";
import { Link, useNavigate } from "react-router";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, email: "" });
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, password: "" });
    setPassword(e.target.value);
  };

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/projects");
    }, 500)
  }


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);

    if (!isValid(errs)) return;

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    await AuthService.login(email, password)
      .then(() => {
        setMessage("Sign in successfully");
        setSuccessful(true);

        handleRedirect()

      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function validate() {
    const validationErrors = { email: "", password: "" };

    const trimmedPassword = password.trim();
    if (trimmedPassword.length === 0) {
      validationErrors.password = "The password is required.";
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
      validationErrors.email = "The email is required.";
    }

    return validationErrors;
  }

  function isValid(errs: any) {
    return (
      errs.email.length === 0 &&
      errs.password.length === 0
    );
  }

  return (
    <div className=" px-2 ">

      {!loading && message && (
        <div className="m-2">
          <Alert type={successful ? "success" : "error"}>{message}</Alert>
        </div>
      )}

      <form className="!rounded-xl !w-72" onSubmit={handleLogin}>
        {!loading && !successful && (
          <div>

            <div className="w-full px-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="w-full box-border"
                name="email"
                value={email}
                onChange={handleEmail}
              />
              {errors.email && <Alert type="error">{errors.email}</Alert>}
            </div>

            <div className="w-full px-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="w-full box-border"
                name="password"
                value={password}
                onChange={handlePassword}
              />
              {errors.password && (
                <Alert type="error">{errors.password}</Alert>
              )}
            </div>

            <div className="w-full px-2">
              <button className="!px-4 !py-2 !bg-blue-600 !text-white !rounded-xl !hover:bg-blue-700 !focus:outline-none !focus:ring-2 !focus:ring-blue-400 !transition-all !shadow-md">Sign in</button>
            </div>

            <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        )}

        {loading &&
          <div className="w-full flex justify-around">

            <Loader />
          </div>
        }
      </form>
    </div>
  );
}

export default LoginForm;
