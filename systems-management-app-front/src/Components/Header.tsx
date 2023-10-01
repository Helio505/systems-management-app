import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

type HeaderProps = {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <React.Fragment>
      <Row xxl={9}
        style={{
          backgroundColor: "#f2f2f2",
          height: "10vh"
        }}
      >
        <Col xl={3} className='w-100'
          style={{
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            // alignItems: "center",
          }}
        >
          {children}
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Header;