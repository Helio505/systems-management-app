import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

type FooterProps = {
  children: React.ReactNode
}

const Footer = ({ children }: FooterProps) => {
  return (
    <React.Fragment>
      <Row
        xxl={9}
        style={{
          backgroundColor: "#f2f2f2",
          height: "10vh"
        }}
      >
        <Col
          xl={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%"
          }}
        >
          {children}
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Footer;