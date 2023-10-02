import React from "react";
import { Col, Row } from "reactstrap";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <React.Fragment>
      <Row
        xxl={9}
        style={{
          backgroundColor: "#f2f2f2",
          height: "10vh",
        }}
      >
        <Col
          xl={3}
          className="w-100"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
            }}
          >
            <h1 className="display-5 fw-bold">{children}</h1>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Header;
