import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Form as ReactStrapForm,
} from "reactstrap";

import "../../index.css";
import { querySystems, getAllSystems } from "../../Components/SystemCrud";
import Header from "../../Components/Layouts/Header";
import Footer from "../../Components/Layouts/Footer";
import MainContent from "../../Components/Layouts/MainContent";
import SearchResultsTable from "../../Components/Tables/SearchResultsTable";
import useAlert from "../../Components/Hooks/Alert";
import { System } from "../../Helpers/types";
import isEmailValid from "../../Helpers/validateEmail";
import { useFormik } from "formik";
import { object, string } from "yup";

function SystemSearch() {
  const navigate = useNavigate();
  const { alertObj, activateAlert } = useAlert();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const handleQuerySystems = async (queryValues: any) => {
    // If all values are "", then blocks search. Also, if a key is "", remove it from object.
    let areAllValuesEmpty = true;
    for (const key in queryValues) {
      if (queryValues[key] !== "") {
        areAllValuesEmpty = false;
      } else {
        // Delete the key from the object if the value is ""
        delete queryValues[key];
      }
    }
    if (areAllValuesEmpty) {
      activateAlert(
        "warning",
        "Preencha pelo menos um dos campos para realizar a pesquisa!"
      );
      return;
    }

    // Create a new URLSearchParams object
    const queryParams = new URLSearchParams(queryValues);

    // Use the new values to update the search parameters in the url
    setSearchParams(queryParams);

    // Attempt to query the systems
    try {
      const strQueryParams = queryParams.toString();
      const response = await querySystems(`?${strQueryParams}`);
      if (response && response.ok) {
        const data = await response.json();
        setSearchResults(data);
        // If data exists, but is an empty array:
        if (data && data.length === 0) {
          activateAlert(
            "info",
            "Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!"
          );
        }
      }
    } catch (error) {
      console.error(error);
      activateAlert("danger", "Erro ao consultar sistemas!");
    }
  };

  const handleResetForms = () => {
    // Reset url searchParams:
    setSearchParams("");
    // Reset formik form:
    resetForm();
    // Reset searchResults:
    setSearchResults(null);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      description: searchParams.get("description") || "",
      acronym: searchParams.get("acronym") || "",
      email: searchParams.get("email") || "",
    },
    // Validation schema
    validationSchema: object({
      description: string()
        .optional()
        .max(100, "Descrição deve ter no máximo 100 caracteres"),
      acronym: string()
        .optional()
        .max(10, "Sigla deve ter no máximo 10 caracteres"),
      email: string()
        .optional()
        .max(100, "Email deve ter no máximo 100 caracteres"),
    }),
    // Submit function
    onSubmit: (values) => {
      handleQuerySystems(values);
    },
    // Formik options
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: false,
    enableReinitialize: true,
  });

  return (
    <React.Fragment>
      <div className="page-content h-100 w-100">
        <Container fluid>
          <Header>Pesquisar Sistemas</Header>

          <MainContent>
            <Card>
              <CardHeader style={{ backgroundColor: "white" }}>
                <h3 style={{ color: "green", fontWeight: "bold", margin: 0 }}>
                  Filtro de Consulta
                </h3>
              </CardHeader>
              <CardBody>
                <Alert isOpen={alertObj.isVisible} color={alertObj.type}>
                  {alertObj.message}
                </Alert>

                <ReactStrapForm
                  onSubmit={handleSubmit}
                  className="pb-1 me-1 ms-1"
                >
                  <FormGroup row className="ms-1 mb-3">
                    <Label
                      for="description"
                      size="lg"
                      sm={6}
                      className="fs-4 fw-bold border-bottom"
                    >
                      Descrição
                    </Label>
                    <Col sm={6} className="mt-2">
                      <Input
                        type="text"
                        id="description"
                        name="description"
                        bsSize="lg"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        invalid={
                          touched.description && errors.description
                            ? true
                            : false
                        }
                      />
                      <FormFeedback
                        valid={touched.description && !errors.description}
                      >
                        {errors.description}
                      </FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="ms-1 mb-3">
                    <Label
                      for="acronym"
                      size="lg"
                      sm={6}
                      className="fs-4 fw-bold border-bottom"
                    >
                      Sigla
                    </Label>
                    <Col sm={6} className="mt-2">
                      <Input
                        type="text"
                        id="acronym"
                        name="acronym"
                        bsSize="lg"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.acronym}
                        invalid={
                          touched.acronym && errors.acronym ? true : false
                        }
                      />
                      <FormFeedback valid={touched.acronym && !errors.acronym}>
                        {errors.acronym}
                      </FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="ms-1 mb-3">
                    <Label
                      for="email"
                      size="lg"
                      sm={6}
                      className="fs-4 fw-bold border-bottom"
                    >
                      E-mail de atendimento do sistema
                    </Label>
                    <Col sm={6} className="mt-2">
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        bsSize="lg"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        invalid={touched.email && errors.email ? true : false}
                      />
                      <FormFeedback valid={touched.email && !errors.email}>
                        {errors.email}
                      </FormFeedback>
                    </Col>
                  </FormGroup>
                </ReactStrapForm>

                {
                  // TODO separate into its own component
                  searchResults && searchResults.length > 0 ? (
                    <SearchResultsTable searchResults={searchResults} />
                  ) : (
                    <Card className="mb-3 bg-light border-0 m-3">
                      <CardBody>
                        <h3>
                          Nenhum sistema encontrado com os filtros informados!
                        </h3>
                      </CardBody>
                    </Card>
                  )
                }
              </CardBody>
            </Card>
          </MainContent>

          <Footer>
            <Button
              className="me-2 btn-lg"
              color="success"
              onClick={() => handleSubmit()}
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
              onClick={() => handleResetForms()}
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
