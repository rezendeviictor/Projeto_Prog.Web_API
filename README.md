# 🐾 API Agendamento Petshop  
API RESTful para gerenciamento de pets, serviços e agendamentos, utilizando **Node.js, TypeScript, TypeORM, JWT e Jest**.

---

## 📌 Funcionalidades
- CRUD de Pets  
- CRUD de Serviços  
- CRUD de Agendamentos  
- Autenticação JWT  
- Documentação via Swagger  
- Migrations automáticas com TypeORM  
- Testes unitários com Jest  
- Padrão de projeto organizado e escalável  

---

## 🏗️ Tecnologias utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **TypeORM**
- **SQLite ou PostgreSQL**
- **Swagger (swagger-ui-express + swagger-jsdoc)**
- **JWT (jsonwebtoken)**
- **Jest**
- **Supertest** (se desejar testes de integração)

---

## 🚀 Como executar

### 1. Instalar dependências
```sh
npm install
```

### 2. Subir o container para receber o Banco de Dados
```sh
docker-compose up -d db=
```

### 3. Executar a API
```sh
npm run dev
```

### 4. Para rodar os testes, caso a API esteja rodando, primeiro: `Ctrl + C`
após encerrar a execuçao:
```sh
npm test
```
OBS: Caso a API já estiver encerrada, execute apenas o `npm test`

### 5. Para acessar o Swagger: `http://localhost:5000/docs`
