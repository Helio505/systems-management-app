import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row, Table } from 'reactstrap';
import React, { useEffect } from 'react';
import {
  querySystems,
  getAllSystems,
  getSystemById,
  createSystem,
  updateSystem,
  deleteSystem,
} from "../../Components/SystemCrud";
import '../../index.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import MainContent from '../../Components/MainContent';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SystemSearch() {
  const navigate = useNavigate();

  const [description, setDescription] = React.useState<string>("");
  const [acronym, setAcronym] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const handleGetAllSystems = async () => {
    const response = await getAllSystems();
    const data = await response.json();
    setSearchResults(data);
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
      alert("Preencha ao menos um campo para realizar a consulta!");
      return;
    }

    const systems = await querySystems(queryString);
    const data = await systems.json();
    setSearchResults(data);
  }

  const resetFields = () => {
    setDescription("");
    setAcronym("");
    setEmail("");
    setSearchResults([]);
  }

  return (
    <React.Fragment>
      <div className="page-content h-100 w-100">
        <Container fluid>
          <Header>
            <Row style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
            }}>
              <Col className='d-flex justify-content-start'>
                <h1 className='display-5 fw-bold'>Pesquisar Sistemas</h1>
              </Col>
            </Row>
          </Header>

          <MainContent>
            <Card
              style={{
                height: "95%",
              }}>
              <CardHeader>
                <h3 style={{ color: "green", fontWeight: "bold", }}>
                  Filtro de Consulta
                </h3>
              </CardHeader>
              <CardBody>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%"
                  }}>
                  <Col className='mt-3 mb-3 d-flex justify-content-center'>
                    <Label
                      className='w-50 ms-3 fs-4 fw-bold border-bottom'>
                      Descrição
                    </Label>
                    <Input
                      type='text'
                      className='w-50 mx-3'
                      bsSize='lg'
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </Col>
                  <Col className='mb-3 d-flex justify-content-center'>
                    <Label
                      className='w-50 ms-3 fs-4 fw-bold border-bottom'>
                      Sigla</Label>
                    <Input
                      type='text'
                      className='w-50 mx-3'
                      bsSize='lg'
                      onChange={(e) => setAcronym(e.target.value)}
                      value={acronym}
                    />
                  </Col>
                  <Col className='mb-3 d-flex justify-content-center'>
                    <Label
                      className='w-50 ms-3 fs-4 fw-bold border-bottom'>
                      E-mail de atendimento do sistema
                    </Label>
                    <Input
                      type='email'
                      className='w-50 mx-3'
                      bsSize='lg'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </Col>
                </Col>

                {
                  searchResults && searchResults.length > 0 ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Sigla</th>
                          <th>E-mail de atendimento do sistema</th>
                          <th>URL</th>
                          <th>Status</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((system) => (
                          <tr key={system.id}>
                            <td>{system.description}</td>
                            <td>{system.acronym}</td>
                            <td>{system.email}</td>
                            <td>{system.url}</td>
                            <td>{system.status}</td>
                            <td>
                              <Button
                                className='btn-sm'
                                color='success'
                                onClick={() => {
                                  navigate(`/system-update`, {
                                    state: {
                                      system: system
                                    }
                                  });
                                }}>
                                Editar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Card className='mb-3 bg-light border-0'>
                      <CardBody>
                        <h3>Nenhum sistema encontrado com os filtros informados!</h3>
                      </CardBody>
                    </Card>
                  )
                }

              </CardBody>
            </Card>
          </MainContent>

          <Footer>
            <Row>
              <Col className='d-flex justify-content-center mt-3'>
                <Button
                  className='me-2 btn-lg'
                  color='success'
                  onClick={() => {
                    handleQuerySystems();
                  }}
                >
                  Pesquisar
                  <i className='ri-search-line ms-2 align-middle'></i>
                </Button>
                <Button
                  className='ms-2 mx-2 btn-lg'
                  color='success'
                  onClick={() => handleGetAllSystems()}
                >
                  Mostrar Todos
                  <i className='ri-database-2-line ms-2 align-middle'></i>
                </Button>
                <Button
                  className='ms-2 mx-2 btn-lg'
                  color='danger'
                  onClick={() => resetFields()}
                >
                  Limpar
                  <i className='ri-close-circle-line ms-2 align-middle'></i>
                </Button>
                <Button
                  className='ms-2 mx-2 btn-lg'
                  color='primary'
                  onClick={() => navigate("/system-create")
                  }
                >
                  Novo Sistema
                  <i className='ri-add-circle-line ms-2 align-middle'></i>
                </Button>
              </Col>
            </Row>
          </Footer>
        </Container>
      </div>
    </React.Fragment >
  );
}

export default SystemSearch;
