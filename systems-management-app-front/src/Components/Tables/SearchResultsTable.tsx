import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { Grid, _ } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";
import { System } from "../../Helpers/types";

type SearchResultsTableProps = {
  searchResults: System[] | [] | null;
};

const SearchResultsTable = ({ searchResults }: SearchResultsTableProps) => {
  const navigate = useNavigate();

  // If there are no search results, return nothing:
  if (!searchResults) {
    return null;
  }

  // If there are search results, but there are no systems in array, return message:
  if (searchResults.length === 0) {
    return (
      <Card className="mt-2 mb-3 ms-1 me-1 bg-light border-0">
        <CardBody>
          <h3>Nenhum sistema encontrado com os filtros informados!</h3>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="mt-2 mb-3 ms-1 me-1">
      <Grid
        columns={[
          {
            name: "Descrição",
            sort: true,
          },
          {
            name: "Sigla",
            sort: true,
          },
          {
            name: "E-mail de atendimento do sistema",
            sort: true,
          },
          {
            name: "URL",
            sort: true,
          },
          {
            name: "Status",
            sort: true,
          },
          {
            name: "Ações",
            sort: false,
            width: "120px",
          },
        ]}
        data={() => {
          return new Promise((resolve) => {
            resolve(
              searchResults.map((system) => [
                system.description,
                system.acronym,
                system.email,
                system.url,
                system.status,
                _(
                  <Button
                    className="btn-sm"
                    color="warning"
                    onClick={() => {
                      navigate(`/system-update`, {
                        state: {
                          system: system,
                        },
                      });
                    }}
                  >
                    Editar
                    <i className="ri-pencil-line ml-1"></i>
                  </Button>
                ),
              ])
            );
          });
        }}
        autoWidth={false}
        language={{
          search: {
            placeholder: "Pesquisar...",
          },
          pagination: {
            previous: "<",
            next: ">",
            showing: "Mostrando",
            results: "resultados",
            of: "de",
            to: "para",
          },
        }}
        className={{
          table: "table table-bordered",
          // table: "table table-bordered border-light-subtle",
          // // th: "text-center bg-warning text-white border-light-subtle",
          // // td: "text-center bg-light border-light-subtle",
          // thead: "thead-light-subtle border-1 border-light-subtle",
          // tbody: "bg-light border-1 border-light-subtle",
          // tr: "bg-light border-1 border-light-subtle",
        }}
        style={{
          th: {
            backgroundColor: "#d5dfca",
            color: "black",
          },
        }}
        pagination={
          searchResults.length > 5
            ? {
                enabled: true,
                limit: 5,
                summary: true,
                buttonsCount: 10,
              }
            : false
        }
        // search={true}
        // fixedHeader={true}
        // height={"700px"}
        // width={"100%"}
        // sort={true}
      />
    </div>
  );
};

export default React.memo(SearchResultsTable);
