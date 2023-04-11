import React from "react";
import { Container } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import { gaEvent } from "utils/gaEvent";

function About(props) {
  return (
    <MainLayout {...props}>
      <Container>
        <div className="mb-4" style={{ height: "auto" }}>
          <h3>About</h3>
          <p>
            JKT48 SHOWROOM adalah website fanmade yang bertujuan untuk memfilter
            room member JKT48. <br />
            disini kalian bisa mencoba ngidol dengan pengalaman baru dan User
            Interface yang berbeda, <br />
            selain itu kalian bisa melihat daftar room member jeketi dan jadwal
            showroom member yang akan live.
          </p>
          <p>
            Website JKT48 Showroom ini di kembangkan oleh
            <a
              href="https://twitter.com/inzoid"
              rel="noreferrer"
              target="_blank"
              onClick={() =>
                gaEvent("About Link", "Twitter Inzoid Click", "About")
              }
            >
              {" "}
              <b>Inzoid</b>{" "}
            </a>
            dan masih terus di develop sampe saat ini. <br />
            Jika kalian ingin mendukung perkembangan project ini untuk masalah
            server dan lainnya <br />
            kalian bisa donasi di link saweria berikut{" "}
            <a
              href="https://saweria.co/Inzoid"
              rel="noreferrer"
              target="_blank"
              onClick={() =>
                gaEvent("About Link", "Donation Link Click", "About")
              }
            >
              https://saweria.co/Inzoid
            </a>
          </p>
          <p>Discord :</p>
          <ul>
            <li>
              <a
                href={process.env.REACT_APP_DISCORD_LINK}
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  gaEvent("About Link", "Discord Link Click", "About")
                }
              >
                Join Discord Grup
              </a>{" "}
              (Discord Community)
            </li>
          </ul>
          <p>Source :</p>
          <ul>
            <li>
              <a
                href="https://www.showroom-live.com/"
                rel="noreferrer"
                target="_blank"
              >
                https://www.showroom-live.com
              </a>{" "}
              (Official Showroom)
            </li>
            <li>
              <a
                style={{ wordBreak: "break-word" }}
                rel="noreferrer"
                href="https://qiita.com/takeru7584/items/f4ba4c31551204279ed2"
                target="_blank"
              >
                https://qiita.com/takeru7584/items/f4ba4c31551204279ed2
              </a>{" "}
              (Showroom API)
            </li>
          </ul>
          <p>Source Code :</p>
          <ul>
            <li>
              <a
                href="https://github.com/ikhbaldwiyan/showroom"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  gaEvent("About Link", "Github Web Click", "About")
                }
              >
                https://github.com/ikhbaldwiyan/showroom
              </a>{" "}
              (JKT48 SHOWROOM WEB)
            </li>
            <li>
              <a
                style={{ wordBreak: "break-word" }}
                rel="noreferrer"
                href="https://github.com/ikhbaldwiyan/jkt48-showroom-api"
                target="_blank"
                onClick={() =>
                  gaEvent("About Link", "Github API JS Click", "About")
                }
              >
                https://github.com/ikhbaldwiyan/jkt48-showroom-api
              </a>{" "}
              (JKT48 SHOWROOM API)
            </li>
            <li>
              <a
                style={{ wordBreak: "break-word" }}
                rel="noreferrer"
                href="https://github.com/AldyRevigustian/Showroom-Api"
                target="_blank"
                onClick={() =>
                  gaEvent("About Link", "Github API Laravel Click", "About")
                }
              >
                https://github.com/AldyRevigustian/Showroom-Api
              </a>{" "}
              (SHOWROOM LOGIN API)
            </li>
          </ul>
          <p>Contributors :</p>
          <ul>
            <li>
              <a
                href="https://github.com/AldyRevigustian"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  gaEvent("About Link", "Contributor Aldy Click", "About")
                }
              >
                <img
                  src="https://avatars.githubusercontent.com/u/72060143?v=4"
                  alt=""
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    marginRight: "10px",
                  }}
                />
                <span>Aldy Revigustian</span>
              </a>{" "}
            </li>
            <li className="mt-2">
              <a
                href="https://github.com/ikhbaldwiyan"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  gaEvent("About Link", "Contributor Ikhbal Click", "About")
                }
              >
                <img
                  src="https://avatars.githubusercontent.com/u/56676582?v=4"
                  alt=""
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    marginRight: "10px",
                  }}
                />
                <span>Ikhbal Dwiyantoro</span>
              </a>{" "}
            </li>
          </ul>
        </div>
      </Container>
    </MainLayout>
  );
}

export default About;
