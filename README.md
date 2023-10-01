### Como executar projeto

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
