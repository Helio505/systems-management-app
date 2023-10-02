## Descrição

É um projeto que lida com o manuseio, criação e manutenção de sistemas.

## Como executar o projeto

1. Verificar se docker e docker-compose estão instalados.
2. Executar os containers docker, com o comando `docker compose up -d --build`.
   obs. Tem que esperar a criação dos containeres terminar. Quando estiverem prontos, a aplicação estará disponível em `http://localhost:3000/`.

<!-- ### Como popular o banco de dados com dados de teste
1. Executar o comando `docker exec -it api bash` para acessar o container da api.
2. Executar o comando `npm run seed` para popular o banco de dados com dados de teste. -->

### Ao executar projeto

- Ao executar o comando `docker compose up -d --build` os containeres da api, banco de dados e do frontend serão criados e executados.
- A api estará disponível na porta 3333.
- O frontend estará disponível na porta 3000.
- O banco de dados estará disponível na porta 3307 fora do container.
- `prisma migrate dev` é executado ao criar o BD, logo, ele inicia vazio.

### Tecnologias utilizadas

#### Frontend

- React
- Typescript
- Docker

#### Backend

- Node.js
- Nest.js
- Prisma (ORM), utilizando MySQL
- Typescript
- Docker

### Melhorias que podem ser implementadas no futuro

- Utilizar yup para validar forms, e mostrar erros de validação nos inputs.
- Implementar testes unitarios no front e no back.
- Melhorar sistema de query parameters, para que os parametros de filtragem fiquem armazenados na url,
  e o usuário não tenha que refazer a filtragem ao atualizar a página.
- Melhorar estilização do header.
- Implementar sistema de autenticação, para verificar qual usuário está fazendo a modificação em um sistema.
- Implementar seeders para popular o banco de dados com dados de teste.
