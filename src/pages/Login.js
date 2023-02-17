import { Container } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LOGIN } from "utils/api/api";
import { toast } from "react-toastify";
import { Loading } from "components";
import { RiLoginBoxFill } from "react-icons/ri";

function Login(props) {
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaWord, setCaptchaWord] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [cookiesId, setCookiesId] = useState("");
  const [csrf, setCsrf] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    window.document.title = "Login JKT48 SHOWROOM";
    const userSession = localStorage.getItem("session");
    if (userSession) {
      window.location = "/";
    }
  }, []);

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
      }

      if (response.data.user.ok) {
        setButtonLoading(false);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("session", JSON.stringify(response.data.session));
        localStorage.setItem("profile", JSON.stringify(response.data.profile));

        toast.info(`Login Success, Welcome ${response.data.profile.name}`, {
          theme: "colored",
          autoClose: 1800,
          icon: <RiLoginBoxFill size={30} />
        });

        setTimeout(() => {
          window.location = "/";
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
      }
    } catch (err) {
      console.log(error);
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
            <h1 className="py-3">Login Showroom</h1>
            <p style={{ textAlign: "justify" }}>
              Silakan login menggunakan akun showroom Anda untuk mengakses fitur
              kirim komentar. Tenang, data Anda akan segera dikirimkan ke situs
              showroom dan tidak akan disimpan dalam basis data kami, sehingga
              privasi dan keamanan informasi Anda tetap terjaga.
            </p>
            <br />
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
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
              <div className="form-group">
                <label>
                  <h6>Password</h6>
                </label>
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p style={{ color: "red" }}>{error ? error : ""}</p>
              <div className="mt-4" id="captcha" style={{ display: "none" }}>
                <label className="form-label">
                  Tolong verifikasi captcha di bawah ini
                </label>
                <img
                  src={captcha}
                  alt=""
                  style={{ minWidth: "100%", border: 0 }}
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Capctha"
                  value={captchaWord}
                  onChange={(e) => setCaptchaWord(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-block text-light mt-5 mb-4 py-2"
                style={{ backgroundColor: "#24a2b7" }}
                disabled={buttonLoading ? true : false}
              >
                {buttonLoading ? <Loading color="white" size={8} /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

export default Login;
