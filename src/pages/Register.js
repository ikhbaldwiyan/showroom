import axios from "axios";
import { Loading } from "components";
import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { REGISTER } from "utils/api/api";
import { gaEvent } from "utils/gaEvent";
import MainLayout from "./layout/MainLayout";

const Register = (props) => {
  const [accountId, setAccountId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
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
        avatar_id: 1,
      });

      if (response.data.captcha_url) {
        setButtonLoading(false);
      }

      if (response.data.status.ok) {
        setButtonLoading(false);
        gaEvent("Register Screen", "Register Success", "Register")

        toast.info(`Register Success Please login ${response.data.profile.name}`, {
          theme: "colored",
          autoClose: 1800,
        });

        setTimeout(() => {
          navigate.push("/login");
        }, 2500);
      }

      if (response.data.error.length > 0) {
        setError(
          response.data.error ??
            "An error occured. Please go back and try again."
        );
        toast.error(
          response.data.error ??
            "An error occured. Please go back and try again.",
          {
            theme: "colored"
          }
        );
      }
    } catch (err) {
      console.log(error);
      gaEvent("Register Screen", "Register Failed", "Register")
      setButtonLoading(false);
    }
  };

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
                <div className="col-12 mb-4">
                  <label>
                    <h6>Account ID</h6>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Account ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  />
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
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="password-toggle-icon"
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
                    <input
                      type={showPasswordConfirmation ? "text" : "password"}
                      required
                      className="form-control"
                      placeholder="Password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
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
                    onClick={() => gaEvent("Login Screen", "Login Button", "Login")}
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
