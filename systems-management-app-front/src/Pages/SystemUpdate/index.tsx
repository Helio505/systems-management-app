import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
import CharsCounter from "../../Components/CharsCounter";
import { System } from "../../Helpers/types";
import { updateSystem } from "../../Components/SystemCrud";
import convertDate from "../../Helpers/convertDate";

function SystemUpdate() {
  const location = useLocation();
  const navigate = useNavigate();

  const [previousSystem, setPreviousSystem] = React.useState<System | null>(
    null
  );
  const [newSystem, setNewSystem] = React.useState<any>({
    description: "",
    acronym: "",
    email: "",
    url: "",
    status: "",
    justification: "",
  });

  // TODO reativar
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      const systemFromRouteState = location.state.system;

      // System before update
      setPreviousSystem(systemFromRouteState);

      // System after and during update
      setNewSystem(systemFromRouteState);
      setNewSystem((prevState: any) => ({
        ...prevState,
        justification: "",
      }));
    }
  }, []);

  const handleUpdateSystem = async () => {
    const { description, acronym, email, url, status, justification } =
      newSystem;
    if (!description || !acronym || !status || !justification) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    // const confirm = window.confirm("Deseja realmente atualizar o sistema?");

    if (!previousSystem) {
      alert("Sistema não encontrado");
      return;
    }

    if (!previousSystem.id) {
      alert("Sistema não encontrado");
      return;
    }

    // If user didn't change anything, don't update
    if (
      previousSystem.description === newSystem.description &&
      previousSystem.acronym === newSystem.acronym &&
      previousSystem.email === newSystem.email &&
      previousSystem.url === newSystem.url &&
      previousSystem.status === newSystem.status &&
      newSystem.justification === ""
    ) {
      alert("Nenhuma alteração realizada");
      return;
    }

    try {
      const response = await updateSystem(previousSystem.id, newSystem);
      const data = await response.json();
    } catch (error) {
      console.error(error);
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

            <Card>
              <CardHeader>
                <h3 style={{ color: "green", fontWeight: "bold" }}>
                  Controle do Sistema
                </h3>
              </CardHeader>
              <CardBody>
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
                      Status <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="select"
                      className="w-50 mx-3"
                      bsSize="lg"
                      value={newSystem.status}
                      onChange={(e) =>
                        setNewSystem({ ...newSystem, status: e.target.value })
                      }
                    >
                      <option value="ATIVO">ATIVO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </Input>
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Usuário responsável pela última alteração
                    </Label>
                    <Input
                      type="text"
                      className="w-50 mx-3"
                      bsSize="lg"
                      maxLength={100}
                      disabled
                      value={previousSystem?.user}
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Data da última alteração
                    </Label>
                    <Input
                      type="email"
                      className="w-50 mx-3"
                      bsSize="lg"
                      disabled
                      value={convertDate(previousSystem?.updatedAt) || ""}
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Justificativa da última alteração
                    </Label>
                    <Input
                      type="textarea"
                      className="w-50 mx-3"
                      disabled
                      style={{
                        overflowY: "scroll",
                      }}
                      maxLength={500}
                      bsSize="lg"
                      value={previousSystem?.justification}
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Nova justificativa de alteração{" "}
                      <span className="text-danger">*</span>
                      <CharsCounter
                        text={newSystem.justification}
                        limit={500}
                      />
                    </Label>

                    <Input
                      type="textarea"
                      className="w-50 mx-3"
                      style={{
                        overflowY: "scroll",
                      }}
                      maxLength={500}
                      bsSize="lg"
                      value={newSystem.justification}
                      onChange={(e) =>
                        setNewSystem({
                          ...newSystem,
                          justification: e.target.value,
                        })
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
              onClick={() => handleUpdateSystem()}
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

export default SystemUpdate;
