import React from "react";
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

import "../../index.css";
import { querySystems, getAllSystems } from "../../Components/SystemCrud";
import Header from "../../Components/Layouts/Header";
import Footer from "../../Components/Layouts/Footer";
import MainContent from "../../Components/Layouts/MainContent";
import SearchResultsTable from "../../Components/Tables/SearchResultsTable";
import useAlert from "../../Components/Hooks/Alert";
import { System } from "../../Helpers/types";

function SystemSearch() {
  const navigate = useNavigate();
  const { alertObj, activateAlert } = useAlert();

  const [description, setDescription] = React.useState<string>("");
  const [acronym, setAcronym] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<null | System[]>(
    null
  );

  const handleGetAllSystems = async () => {
    try {
      const response = await getAllSystems();
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuerySystems = async () => {
    let queryString = "?";
    if (description) {
      queryString += `description=${description}&`;
    }
    if (acronym) {
      queryString += `acronym=${acronym}&`;
    }
    if (email) {
      queryString += `email=${email}`;
    }

    if (queryString === "?") {
      activateAlert("warning", "Informe ao menos um filtro para a pesquisa!");
      return;
    }

    try {
      const systems = await querySystems(queryString);
      const data = await systems.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      activateAlert("danger", "Erro ao consultar sistemas!");
    }
  };

  const resetFields = () => {
    setDescription("");
    setAcronym("");
    setEmail("");
    setSearchResults(null);
  };

  return (
    <React.Fragment>
      <div className="page-content h-100 w-100">
        <Container fluid>
          <Header>
            <h1 className="display-5 fw-bold">Pesquisar Sistemas</h1>
          </Header>

          <MainContent>
            <Card>
              <CardHeader>
                <h3 style={{ color: "green", fontWeight: "bold" }}>
                  Filtro de Consulta
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
                      Descrição
                    </Label>
                    <Input
                      type="text"
                      className="w-50 mx-3"
                      bsSize="lg"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </Col>
                  <Col className="mb-3 d-flex justify-content-center">
                    <Label className="w-50 ms-3 fs-4 fw-bold border-bottom">
                      Sigla
                    </Label>
                    <Input
                      type="text"
                      className="w-50 mx-3"
                      bsSize="lg"
                      onChange={(e) => setAcronym(e.target.value)}
                      value={acronym}
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
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </Col>
                </Col>

                {searchResults && searchResults.length > 0 ? (
                  <SearchResultsTable searchResults={searchResults} />
                ) : (
                  <Card className="mb-3 bg-light border-0 m-3">
                    <CardBody>
                      <h3>
                        Nenhum sistema encontrado com os filtros informados!
                      </h3>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>
          </MainContent>

          <Footer>
            <Button
              className="me-2 btn-lg"
              color="success"
              onClick={() => {
                handleQuerySystems();
              }}
            >
              Pesquisar
              <i className="ri-search-line ms-2 align-middle"></i>
            </Button>
            <Button
              className="ms-2 mx-2 btn-lg"
              color="success"
              onClick={() => handleGetAllSystems()}
            >
              Mostrar Todos
              <i className="ri-database-2-line ms-2 align-middle"></i>
            </Button>
            <Button
              className="ms-2 mx-2 btn-lg"
              color="danger"
              onClick={() => resetFields()}
            >
              Limpar
              <i className="ri-close-circle-line ms-2 align-middle"></i>
            </Button>
            <Button
              className="ms-2 mx-2 btn-lg"
              color="primary"
              onClick={() => navigate("/system-create")}
            >
              Novo Sistema
              <i className="ri-add-circle-line ms-2 align-middle"></i>
            </Button>
          </Footer>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default SystemSearch;
