import React from "react";
import AlertInfo from "./AlertInfo";

const ComingSoon = () => {
  return (
    <div>
      <h2>JKT48 Official SHOWROOM</h2>
      <img className="rounded mt-3" alt="JKT48 Official" src="https://static.showroom-live.com/image/room/cover/73f495d564945090f4af7338a42ce09ffa12d35fbfa8ce35c856220bcf96c5f3_m.png?v=1683304746" />
      <h3 className="py-3 text-danger">Premium Live Feature Coming Soon</h3>
      <p>Stay tune on discord for update join group below</p>
      <AlertInfo />
    </div>
  );
};

export default ComingSoon;
