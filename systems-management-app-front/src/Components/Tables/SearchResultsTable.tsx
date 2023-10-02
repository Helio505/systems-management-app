import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import { System } from "../../Helpers/types";

type SearchResultsTableProps = {
  searchResults: System[];
};

const SearchResultsTable = ({ searchResults }: SearchResultsTableProps) => {
  const navigate = useNavigate();
  return (
    <div className="m-3">
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
