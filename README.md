# Blog simples para estudos em AdonisJS

## 1. O que foi estudado

### 1.1. Testes Automatizados

Os testes automatizados tem a função de facilitar o desenvolvimento de projetos em equipe garantindo que todas funcionalidades sejam tesetadas e retornando se estão funcionando de forma correta.

[Documentação](https://adonisjs.com/docs/4.1/testing)

### 1.2. Jobs

Os jobs tem a funcionalidade de rodar em segundo plano algumas funcionalidades que demoram algum tempo para serem processadas, como por exemplo emails.
Foi estudado a utilização de jobs utilizado a biblioteca

> adonis-kue

[Documentação](https://github.com/nrempel/adonis-kue)

### 1.3. Envio de Email

Foi estudado envio de e-mails no adonis JS utilizando a funcionalidade:

> Mail

[Documentação](https://adonisjs.com/docs/4.1/mail)

da própria documentação do adonisjs

### 1.4. Error Handler

O Error Handler tem a funcionalidade de lidar com erros e exceções, tendo a possibilidade de adicionar mecânicas externas como o Sentry que envia email ao ocorrer algum erro.
Foi estudado uma forma de lidar com erros e excessões utilizando o comando do adonis

> adonis make:ehandler

[Documentação](https://adonisjs.com/docs/4.1/exceptions)

### 1.5. Upload de Files

Foi estudado o upload de files dentro do adonis js criando uma rota /files para uploads.

[Documentação](https://adonisjs.com/docs/4.1/file-uploads)

### 1.6. Internationalization

O Internationalization foi usado junto com os validators substituindo algumas mensagens padrões e adicionando a linguagem pt e en.

[Documentação](https://adonisjs.com/docs/4.1/internationalization)

### 1.7. Validation

Os validations foram usados em algumas rotas para validar os dados que o usuário manda para o banco de dados.

[Documentação](https://adonisjs.com/docs/4.1/validator)

### 1.8. Factory and Seeds

O Factory foi usado em dois cenários, o primeiro foi nos testes automatizados para criar dados fictícios para ser testado, o segundo foi nas partes de seeds para popular o banco de dados com dados fictícios.

[Documentação](https://adonisjs.com/docs/4.1/seeds-and-factories)

### 1.9. Hooks

O Hooks do adonis foi utilizado após um post ser criado, quando o post é criado o hook é ativado vendo se o autor tem seguidores e se tiver envia e-mails os informando sobre o novo post

[Documentaçao](https://adonisjs.com/docs/4.1/database-hooks)

## 2. Features para implementar

- [x] CRUD de usuário
- [x] Forgot Password
- [x] CRUD de post
- [x] Upload de Files
- [x] Follow em um author (CRUD de follower)
- [x] Middleware para disparar emails quando um author seguido publicar um artigo
- [ ] Roles and Permissions
- [ ] Slugify do post title para criar url do post e enviar no email

## 3. Problemas para resolver

- [ ] Teste automatizado do hook de envio de email quando houver criação de post de um following author
