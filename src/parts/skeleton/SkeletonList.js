import React from 'react'
import Skeleton from "react-content-loader";
import { skeletonIsDark } from 'utils/skeletonIsDark';

function SkeletonList({theme}) {
  return (
    <Skeleton height={450} width={1300} backgroundColor={skeletonIsDark(theme, true)} foregroundColor={skeletonIsDark(theme)}>
      <rect x="0" y="6" rx="8" ry="8" width="340" height="200" />
      <rect x="370" y="6" rx="8" ry="8" width="340" height="200" />
      <rect x="740" y="6" rx="8" ry="8" width="340" height="200" />
      <rect x="0" y="230" rx="8" ry="8" width="340" height="200" />
      <rect x="370" y="230" rx="8" ry="8" width="340" height="200" />
      <rect x="740" y="230" rx="8" ry="8" width="340" height="200" />
    </Skeleton>
  )
}

export default SkeletonList;