import React from 'react'
import Skeleton from "react-content-loader";
import { isMobile } from "react-device-detect";
import { Row, Col } from 'reactstrap';

export default function Skeletons() {
  return (
    !isMobile ? ( 
      <Row>
        <Col sm="6" className="mb-2">
          <Skeleton
            width="100%"
            height={70}
          >
            <rect y="17" rx="4" ry="4" width="240" height="10" />
            <rect y="40" rx="3" ry="1" width="260" height="13" />
          </Skeleton>
          <Skeleton width="100%">
            <rect width="100%" height="100%" />
          </Skeleton>
          <Skeleton width="100%" className="mt-2">
            <rect width="100%" height="100%" />
          </Skeleton>
          <Skeleton width="100%">
            <rect width="100%" height="100%" />
          </Skeleton>
          <Skeleton width="100%">
            <rect width="100%" height="50%" />
          </Skeleton>
        </Col>
        <Col sm="6" className="mb-2">
          <Skeleton height={70}>
            <rect x="0" y="100" rx="5" ry="5" width="60" height="60" />
          </Skeleton>
          <Skeleton>
            <rect width="100%" height="100%" />
          </Skeleton>
          <Skeleton className="mt-2">
            <rect width="100%" height="100%" />
          </Skeleton>
          <Skeleton>
            <rect width="100%" height="100%" />
          </Skeleton>
          <Skeleton>
            <rect width="100%" height="50%" />
          </Skeleton>
        </Col>
      </Row> 
    ) : (
      <Row>
        <Col sm="12">
          <div className="mb-3">
            <Skeleton width="100%" height={80}>
              <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
              <rect x="80" y="17" rx="4" width="300" height="13" />
              <rect x="80" y="40" rx="3" width="250" height="10" />
            </Skeleton>
            <Skeleton width="100%">
              <rect width="100%" height="100%" />
            </Skeleton>
            <Skeleton width="100%" className="mt-2">
              <rect width="100%" height="100%" />
            </Skeleton>
            <Skeleton width="100%">
              <rect width="100%" height="100%" />
            </Skeleton>
          </div>
        </Col>
      </Row>
    )
  )
}
