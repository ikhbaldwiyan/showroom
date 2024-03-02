import React from 'react'
import { FaInfoCircle } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { UncontrolledAlert } from "reactstrap"
import { activityLog } from "utils/activityLog"
import { gaTag } from "utils/gaTag"

const InfoFeature = () => {
  const user = useSelector((state) => state.user.user);

  const handleClick = () => {
    gaTag({
      action: "new_feature_click",
      label: "Sharing Live",
      category: "Alert Link"
    })

    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "Alert Link",
      description: "Sharing live info page",
    })

    console.log("clicked")
  }

  return (
    <UncontrolledAlert color="primary">
      <FaInfoCircle size="23px" className="mb-1 mr-2" />
      <span className="discord-text">Fitur Sharing Live streaming theater sudah tersedia</span>

      <Link to="/sharing-live">
        <b onClick={handleClick} className="mx-1 discord-text">
          CEK DISINI
        </b>
      </Link>
    </UncontrolledAlert>)
}

export default InfoFeature