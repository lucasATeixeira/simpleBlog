# Blog simples para estudos em AdonisJS

## 1. O que foi estudado

### 1.1. Testes Automatizados

Foi estudado testes automatizados TDD no adonis JS para cada controller e método dentro desse controller utilizando o passo a passo da documentação do próprio adonis

[Documentação](https://adonisjs.com/docs/4.1/testing)

### 1.2. Jobs

Foi estudado a utilização de jobs principalmente em envio de emails para melhor performance, foi utilizado a biblioteca

> adonis-kue

[Documentação](https://github.com/nrempel/adonis-kue)

### 1.3. Envio de Email

Foi estudado envio de e-mails no adonis JS utilizando a funcionalidade:

> Mail

[Documentação](https://adonisjs.com/docs/4.1/mail)

da própria documentação do adonisjs

### 1.4. Error Handler

Foi estudado uma forma de lidar com erros e excessões utilizando o comando do adonis

> adonis make:ehandler

[Documentação](https://adonisjs.com/docs/4.1/exceptions)

### 1.5. Upload de Files

Foi estudado o upload de files dentro do adonis js

[Documentação](https://adonisjs.com/docs/4.1/file-uploads)

### 1.6. Internationalization

Foi estudado no adonis formas de mudar a linguagem de algumas respostas e returns

[Documentação](https://adonisjs.com/docs/4.1/internationalization)

### 1.7. Validation

Foi estudado a validação de dados no adonis JS

[Documentação](https://adonisjs.com/docs/4.1/validator)

### 1.8 Factory and Seeds

Com Factory and Seeds é possível criar dados fictícios e aleatórios no banco de dados ou pra ser utilizado em testes

[Documentação](https://adonisjs.com/docs/4.1/seeds-and-factories)

## 2. Features para implementar

- [x] CRUD de usuário
- [x] Forgot Password
- [x] CRUD de post
- [x] Upload de Files
- [x] Follow em um author
- [ ] Middleware para disparar emails quando um author seguido publicar um artigo
- [ ] Roles and Permissions
