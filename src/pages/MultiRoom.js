import React, { useEffect, useState } from 'react'
import { Container, Button, Col, Row } from 'reactstrap'
import { FaUsersCog, FaUsersSlash, FaUsers } from "react-icons/fa";
import { MdResetTv } from "react-icons/md";

import MainLayout from './layout/MainLayout'
import Multi from 'parts/Multi';
import Loading from 'components/Loading';

export default function MultiRoom(props) {
  const [layout, setLayout] = useState('6');
  const [loading, setLoading] = useState(false);

  const changeLayout = () => {
    setLayout('4');
  }

  const fourLayout = () => {
    setLayout('3');
  }

  const resetLayout = () => {
    setLayout('6')
  }

  const iconCss = {
    fontSize: 20, marginBottom: 2
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [layout])

  const isMultiRoom = layout === '4' || layout === '3' ? 'isMultiRoom' : '';

  return (
    <div>
      <MainLayout {...props} isMultiRoom={isMultiRoom}>
        <Container fluid>
          <Row>
            <Col>
              <Button className="mb-3" onClick={changeLayout} color="info">
                <FaUsers style={iconCss} /> Set 3 Room
              </Button>
              <Button className="mb-3 ml-3" onClick={fourLayout} color="info">
                <FaUsersCog style={iconCss} /> Set 4 Room
              </Button>
              <Button className="mb-3 ml-3" onClick={resetLayout} color="danger">
                <MdResetTv style={iconCss} /> Reset Layout
              </Button>
              <Button className="mb-3 ml-3" onClick={() => window.location.reload()} color="secondary">
                <FaUsersSlash style={iconCss} /> Reset All Room
              </Button>
            </Col>
          </Row>
          <Row>
            <Multi layout={layout} />
            <Multi layout={layout}/>
            {layout === '4' || layout == '3' ? (
              loading && layout !== '3' ? <Loading /> :
              <Multi layout={layout}/>
            ) : ''}
            {layout === '3' && (
              loading && layout !== '4' ? <Loading />  :
              <Multi layout={layout}/>
            )}
          </Row>
        </Container>
      </MainLayout>
    </div>
  )
}
