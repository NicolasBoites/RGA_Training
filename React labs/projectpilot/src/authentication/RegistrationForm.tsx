import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { isValidEmail } from "../common/email-validations";
import Alert from "../components/alert.component";
import type { AxiosResponse } from "axios";
import Loader from "../components/loader.component";
import { Link } from "react-router";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, name: "" });
    setName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, email: "" });
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, password: "" });
    setPassword(e.target.value);
  };


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    const errs = validate();
    setErrors(errs);

    if (!isValid(errs)) return;

    await AuthService.register(name, email, password)
      .then((response: AxiosResponse) => {
        console.log("response", response);

        setMessage("User successfully registered. Now you can Sign in");
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
    const validationErrors = { name: "", email: "", password: "" };

    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      validationErrors.name = "The name is required.";
    } else if (trimmedName.length < 3 || trimmedName.length > 20) {
      validationErrors.name = "The name must be between 3 and 20 characters.";
    }

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
    } else if (isValidEmail(trimmedEmail)) {
      console.log("isValidEmail", isValidEmail(trimmedEmail));

      validationErrors.email = "This is not a valid email.";
    }

    return validationErrors;
  }

  function isValid(errs: any) {
    return (
      errs.name.length === 0 &&
      errs.email.length === 0 &&
      errs.password.length === 0
    );
  }

  return (
    <div className=" px-2 ">
      {!loading && message && (
        <div className="w-full px-2">
          <Alert type={successful ? "success" : "error"}>{message}</Alert>
        </div>
      )}
      <form className="!rounded-xl !w-72" onSubmit={handleRegister}>
        {!loading && !successful && (
          <div>
            <div className="w-full px-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full box-border"
                name="name"
                value={name}
                onChange={handleName}
              />
              {errors.name && <Alert type="error">{errors.name}</Alert>}
            </div>

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
              <button className="!px-4 !py-2 !bg-blue-600 !text-white !rounded-xl !hover:bg-blue-700 !focus:outline-none !focus:ring-2 !focus:ring-blue-400 !transition-all !shadow-md">Sign Up</button>
            </div>
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
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

export default RegistrationForm;
