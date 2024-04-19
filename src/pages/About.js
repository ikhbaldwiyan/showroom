import { activityLog } from "utils/activityLog";
import { getSession } from "utils/getSession";
import MainLayout from "./layout/MainLayout";

function About(props) {
  const activityTrack = (logName, description) => {
    activityLog({
      logName,
      description,
      userId: getSession().userProfile._id ?? "64e2090061ec79ea209a0160"
    });
  };

  return (
    <MainLayout
      title="About"
      description="jkt48 showroom"
      keywords="apa itu jkt48 showroom?"
      {...props}
    >
      <div className="layout p-2">
        <div className="mb-4" style={{ height: "auto" }}>
          <h3>About</h3>
          <p className="mt-4">
            JKT48 SHOWROOM adalah website fanmade yang bertujuan untuk memfilter
            room member JKT48. <br />
            disini kalian bisa mencoba ngidol dengan pengalaman baru dan User
            Interface yang berbeda, <br />
            selain itu kalian bisa melihat daftar room member jkt48 dan jadwal
            showroom jkt48 yang akan live.
          </p>
          <p>
            Website JKT48 Showroom ini di kembangkan oleh
            <a
              href="https://twitter.com/inzoid"
              rel="noreferrer"
              target="_blank"
              onClick={() =>
                activityTrack("About Link", "Twitter Inzoid Click")
              }
            >
              {" "}
              <b>Inzoid</b>{" "}
            </a>
            dan masih terus di develop sampai saat ini. <br />
            Jika kalian ingin mendukung perkembangan project ini untuk masalah
            server dan lainnya <br />
            kalian bisa donasi di link saweria berikut{" "}
            <a
              href="https://saweria.co/Inzoid"
              rel="noreferrer"
              target="_blank"
              onClick={() => activityTrack("About Link", "Donation Link Click")}
            >
              https://saweria.co/Inzoid
            </a>
          </p>
          <p>Social Media :</p>
          <ul>
            <li>
              <a
                href={process.env.REACT_APP_DISCORD_LINK}
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  activityTrack("About Link", "Discord Banner Click")
                }
              >
                <img
                  className="rounded"
                  src="https://discordapp.com/api/guilds/1076511743909564506/widget.png?style=banner3"
                  alt="discord banner"
                  height="110"
                />
              </a>
            </li>
            <li className="mt-2">
              <a
                href="https://twitter.com/JKT48_SHOWROOM"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  activityTrack("About Link", "Twitter Link Click")
                }
              >
                Twitter
              </a>{" "}
              (@JKT48_SHOWROOM)
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
                target="_blank"
                href="https://qiita.com/takeru7584/items/f4ba4c31551204279ed2"
              >
                https://qiita.com/takeru7584/items/f4ba4c31551204279ed2
              </a>{" "}
              (Showroom API Documentation)
            </li>
            <li>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://dc.crstlnz.my.id/recent"
              >
                https://dc.crstlnz.my.id/recent
              </a>{" "}
              (History Live Showroom)
            </li>
          </ul>
          <p>Github Source Code :</p>
          <ul>
            <li>
              <a
                href="https://github.com/jkt48-showroom"
                rel="noreferrer"
                target="_blank"
                onClick={() => activityTrack("About Link", "Github Organization Click")}
              >
                https://github.com/jkt48-showroom
              </a>{" "}
              (Github Organization)
            </li>
            <li>
              <a
                href="https://github.com/ikhbaldwiyan/showroom"
                rel="noreferrer"
                target="_blank"
                onClick={() => activityTrack("About Link", "Github FE Web Click")}
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
                  activityTrack("About Link", "Github API JS Click")
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
                  activityTrack("About Link", "Github API Laravel Click")
                }
              >
                https://github.com/AldyRevigustian/Showroom-Api
              </a>{" "}
              (AUTH SHOWROOM API)
            </li>
          </ul>
          <p>Contributors :</p>
          <ul>
            <li className="mt-2">
              <a
                href="https://github.com/ikhbaldwiyan"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  activityTrack("About Link", "Contributor Ikhbal Click")
                }
              >
                <img
                  src="https://avatars.githubusercontent.com/u/56676582?v=4"
                  alt="github"
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    marginRight: "10px"
                  }}
                />
                <span>Ikhbal Dwiyantoro</span>
              </a>{" "}
            </li>
            <li>
              <a
                href="https://github.com/AldyRevigustian"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  activityTrack("About Link", "Contributor Aldy Click")
                }
              >
                <img
                  src="https://avatars.githubusercontent.com/u/72060143?v=4"
                  alt="github"
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    marginRight: "10px"
                  }}
                />
                <span>Aldy Revigustian</span>
              </a>{" "}
            </li>
            <li>
              <a
                href="https://github.com/Ahm28"
                rel="noreferrer"
                target="_blank"
                onClick={() =>
                  activityTrack("About Link", "Contributor Ahmad Click")
                }
              >
                <img
                  src="https://joshuapenalba.com/wp-content/uploads/2014/12/github-icon.png?w=640"
                  alt="github"
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    marginRight: "10px"
                  }}
                />
                <span>Ahmad Mughni</span>
              </a>{" "}
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default About;
