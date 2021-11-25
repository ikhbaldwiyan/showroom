import React from 'react';
import TimeAgo from 'react-timeago';
import languageString from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import getSchedule from 'utils/getSchedule';

function LastSeen({times}) {
  const formatter = buildFormatter(languageString)
  const getInfo = getSchedule(times);
  const liveTime = getInfo.replace('.', ':');

  return (
    <h5 className="text-gray-400" style={{ display: 'inline' }}>
      Live <TimeAgo date={liveTime} formatter={formatter} className="mr-2" />
    </h5>
  );
}

export default LastSeen;
