import moment from "moment";
import React from "react";
import {
  FaCommentDots,
  FaComments,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";
import {
  RiPlayCircleLine,
  RiStopCircleLine,
  RiTimerFlashFill,
} from "react-icons/ri";
import formatLongDate from "utils/formatLongDate";
import formatNumber from "utils/formatNumber";
import { getLiveDuration } from "utils/getLiveDuration";

const LiveInfo = ({ history }) => {
  return (
    <>
      <img
        className="rounded-lg"
        width="100%"
        alt={history?.room_info?.name}
        src={history?.room_info?.img.replace("m.jpeg", "l.jpeg")}
      />
      <div className="row mt-3">
        <div className="col-6">
          <div className="live-start">
            <div className="live-info-wrapper mt-1">
              <RiPlayCircleLine className="mb-2" color="#ECFAFC" size={50} />
              <div className="mt-1">
                <span className="live-text">Start</span>
                <p className="theater-time mt-1">
                  {formatLongDate(history?.live_info.date.start, true)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="live-end">
            <div className="live-info-wrapper mt-1">
              <RiStopCircleLine className="mb-2" color="#ECFAFC" size={50} />
              <div className="mt-1">
                <span className="live-text">End</span>
                <p className="theater-time mt-1">
                  {formatLongDate(history?.live_info.date.end, true)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="live-duration">
            <div className="duration-wrapper mt-1">
              <RiTimerFlashFill
                className="mb-2 ml-1"
                color="#ECFAFC"
                size={50}
              />
              <div className="mt-1">
                <span className="live-text">Duration</span>
                <p className="theater-time mt-1">
                  {getLiveDuration(
                    history?.live_info.date.start,
                    history?.live_info.date.end
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="live-date">
            <div className="duration-wrapper mt-1">
              <FaRegCalendarAlt
                className="mb-2 ml-1"
                color="#ECFAFC"
                size={50}
              />
              <div className="mt-1">
                <span className="live-text">Live Date</span>
                <p className="theater-time mt-1">
                  {moment(history?.live_info.date.start).format(
                    "dddd DD MMMM YYYY"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-12">
          <div className="live-start">
            <div className="duration-wrapper mt-1">
              <FaComments className="mb-2 ml-1" color="#ECFAFC" size={50} />
              <div className="mt-1">
                <span className="live-text">Comments</span>
                {history?.live_info?.comments ? (
                  <p className="theater-time mt-1">
                    <FaCommentDots className="mb-1 mr-1" />
                    {formatNumber(history?.live_info?.comments?.num)} of
                    <FaUser className="mb-1 ml-2" />{" "}
                    {formatNumber(history?.live_info?.comments?.users)} Users
                  </p>
                ) : (
                  <p>Data comments not found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveInfo;
