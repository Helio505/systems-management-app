// enum Status {
//   ATIVO = "ATIVO",
//   CANCELADO = "CANCELADO",
// }

export type System = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;

  description: string;
  acronym: string;
  email?: string;
  url?: string;
  status?: "ATIVO" | "CANCELADO" | "";
  user?: string;
  justification?: string;
};
