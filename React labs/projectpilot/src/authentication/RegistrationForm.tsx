import React, { useState, useRef, type SyntheticEvent } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { isValidEmail } from "../common/email-validations";

// Validations
const required = (value: string) => {
  if (!value) {
    return <div className="alert alert-danger" role="alert">This field is required!</div>;
  }
};

const email = (value: string) => {
  if (!isEmail(value)) {
    return <div className="alert alert-danger" role="alert">This is not a valid email.</div>;
  }
};

const vusername = (value: string) => {
  if (value.length < 3 || value.length > 20) {
    return <div className="alert alert-danger" role="alert">The username must be between 3 and 20 characters.</div>;
  }
};

const vpassword = (value: string) => {
  if (value.length < 6 || value.length > 40) {
    return <div className="alert alert-danger" role="alert">The password must be between 6 and 40 characters.</div>;
  }
};

function RegistrationForm() {
  const form = useRef<any>(null);
  const checkBtn = useRef<any>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const handleRegister = (e: any) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    validate();

    if (!isValid()) return;

    AuthService.register(username, email, password).then(
      (response: any) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error: any) => {
        const resMessage =
          error.response?.data?.message ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );

  };

  function validate() {

    let errors: any = { username: '', email: '', password: '' };

    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      errors.username = 'The username must be between 3 and 20 characters.';
    } else if (trimmedUsername.length === 0) {
      errors.username = 'The username is required.';
    }

    const trimmedPassword = password.trim();
    if (trimmedPassword.length < 6 || trimmedPassword.length > 40) {
      errors.password = 'The password must be between 6 and 40 characters.';
    } else if (trimmedPassword.length === 0) {
      errors.password = 'The username is required.';
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
      errors.email = 'The email is required.';
    }else if (isValidEmail(trimmedPassword)) {
      errors.email = 'This is not a valid email.';
    }

    return errors;
  }


  function isValid() {

    return (
      errors.username.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0
    );
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={handleUsername}
                />
                {errors.username &&
                  <div className="alert alert-danger" role="alert">
                    {errors.username}
                  </div>
                }
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                />
                {errors.email &&
                  <div className="alert alert-danger" role="alert">
                    {errors.email}
                  </div>
                }
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
                {errors.password &&
                  <div className="alert alert-danger" role="alert">
                    {errors.password}
                  </div>
                }
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
