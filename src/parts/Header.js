import React from 'react';
import Button from 'elements/Button';
import BrandIcon from 'parts/IconText';
import Fade from 'react-reveal';

export default function Header(props) {
  const getNavLinkClass = path => {
    return props.location.pathname === path ? " active" : "";
  };

  const isLive = (path) => {
    return props.location.pathname === path ? "48px" : "container";
  };

  const headerLive = (path) => {
    return props.location.pathname === path ? "48px" : "container";
  };

  if (props.isCentered) {
    return (
      <Fade>
        <header className="sapcing-sm text-center mt-2">
          <div className="container mb-2">
            <Button className="brand-text-icon" href="" type="link">
              Stay<span className="text-gray-900">cation.</span>
            </Button>
          </div>
        </header>
      </Fade>
    );
  }

  return (
    <Fade>
      <header className="sapcing-sm">
        <div className={isLive("/live-stream")} style={{marginLeft: isLive("/live-stream"), marginRight: headerLive("/live-stream")}}>
          <nav className="navbar navbar-expand-lg navbar-light">
            <BrandIcon />
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="">
                    Home
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/live-stream")}`}>
                  <Button className="nav-link" type="link" href="/live-stream">
                    Live Stream
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/agents")}`}>
                  <Button className="nav-link" type="link" href="/agents">
                    Agents
                  </Button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  )
}
