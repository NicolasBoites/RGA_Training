import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { isValidEmail } from "../common/email-validations";
import Alert from "../components/alert.component";
import type { AxiosResponse } from "axios";
import Loader from "../components/loader.component";

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


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, email: "" });
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, password: "" });
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    const errs = validate();
    setErrors(errs);

    if (!isValid(errs)) return;

    await AuthService.login(email, password)
      .then((response: AxiosResponse) => {
        console.log("response", response);

        setMessage("SignIn successfully");
        setSuccessful(true);
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
    } else if (trimmedPassword.length < 6 || trimmedPassword.length > 40) {
      validationErrors.password =
        "The password must be between 6 and 40 characters.";
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
      validationErrors.email = "The email is required.";
    } else if (isValidEmail(trimmedPassword)) {
      validationErrors.email = "This is not a valid email.";
    }

    return validationErrors;
  }

  function isValid(errs) {
    return (
      errs.email.length === 0 &&
      errs.password.length === 0
    );
  }

  return (
    <div className="col-md-12">
      <div className="card card-container px-px ">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin}>
          {!loading && !successful && (
            <div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                />
                {errors.email && <Alert type="error">{errors.email}</Alert>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                />
                {errors.password && (
                  <Alert type="error">{errors.password}</Alert>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          )}

          {!loading && message && (
            <div className="form-group">
              <Alert type={successful ? "success" : "error"}>{message}</Alert>
            </div>
          )}

          {loading && <Loader />}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
