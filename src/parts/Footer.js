import React from "react";
import Button from "elements/Button";
import Logo from "parts/Logo";
import { getSession } from "utils/getSession";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { isMobile } from "react-device-detect";

export default function Footer({ theme }) {
  return (
    <footer className="layout mt-1">
      <div className="row">
        <div
          className={`col-md-5 ${!isMobile && "mx-3"}`}
          style={{ width: 380 }}
        >
          <Logo theme={theme} />
          <p className="brand-tagline">
            JKT48 SHOWROOM hadir untuk memberikan pengalaman ngidol yang lebih
            seru dan interaktif, dan dengan fitur multiroom, kamu bisa menikmati
            pengalaman menonton yang lebih menyenangkan dan berbeda dari yang
            lainnya.
          </p>
        </div>
        <div className="col-auto mr-2">
          <h6 className="mt-2">Explore</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Button type="link" href="/list-room">
                Room List
              </Button>
            </li>
            <li className="list-group-item">
              <Button type="link" href="/multi-room">
                Multi Room
              </Button>
            </li>

            {getSession().session && (
              <li className="list-group-item">
                <Button type="link" href="/follow">
                  Followed Room
                </Button>
              </li>
            )}
            <li className="list-group-item">
              <Button type="link" href="/theater-schedule">
                Theater Schedule
              </Button>
            </li>
          </ul>
        </div>
        <div className="col-auto mr-5">
          <h6 className="mt-2">More Info</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Button type="link" href="/login">
                Login
              </Button>
            </li>
            <li className="list-group-item">
              <Button type="link" href="/login">
                Register
              </Button>
            </li>
            <li className="list-group-item">
              <Button type="link" href="/privacy-policy">
                Privacy Policy
              </Button>
            </li>
          </ul>
        </div>
        <div className="col-auto mr-5">
          <h6 className="mt-2">Contact Us</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <a href="mailto:showroomjkt48@gmail.com">
                <AiOutlineMail size={18} /> showroomjkt48@gmail.com
              </a>
            </li>
          </ul>

          <li className="list-group-item">
            <Button
              type="link"
              href={process.env.REACT_APP_DISCORD_LINK}
              isExternal
              target="_blank"
            >
              <FaDiscord size={18} /> Discord Group
            </Button>
          </li>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Button
                type="link"
                href="https://twitter.com/JKT48_SHOWROOM"
                isExternal
                target="_blank"
              >
                <FaTwitter size={18} /> @JKT48_SHOWROOM
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col text-center copyrights">
          Copyright 2023 • All rights reserved • JKT48SHOWROOM
        </div>
      </div>
    </footer>
  );
}
