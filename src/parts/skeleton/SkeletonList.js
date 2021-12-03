import React from 'react'
import Skeleton from "react-content-loader";

function SkeletonList() {
  return (
    <Skeleton height={450} width={1300}>
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