import axios from "axios";
import { Loading } from "components";
import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Input } from "reactstrap";
import { REGISTER } from "utils/api/api";
import { gaEvent } from "utils/gaEvent";
import MainLayout from "./layout/MainLayout";

const Register = (props) => {
  const [accountId, setAccountId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      const response = await axios.post(REGISTER, {
        account_id: accountId,
        password: password,
        password_confirm: passwordConfirmation,
        name: name,
        avatar_id: 1
      });

      response.data.error && showToastError(response.data.error);

      if (response.data.status.ok) {
        setButtonLoading(false);
        gaEvent("Register Screen", "Register Success", "Register");

        toast.info(
          `Register Success Please login ${response.data.profile.name}`,
          {
            theme: "colored",
            autoClose: 1800
          }
        );

        setTimeout(() => {
          navigate.push("/login");
        }, 2500);
      }
    } catch (err) {
      gaEvent("Register Screen", "Register Failed", "Register");
      setButtonLoading(false);
    }
  };

  const showToastError = (error) => {
    if (error === "Incorrect authentication password") {
      setError(error);
      toast.error("The password confirmation does not match.", {
        theme: "colored"
      });
    }

    if (error && error !== "Incorrect authentication password") {
      setError(error ?? "An error occured. Please go back and try again.");
      toast.error(error ?? "An error occured. Please go back and try again.", {
        theme: "colored"
      });
    }
  };

  const isPasswordError =
    error === "Incorrect authentication password"
      ? "password-toggle-icon mr-4"
      : "password-toggle-icon";

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex justify-content-center ">
          <div
            className="mb-5 mt-4 card-login"
            style={{ padding: "2rem", borderRadius: "10px" }}
          >
            <h3 className="py-3">Register Showroom</h3>
            <form onSubmit={handleRegister}>
              <div className="row">
                <div className="col-12">
                  <label>
                    <h6>Account ID</h6>
                  </label>
                  <Input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    invalid={error === "This account ID cannot be used."}
                  />
                  <p className="mt-3" style={{ color: "red" }}>
                    {error === "This account ID cannot be used." && error}
                  </p>
                </div>
                <div className="col-12 mb-4">
                  <label>
                    <h6>Name</h6>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-4">
                  <label>
                    <h6>Password</h6>
                  </label>
                  <div className="input-with-icon">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      invalid={error === "Incorrect authentication password"}
                    />
                    <span
                      className={isPasswordError}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash fill="black" />
                      ) : (
                        <FaEye fill="black" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label>
                    <h6>Password Confirmation</h6>
                  </label>
                  <div className="input-with-icon">
                    <Input
                      type={showPasswordConfirmation ? "text" : "password"}
                      required
                      className="form-control"
                      placeholder="Password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      invalid={error === "Incorrect authentication password"}
                    />
                    <span
                      className={isPasswordError}
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                    >
                      {showPasswordConfirmation ? (
                        <FaEyeSlash fill="black" />
                      ) : (
                        <FaEye fill="black" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-block text-light mt-5 mb-4 py-2"
                    style={{ backgroundColor: "#24a2b7" }}
                    disabled={buttonLoading ? true : false}
                    onClick={() =>
                      gaEvent("Register Screen", "Register Button", "Register")
                    }
                  >
                    {buttonLoading ? (
                      <Loading color="white" size={8} />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Register;
