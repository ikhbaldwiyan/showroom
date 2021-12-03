import React from 'react'
import Skeleton from "react-content-loader";
import { skeletonIsDark } from 'utils/skeletonIsDark';

function SkeletonLive({theme}) {
  return (
    <Skeleton height={190} width={1300} backgroundColor={skeletonIsDark(theme, true)} foregroundColor={skeletonIsDark(theme)}>
      <rect x="0" y="6" rx="8" ry="8" width="240" height="180" />
      <rect x="270" y="6" rx="8" ry="8" width="240" height="180" />
      <rect x="550" y="6" rx="8" ry="8" width="240" height="180" />
      <rect x="830" y="6" rx="8" ry="8" width="240" height="180" />
    </Skeleton>
  )
}

export default SkeletonLive;