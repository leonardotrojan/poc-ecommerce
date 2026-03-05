# 🛒 Mini E-commerce POC

Proof of Concept de um **mini e-commerce full-stack** desenvolvido para demonstrar conhecimentos em backend, frontend, persistência de dados, arquitetura e gerenciamento de estado.

O projeto implementa um fluxo completo de compra:

* listagem de produtos
* carrinho persistente
* checkout fake
* criação de pedidos
* histórico de pedidos

---

# 🚀 Tecnologias utilizadas

### Backend

* **Node.js**
* **NestJS**
* **Prisma ORM**
* **PostgreSQL**
* **JWT Authentication**

### Frontend

* **React Native**
* **Expo**
* **Expo Router**
* **Context API**

---

# 🧠 Funcionalidades implementadas

### 📦 Produtos

* Listagem de produtos
* Persistidos no banco de dados

### 🛒 Carrinho

* Adicionar produto ao carrinho
* Incrementar quantidade
* Decrementar quantidade
* Remover item
* Carrinho persistente no banco

### 💳 Checkout (Fake)

* Cálculo do valor total
* Conversão do carrinho em pedido
* Limpeza do carrinho após checkout

### 📜 Histórico de pedidos

* Listagem de pedidos do usuário
* Exibição de itens comprados
* Exibição do valor total do pedido
* Status do pedido

---

# 🗄️ Modelagem do banco

Principais entidades do sistema:

User
Product
Cart
CartItem
Order
OrderItem

Relacionamentos importantes:

* **User → Cart (1:1)**
* **Cart → CartItem (1:N)**
* **Order → OrderItem (1:N)**
* **Product → CartItem / OrderItem**

O modelo também armazena o **preço no momento da compra** (`priceAtPurchase`) para garantir consistência histórica caso o preço do produto mude posteriormente.

---

# 🔒 Autenticação

O sistema utiliza **JWT** para autenticação.

Fluxo:

1. Usuário faz login
2. Backend gera token JWT
3. Frontend armazena token
4. Requisições autenticadas usam header:

```
Authorization: Bearer <token>
```

---

# 🔁 Fluxo de criação de pedido

Ao finalizar o checkout:

1. Busca do carrinho do usuário
2. Criação do pedido
3. Criação dos itens do pedido
4. Cálculo do total
5. Limpeza do carrinho

Essas operações são executadas dentro de uma **transação do Prisma** para garantir consistência de dados.

---

# 📂 Estrutura do projeto

## Backend

```
backend
 ├ prisma
 │ ├ migrations
 │ └ schema.prisma
 │
 └ src
   ├ database
   │ ├ prisma.module.ts
   │ └ prisma.service.ts
   │
   └ modules
     ├ auth
     ├ cart
     ├ orders
     ├ products
     └ users
```

Cada módulo segue a estrutura padrão do NestJS:

```
controller
service
module
```

---

## Frontend

```
frontend
 ├ app
 │ ├ _layout.tsx
 │ ├ home.tsx
 │ ├ login.tsx
 │ ├ sign-up.tsx
 │ └ order-screen.tsx
 │
 └ src
   ├ components
   ├ context
   ├ services
   └ types
```

Organização principal:

* **components** → componentes reutilizáveis
* **context** → estado global (carrinho e autenticação)
* **services** → comunicação com API
* **types** → tipagens TypeScript

---

# 🎯 Objetivo da POC

Este projeto foi desenvolvido para demonstrar conhecimento em:

* modelagem de banco de dados
* relacionamento entre entidades
* persistência de estado
* gerenciamento de estado global
* integração frontend/backend
* arquitetura modular

---

# 👨‍💻 Autor

Desenvolvido por **Leo**.
