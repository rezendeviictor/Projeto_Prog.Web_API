import swaggerAutogen from "swagger-autogen";

const config = {
  info: {
    version: 'v1.0.0',
    title: 'Documentação da API Agendamento Petshop',
    description: 'Esta API gerencia agendamentos de um Petshop, permitindo cadastrar, consultar, atualizar e excluir informações sobre pets, serviços e agendamentos.' 
  },
  host: 'localhost:5000', // 
  basePath: '/api', // 
  schemes: ['http', 'https'],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "User", description: "User endpoints" },
    { name: "Pets", description: "Recurso: Pets" },
    { name: "Servicos", description: "Recurso: Servicos" }, 
    { name: "Agendamentos", description: "Recurso: Agendamentos" } 
  ],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "JWT (JSON Web Token)[cite: 21]. Formato: Bearer <token> [cite: 23]",
    }
  },
  definitions: {
    // PET
    PetSchema: {
      $nome: "Rex",
      $tutor: "João Silva",
      $CPF_tutor: "123.456.789-00",
      $tipo: "Cachorro",
      raca: "Labrador",
      dt_nascimento: "2021-06-15",
      rua: "Rua A",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      CEP: "01000-000"
    },
    PetResponseSchema: {
      $id_pet: 1,
      $nome: "Rex",
      $tutor: "João Silva",
      $CPF_tutor: "123.456.789-00",
      $tipo: "Cachorro",
      raca: "Labrador",
      dt_nascimento: "2021-06-15",
      rua: "Rua A",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      CEP: "01000-000",
      $criadoEm: "2025-09-01T10:00:00Z",
      $atualizadoEm: "2025-09-01T10:00:00Z"
    },
    // SERVIÇO
    ServicoSchema: {
      $nome: "Banho",
      descricao: "Banho completo com shampoo especial",
      $preco: 80.0
    },
    ServicoResponseSchema: {
      $id_servico: 1,
      $nome: "Banho",
      descricao: "Banho completo com shampoo especial",
      $preco: 80.0,
      $criadoEm: "2025-09-01T10:00:00Z",
      $atualizadoEm: "2025-09-01T10:00:00Z"
    },
    // AGENDAMENTO
    AgendamentoSchema: {
      $id_pet: 1,
      $id_servico: 1,
      $data_hora: "2025-10-05T14:00:00Z",
      status: "Agendado"
    },
    AgendamentoUpdateSchema: { // Para o PUT 
      data_hora: "2025-10-06T10:00:00Z",
      status: "Confirmado"
    },
    AgendamentoResponseSchema: {
      $id_agendamento: 1,
      $id_pet: 1,
      $id_servico: 1,
      $data_hora: "2025-10-05T14:00:00Z",
      $status: "Agendado",
      $criadoEm: "2025-10-01T10:00:00Z",
      $atualizadoEm: "2025-10-01T10:00:00Z"
    },
    // USER e AUTH 
    UserSchema: {
      $username: "usuario.teste",
      $password: "senha123"
    },
    UserResponseSchema: {
      $id: 1,
      $username: "usuario.teste",
      $password: "$2b$10$qEjJiPFyRVEQ7W26W/l/GOEfwTHayN7gv/t8UYcW7ElsfavGswuDq"
    },
    LoginSchema: {
      $username: "usuario.teste",
      $password: "senha123"
    },
    LoginResponseSuccessSchema: {
      $message: "Login realizado com sucesso!",
      $token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVkdWFyZG8uYXJhdWpvIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE2MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    },
    LoginResponseUnauthorizedSchema: {
      $error: "Usuário e/ou senha inválidos ou não informados."
    }
  }
};

const output = './src/docs/swagger.json';
const endpoints = ['./src/routes/index.ts'];

swaggerAutogen()(output, endpoints, config);