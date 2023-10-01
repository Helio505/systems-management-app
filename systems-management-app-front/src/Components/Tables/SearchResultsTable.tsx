import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";

import { System } from "../../Helpers/types";

type SearchResultsTableProps = {
  searchResults: System[];
};

const SearchResultsTable = ({ searchResults }: SearchResultsTableProps) => {
  const navigate = useNavigate();
  return (
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
                className="btn-sm"
                color="success"
                onClick={() => {
                  navigate(`/system-update`, {
                    state: {
                      system: system,
                    },
                  });
                }}
              >
                Editar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SearchResultsTable;