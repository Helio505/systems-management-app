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
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Form as ReactStrapForm,
} from "reactstrap";
import { useFormik } from "formik";
import { object, string } from "yup";

import Footer from "../../Components/Layouts/Footer";
import Header from "../../Components/Layouts/Header";
import MainContent from "../../Components/Layouts/MainContent";
import { System } from "../../Helpers/types";
import { createSystem } from "../../Components/SystemCrud";
import useAlert from "../../Components/Hooks/Alert";

function SystemCreate() {
  const navigate = useNavigate();
  const { alertObj, activateAlert } = useAlert();

  const handleCreateSystem = async (system: any) => {
    // Remove empty fields:
    for (const key in system) {
      if (system[key] === "") {
        delete system[key];
      }
    }

    // Creating system:
    try {
      const response = await createSystem(system);
      if (response && response.ok) {
        activateAlert("success", "Operação realizada com sucesso!");
        // after 2s, redirect to home
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      activateAlert("danger", "Erro ao criar o sistema!");
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      // Storage for form values
      initialValues: {
        description: "",
        acronym: "",
        email: "",
        url: "",
      },
      // Validation schema
      validationSchema: object({
        description: string()
          .required("Descrição é obrigatória")
          .max(100, "Descrição deve ter no máximo 100 caracteres"),
        acronym: string()
          .required("Sigla é obrigatória")
          .max(10, "Sigla deve ter no máximo 10 caracteres"),
        email: string()
          .optional()
          .email("Email inválido")
          .max(100, "Email deve ter no máximo 100 caracteres"),
        url: string()
          .optional()
          .max(50, "URL deve ter no máximo 50 caracteres"),
      }),
      // Submit function
      onSubmit: (values) => {
        handleCreateSystem(values);
      },
      // Formik options
      validateOnBlur: false,
      validateOnChange: true,
      validateOnMount: false,
    });

  return (
    <React.Fragment>
      <div className="page-content h-100 w-100">
        <Container fluid>
          <Header>Incluir Sistema</Header>

          <MainContent>
            <Card>
              <CardHeader style={{ backgroundColor: "white" }}>
                <h3 style={{ color: "green", fontWeight: "bold", margin: 0 }}>
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
                  <ReactStrapForm className="pb-1 me-3 ms-1">
                    <FormGroup row className="ms-3 mb-3">
                      <Label
                        for="description"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Descrição <span className="text-danger">*</span>
                      </Label>
                      <Col sm={6} className="mt-2">
                        <Input
                          type="text"
                          id="description"
                          name="description"
                          // className="mt-2" //TODO mudar a mt
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
                    <FormGroup row className="ms-3 mb-3">
                      <Label
                        for="acronym"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Sigla <span className="text-danger">*</span>
                      </Label>
                      <Col sm={6} className="mt-2">
                        <Input
                          type="text"
                          id="acronym"
                          name="acronym"
                          // className="mt-2"
                          bsSize="lg"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.acronym}
                          invalid={
                            touched.acronym && errors.acronym ? true : false
                          }
                        />
                        <FormFeedback
                          valid={touched.acronym && !errors.acronym}
                        >
                          {errors.acronym}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="ms-3 mb-3">
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
                          // className="mt-2"
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
                    <FormGroup row className="ms-3 mb-3">
                      <Label
                        for="url"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        URL
                      </Label>
                      <Col sm={6} className="mt-2">
                        <Input
                          type="text"
                          id="url"
                          name="url"
                          // className="mt-2"
                          bsSize="lg"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.url}
                          invalid={touched.url && errors.url ? true : false}
                        />
                        <FormFeedback valid={touched.url && !errors.url}>
                          {errors.url}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                  </ReactStrapForm>
                </Col>
              </CardBody>
            </Card>
          </MainContent>

          <Footer>
            <Button
              className="me-4 btn-lg"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Voltar
              <i className="ri-arrow-left-line ms-2"></i>
            </Button>
            <Button
              className="btn-lg"
              color="success"
              onClick={() => handleSubmit()}
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
