# Todo Backend

API restfull para gerenciamento e métricas de todos

## Requisitos

- Docker;
- Node.js;

## Setup

- Clone o repositório;
- Instale as dependências (`npm install`);
- Configure o MongoDB (`docker compose up -d`);
- Copie o arquivo `.env.example` (`cp .env.example .env`);
- Execute a aplicação (`npm run dev`);

## HTTP

### POST `/user`

Cria um novo usuário

#### Request body

```json
{
  "name": "teste4",
  "email": "teste@mail.com",
  "password": "senha123"
}
```

#### Response body

```json
{
  "userId": "662526da7e7597ad84c8e94d"
}
```

### GET `/user/:userId`

Retorna os dados de um único usuário

#### Response body

```json
{
  "id": "662524d415103e1541566e52",
  "name": "teste3",
  "email": "teste@mail.com",
  "created_at": "2024-04-21T14:38:12.084Z",
  "updated_at": "2024-04-21T14:38:12.084Z"
}
```

### GET `/users`

Retorna todos os usuários

#### Response body

```json
[
  {
    "id": "662526da7e7597ad84c8e94d",
    "name": "teste4"
  },
  {
    "id": "662529bb27b53d04f8cda71d",
    "name": "Arnold"
  },
  {
    "id": "662529cb27b53d04f8cda71e",
    "name": "Gerson"
  }
]
```

### DELETE `/user/:userId`

Deleta um usuário

### PUT `/user/:userId`

Atualiza dados de um usuário

#### Request body

```json
{
  "name": "Fulano",
  "email": "fulano@mail.com",
  "password": "senha123"
}
```

### POST `/user/auth`

Realizar login

#### Request body

```json
{
  "email": "gerson@mail.com",
  "password": "senha123"
}
```

#### Response body

```json
{
  "id": "662529cb27b53d04f8cda71e",
  "email": "gerson@mail.com",
  "name": "Gerson"
}
```

### DELETE `/todo/:todoId`

Delete um todo

### PUT `/todo/:todoId`

Atualiza dados de um todo

### Request body

```json
{
  "title": "Estudar Next.js",
  "completed": true
}
```

### Response body

```json
{
  "id": "66252c8a27b53d04f8cda721",
  "userId": "662529cb27b53d04f8cda71e",
  "title": "Estudar Next.js",
  "completed": true,
  "created_at": "2024-04-21T15:11:06.684Z",
  "updated_at": "2024-04-21T15:11:06.684Z"
}
```

### GET `/todos?completed={true | false}&user={userId}&date={'asc'| 'desc'}`

Retorna todos os todos e aplica os filtros, caso seja necessário

### Response body

```json
[
  {
    "id": "66252abd27b53d04f8cda71f",
    "userId": "662529cb27b53d04f8cda71e",
    "title": "Ir ao mercado",
    "completed": false,
    "created_at": "2024-04-21T15:03:25.018Z",
    "updated_at": "2024-04-21T15:03:25.018Z",
    "user": {
      "id": "662529cb27b53d04f8cda71e",
      "name": "Gerson"
    }
  },
  {
    "id": "66252c8a27b53d04f8cda721",
    "userId": "662529cb27b53d04f8cda71e",
    "title": "Estudar Next.js",
    "completed": true,
    "created_at": "2024-04-21T15:11:06.684Z",
    "updated_at": "2024-04-21T15:11:06.684Z",
    "user": {
      "id": "662529cb27b53d04f8cda71e",
      "name": "Gerson"
    }
  }
]
```

### GET `/todo/stats?userId`

Retorna a quantidade de todos finalizados e pendentes

### Response body

```json
[
  {
    "id": "Pendentes",
    "completed": false,
    "count": 1
  },
  {
    "id": "Finalizados",
    "completed": true,
    "count": 1
  }
]
```
