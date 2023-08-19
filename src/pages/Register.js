import axios from "axios";
import React, { useState, useEffect } from "react";
import { Loading } from "components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLoginBoxFill, RiUser3Fill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Input } from "reactstrap";
import { ACTIVITY_LOG, CREATE_USER, LOGIN, REGISTER } from "utils/api/api";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      response.data.error && showToastError(response.data.error);

      if (response.data.status.ok) {
        toast.success(
          "Register Success! You have been automatically logged in.",
          {
            theme: "colored",
            autoClose: 1800,
            icon: <RiLoginBoxFill size={30} />,
          }
        );
        axios.post(CREATE_USER, {
          user_id: accountId,
          name: response.data.profile.name
        }).then((res) => {
          axios.post(ACTIVITY_LOG, {
            user_id: res.data.user._id,
            log_name: "Register",
            description: `Register user ${res.data.user.name} from register page`,
          });
        })
        gaEvent("Register Screen", "Register Success", "Register");
        autoLogin();
      }
    } catch (err) {
      toast.error("Server down please contact admin", {
        theme: "colored",
      });
      gaEvent("Register Screen", "Register Failed", "Register");
      setButtonLoading(false);
    }
  };

  const autoLogin = async () => {
    const response = await axios.post(LOGIN, {
      account_id: accountId,
      password: password,
    });

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("session", JSON.stringify(response.data.session));
    localStorage.setItem("profile", JSON.stringify(response.data.profile));
    gaEvent("Register Screen", "Auto Login Success", "Register");

    toast.info(`Login Success, Welcome ${response.data.profile.name}`, {
      theme: "colored",
      autoClose: 1800,
      icon: <RiLoginBoxFill size={30} />,
    });

    setTimeout(() => {
      setButtonLoading(false);
      navigate.push("/");
    }, 2500);
  };

  const showToastError = (error) => {
    if (error === "Incorrect authentication password") {
      setError(error);
      toast.error("The password confirmation does not match.", {
        theme: "colored",
      });
    }

    if (error && error !== "Incorrect authentication password") {
      setError(error ?? "An error occured. Please go back and try again.");
      toast.error(error ?? "An error occured. Please go back and try again.", {
        theme: "colored",
      });
    }
  };

  const isPasswordError =
    error === "Incorrect authentication password"
      ? "password-toggle-icon mr-4"
      : "password-toggle-icon";

  return (
    <MainLayout
      title="Register Showroom JKT48"
      description="daftar showroom jkt48"
      keywords="cara daftar showroom jkt48, cara daftar akun showroom jkt48"
      {...props}
    >
      <Container>
        <div className="d-flex justify-content-center ">
          <div
            className="mb-5 mt-4 card-login"
            style={{ padding: "2rem", borderRadius: "10px" }}
          >
            <h3 className="py-3 text-center">
              <RiUser3Fill className="mb-1" /> Register Showroom
            </h3>
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
                  <p className="mt-4 mr-3">
                    Already have an account ?
                    <Link to="/login">
                      <span className="ml-2">Login here</span>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-block text-light mt-3 mb-4 py-2"
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
