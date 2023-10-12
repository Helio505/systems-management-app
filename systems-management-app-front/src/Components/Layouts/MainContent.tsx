import React from "react";
import { Col, Row } from "reactstrap";

type MainContentProps = {
  children: React.ReactNode;
};

const MainContent = ({ children }: MainContentProps) => {
  return (
    <React.Fragment>
      <Row
        xxl={9}
        style={{
          backgroundColor: "#f2f2f2",
          height: "60%",
        }}
      >
        <Col
          xl={3}
          className="w-100"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MainContent;
