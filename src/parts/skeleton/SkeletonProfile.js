import React from 'react'
import Skeleton from "react-content-loader";
import { isMobile } from "react-device-detect";
import { Row, Col } from 'reactstrap';
import { skeletonIsDark } from 'utils/skeletonIsDark';

export default function SkeletonProfile({theme}) {
  const backgorundDark = skeletonIsDark(theme, true);
  const foregreoundDark = skeletonIsDark(theme);

  return (
    !isMobile ? ( 
      <Row>
        <Col sm="6" className="mb-2">
          <Skeleton
            width="100%"
            height={70}
            backgroundColor={backgorundDark} foregroundColor={foregreoundDark}
          >
            <rect y="17" rx="4" ry="4" width="240" height="12" />
            <rect y="40" rx="4" ry="4" width="260" height="13" />
          </Skeleton>
          <Skeleton width="100%" height="180" backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
            <rect rx="4" ry="4" width="100%" height="100%" />
          </Skeleton>
          <Skeleton width="100%" height="400" className="mt-2" backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
            <rect rx="4" ry="4" width="100%" height="100%" />
          </Skeleton>
        </Col>
        
        <Col sm="6" className="mb-2">
          <Skeleton height={70} backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
            <rect x="0" y="100" rx="5" ry="5" width="60" height="60" />
          </Skeleton>
          <Skeleton height="180" width="340" backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
            <rect rx="4" ry="4" width="100%" height="100%" />
          </Skeleton>
          <Skeleton width="100%" height="400" className="mt-2" backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
            <rect rx="4" ry="4" width="100%" height="100%" />
          </Skeleton>
        </Col>
      </Row> 
    ) : (
      <Row>
        <Col sm="12">
          <div className="mb-3">
            <Skeleton
              width="100%"
              height={70}
              backgroundColor={backgorundDark} foregroundColor={foregreoundDark}
            >
              <rect y="17" rx="4" ry="4" width="240" height="12" />
              <rect y="40" rx="4" ry="4" width="260" height="13" />
            </Skeleton>
              <Skeleton width="100%" height="200" backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
              <rect rx="4" ry="4" width="100%" height="100%" />
            </Skeleton>
            <Skeleton width="100%" height="400" className="mt-2" backgroundColor={backgorundDark} foregroundColor={foregreoundDark}>
              <rect rx="4" ry="4" width="100%" height="100%" />
            </Skeleton>
          </div>
        </Col>
      </Row>
    )
  )
}
