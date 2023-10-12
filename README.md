## Descrição

É um projeto que lida com o manuseio, criação e manutenção de sistemas.

## Como executar o projeto

1. Verificar se docker e docker-compose estão instalados.
2. Remover containeres antigos: `docker-compose down`.
3. Fazer build dos containeres da aplicação: `docker-compose up --build`.
   obs. Tem que esperar a criação dos containeres terminar. Quando estiverem prontos, a aplicação estará disponível em `http://localhost:3000/`.

<!-- ### Como popular o banco de dados com dados de teste
1. Executar o comando `docker exec -it api bash` para acessar o container da api.
2. Executar o comando `npm run seed` para popular o banco de dados com dados de teste. -->

### Ao executar projeto

- Ao executar o comando `docker compose up --build` os containeres da api, banco de dados e do frontend serão criados e executados.
- A api estará disponível na porta 3333.
- O frontend estará disponível na porta 3000.
- O banco de dados estará disponível na porta 3307 fora do container.
- O container da database, está conectado a um volume, portanto, mesmo após a remoção do container, os dados persistirão.

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

- [x] Utilizar yup e formik para validar, controlar e mostrar erros de validação nos inputs.
- [ ] Implementar testes unitarios no front e no back.
- [x] Melhorar sistema de query parameters, para que os parametros de filtragem fiquem armazenados na url,
      e o usuário não tenha que refazer a filtragem ao navegar para outra pagina e voltar.
- [ ] Melhorar estilização do header.
- [ ] Implementar sistema de autenticação, para verificar qual usuário está fazendo a modificação em um sistema.
- [ ] Implementar seeders para popular o banco de dados com dados de teste.
- [ ] Implementar tema escuro e tema claro. Tirando proveito das cores predefinidas do bootstrap.
      Armazenar me sessionStorage. Default é light.
- [ ] Fazer melhor uso das funcionalidades do Typescript no front.
  - [ ] Criar interfaces melhores para o model.
  - [ ] Criar interfaces melhores para os componentes.
  - [ ] Criar interfaces melhores para os hooks.
  - [ ] Refatorar para utilizar a menor quantidade de `any` possivel.
