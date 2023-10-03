import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
} from "reactstrap";

import Footer from "../../Components/Layouts/Footer";
import Header from "../../Components/Layouts/Header";
import MainContent from "../../Components/Layouts/MainContent";
import { System } from "../../Helpers/types";
import { createSystem } from "../../Components/SystemCrud";
import useAlert from "../../Components/Hooks/Alert";

function SystemCreate() {
  const navigate = useNavigate();
  const { alertObj, activateAlert } = useAlert();

  const [newSystem, setNewSystem] = useState<System>({
    description: "",
    acronym: "",
    email: "",
    url: "",
  });

  const handleCreateSystem = async () => {
    let systemToCreate = newSystem;

    if (!systemToCreate.description || !systemToCreate.acronym) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    // remove os campos que não serão enviados
    if (!systemToCreate.email) {
      delete systemToCreate.email;
    }
    if (!systemToCreate.url) {
      delete systemToCreate.url;
    }

    try {
      const response = await createSystem(newSystem);
      const data = await response.json();
      activateAlert("success", "Sistema criado com sucesso!");
      // after 2s, redirect to home
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      activateAlert("danger", "Erro ao criar o sistema!");
    }

    // TODO if sucess, redirect after 2s
  };
  return (
    <React.Fragment>
      <div className="page-content h-100 w-100">
        <Container fluid>
          <Header>
            <h1 className="display-5 fw-bold">Manter Sistema</h1>
          </Header>

          <MainContent>
            <Card>
              <CardHeader>
                <h3 style={{ color: "green", fontWeight: "bold" }}>
                  Dados do Sistema
                </h3>
              </CardHeader>
              <CardBody>
                <Alert isOpen={alertObj.isVisible} color={alertObj.type}>
                  {alertObj.message}
                </Alert>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Col className="mt-3 mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Descrição <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="w-50 mx-3"
                      bsSize="lg"
                      maxLength={100}
                      value={newSystem.description}
                      onChange={(e) =>
                        setNewSystem({
                          ...newSystem,
                          description: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Sigla <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="w-50 mx-3"
                      bsSize="lg"
                      maxLength={10}
                      value={newSystem.acronym}
                      onChange={(e) =>
                        setNewSystem({ ...newSystem, acronym: e.target.value })
                      }
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      E-mail de atendimento do sistema
                    </Label>
                    <Input
                      type="email"
                      className="w-50 mx-3"
                      bsSize="lg"
                      maxLength={100}
                      value={newSystem.email}
                      onChange={(e) =>
                        setNewSystem({ ...newSystem, email: e.target.value })
                      }
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      URL
                    </Label>
                    <Input
                      type="text"
                      className="w-50 mx-3"
                      bsSize="lg"
                      maxLength={50}
                      value={newSystem.url}
                      onChange={(e) =>
                        setNewSystem({ ...newSystem, url: e.target.value })
                      }
                    />
                  </Col>
                </Col>
              </CardBody>
            </Card>
          </MainContent>

          <Footer>
            <Button
              className="me-4 btn-lg"
              color="primary"
              onClick={() => navigate("/")}
            >
              Voltar
              <i className="ri-arrow-left-line ms-2"></i>
            </Button>
            <Button
              className="btn-lg"
              color="success"
              onClick={() => handleCreateSystem()}
            >
              Salvar
              <i className="ri-save-line ms-2"></i>
            </Button>
          </Footer>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default SystemCreate;
