import React from 'react'
import { Row } from 'reactstrap'
import MainLayout from './layout/MainLayout'
import Multi from 'parts/Multi';

export default function MultiRoom(props) {
  return (
    <div>
      <MainLayout {...props}>
        <Row>
          <Multi />
          <Multi />
        </Row>
      </MainLayout>
    </div>
  )
}
