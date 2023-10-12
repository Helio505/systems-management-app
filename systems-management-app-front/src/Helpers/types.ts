export enum Status {
  ATIVO = "ATIVO",
  CANCELADO = "CANCELADO",
}

export type System = {
  readonly id?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;

  description: string;
  acronym: string;
  email?: string;
  url?: string;
  status?: Status | string;
  user?: string;
  justification?: string;
};
