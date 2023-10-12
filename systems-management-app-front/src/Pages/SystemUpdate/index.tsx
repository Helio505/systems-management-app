import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { mixed, object, string } from "yup";

import Footer from "../../Components/Layouts/Footer";
import Header from "../../Components/Layouts/Header";
import MainContent from "../../Components/Layouts/MainContent";
import CharsCounter from "../../Components/CharsCounter";
import { Status, System } from "../../Helpers/types";
import { updateSystem } from "../../Components/SystemCrud";
import convertDate from "../../Helpers/convertDate";
import useAlert from "../../Components/Hooks/Alert";

function SystemUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { alertObj, activateAlert } = useAlert();

  const [previousSystem, setPreviousSystem] = React.useState<System | null>(
    null
  );

  // Checking the route state:
  useEffect(() => {
    // If route state is empty, redirect to home
    if (!location.state) {
      navigate("/");
    }
    // If route state is not empty, get the prev system data
    else {
      setPreviousSystem(location.state.system);
    }
  }, [location, location.state, navigate]);

  // Function to make the final processing of the data, and send it to the API:
  const handleUpdateSystem = async (newSystemValues: System) => {
    // Removing empty fields:
    for (const key in newSystemValues) {
      if (newSystemValues[key as keyof typeof newSystemValues] === "") {
        delete newSystemValues[key as keyof typeof newSystemValues];
      }
    }

    // const confirm = window.confirm("Deseja realmente atualizar o sistema?");
    // TODO: if no changes were made, block the update

    // Checking if id of the system to be updated exists:
    if (!previousSystem) {
      activateAlert("danger", "Sistema não encontrado");
      return;
    }
    if (!previousSystem.id) {
      activateAlert("danger", "Sistema não encontrado");
      return;
    }

    try {
      const response = await updateSystem(
        location.state.system.id,
        newSystemValues
      );
      if (response && response.ok) {
        activateAlert("success", "Operação realizada com sucesso!");
        // after 1s redirect to home
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      activateAlert("danger", "Erro ao atualizar o sistema!");
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      // Storage for form values
      initialValues: {
        description: previousSystem?.description || "",
        acronym: previousSystem?.acronym || "",
        email: previousSystem?.email || "",
        url: previousSystem?.url || "",
        status: previousSystem?.status || "",
        user: previousSystem?.user || "",
        updatedAt: convertDate(previousSystem?.updatedAt) || "",
        justificationLastUpdate: previousSystem?.justification || "",
        justification: "", // new justification
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
        status: mixed<Status>().oneOf(Object.values(Status)),
        justification: string()
          .required("Justificativa é obrigatória")
          .max(500, "Justificativa deve ter no máximo 500 caracteres"),
      }),
      // Submit function
      onSubmit: (values) => {
        handleUpdateSystem(values);
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
          <Header>Manter Sistema</Header>

          <MainContent>
            <ReactStrapForm onSubmit={handleSubmit}>
              <Card>
                <CardHeader style={{ backgroundColor: "white" }}>
                  <h3 style={{ color: "green", fontWeight: "bold", margin: 0 }}>
                    Dados do Sistema
                  </h3>
                </CardHeader>
                <CardBody className="me-1 ms-1">
                  <Alert isOpen={alertObj.isVisible} color={alertObj.type}>
                    {alertObj.message}
                  </Alert>

                  <FormGroup row className="ms-1 mb-3">
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
                      Sigla <span className="text-danger">*</span>
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
                  <FormGroup row className="ms-1 mb-3">
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
                </CardBody>
              </Card>

              <Card>
                <CardHeader style={{ backgroundColor: "white" }}>
                  <h3 style={{ color: "green", fontWeight: "bold", margin: 0 }}>
                    Controle do Sistema
                  </h3>
                </CardHeader>
                <CardBody className="ms-1 me-1">
                  <ReactStrapForm>
                    <FormGroup row className="ms-1 mb-3">
                      <Label
                        for="status"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Status <span className="text-danger">*</span>
                      </Label>
                      <Col sm={6} className="mt-2">
                        <Input
                          type="select"
                          id="status"
                          name="status"
                          bsSize="lg"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          invalid={
                            touched.status && errors.status ? true : false
                          }
                        >
                          <option value="ATIVO">ATIVO</option>
                          <option value="CANCELADO">CANCELADO</option>
                        </Input>
                        <FormFeedback valid={touched.status && !errors.status}>
                          {errors.status}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="ms-1 mb-3">
                      <Label
                        for="user-responsible"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Usuário responsável pela última alteração
                      </Label>
                      <Col sm={6} className="mt-2">
                        <Input
                          type="text"
                          id="user-responsible"
                          name="user-responsible"
                          bsSize="lg"
                          disabled
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.user}
                          invalid={touched.user && errors.user ? true : false}
                        />
                        <FormFeedback valid={touched.user && !errors.user}>
                          {errors.user}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="ms-1 mb-3">
                      <Label
                        for="updatedAt"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Data da ultima alteração
                      </Label>

                      <Col sm={6} className="mt-2">
                        <Input
                          type="text"
                          id="updatedAt"
                          name="updatedAt"
                          bsSize="lg"
                          disabled
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.updatedAt || ""}
                          invalid={
                            touched.updatedAt && errors.updatedAt ? true : false
                          }
                        />
                        <FormFeedback
                          valid={touched.updatedAt && !errors.updatedAt}
                        >
                          {errors.updatedAt}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="ms-1 mb-3">
                      <Label
                        for="justificationLastUpdate"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Justificativa da última alteração
                      </Label>

                      <Col sm={6} className="mt-2">
                        <Input
                          type="textarea"
                          id="justificationLastUpdate"
                          name="justificationLastUpdate"
                          bsSize="lg"
                          disabled
                          style={{
                            overflowY: "scroll",
                          }}
                          maxLength={500}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.justificationLastUpdate}
                          invalid={
                            touched.justificationLastUpdate &&
                            errors.justificationLastUpdate
                              ? true
                              : false
                          }
                        />
                        <FormFeedback
                          valid={
                            touched.justificationLastUpdate &&
                            !errors.justificationLastUpdate
                          }
                        >
                          {errors.justificationLastUpdate}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row className="ms-1 mb-3">
                      <Label
                        for="justification"
                        size="lg"
                        sm={6}
                        className="fs-4 fw-bold border-bottom"
                      >
                        Nova justificativa de alteração{" "}
                        <span className="text-danger">*</span>
                        <CharsCounter text={values.justification} limit={500} />
                      </Label>

                      <Col sm={6} className="mt-2">
                        <Input
                          type="textarea"
                          id="justification"
                          name="justification"
                          bsSize="lg"
                          style={{
                            overflowY: "scroll",
                          }}
                          maxLength={500}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.justification}
                          invalid={
                            touched.justification && errors.justification
                              ? true
                              : false
                          }
                        />
                        <FormFeedback
                          valid={touched.justification && !errors.justification}
                        >
                          {errors.justification}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                  </ReactStrapForm>
                </CardBody>
              </Card>
            </ReactStrapForm>
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

export default SystemUpdate;
