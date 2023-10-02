import React from "react";
import { Container } from "reactstrap";

import "../../index.css";
import Header from "../../Components/Layouts/Header";
import Footer from "../../Components/Layouts/Footer";
import MainContent from "../../Components/Layouts/MainContent";

function Test() {
  return (
    <React.Fragment>
      <div className="page-content h-100 w-100">
        <Container fluid>
          <Header>header</Header>

          <MainContent>maincontent</MainContent>

          <Footer>footer</Footer>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Test;
