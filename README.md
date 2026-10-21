# Auth Clean Architecture Sample

A **fully‑featured end‑to‑end** TypeScript project demonstrating **user authentication and authorization** with:
- **Express** as the HTTP server
- **Sequelize** for PostgreSQL ORM
- **Inversify** for dependency injection
- **Clean Architecture** (Entities → Use‑Cases → Interface Adapters → Frameworks & Drivers)

## ✨ Features
- Register a new user (password hashing with bcrypt)
- Login to obtain a JWT (signing with jsonwebtoken)
- Role‑based payload (`role` claim) ready for authorisation checks
- Structured layers for testability and maintainability
- Full TypeScript typings, decorators, and strict linting

## 📂 Project Structure
```
auth-clean-arch/
├─ src/
│  ├─ app.ts                # Express app wiring
│  ├─ index.ts              # Server entry point
│  ├─ entities/             # Domain entities
│  │   └─ User.ts
│  ├─ domain/
│  │   ├─ repositories/      # Port interfaces
│  │   │   └─ IUserRepository.ts
│  │   └─ usecases/          # Business rules
│  │       ├─ RegisterUserUseCase.ts
│  │       └─ AuthenticateUserUseCase.ts
│  ├─ infrastructure/
│  │   ├─ container.ts      # Inversify DI bindings
│  │   ├─ database.ts       # Sequelize connection
│  │   └─ types.ts          # Symbol identifiers
│  ├─ controllers/          # Interface adapters (Express)
│  │   └─ AuthController.ts
│  └─ ... (config files)
├─ .env                      # Environment variables (DB, JWT secret)
├─ package.json              # Scripts & dependencies
├─ tsconfig.json             # TypeScript compiler options
└─ README.md                 # You are reading it!
```

---

## 🛠️ Setup & Run
1. **Clone / Open the folder** – the project lives at
   `C:/Users/Krish/.gemini/antigravity-ide/scratch/auth-clean-arch`
2. **Install dependencies**
   ```bash
   cd C:/Users/Krish/.gemini/antigravity-ide/scratch/auth-clean-arch
   npm install
   ```
3. **Create a PostgreSQL database** (e.g., `authdb`) and update `.env` if needed.
4. **Run migrations / sync** – Sequelize will auto‑sync on start.
5. **Start the dev server**
   ```bash
   npm run dev
   ```
   The API will be reachable at `http://localhost:3000`.

## 📡 API Endpoints
| Method | Path               | Description                       |
|--------|--------------------|-----------------------------------|
| POST   | `/api/register`    | Register a new user (email, password, optional role) |
| POST   | `/api/login`       | Authenticate and receive JWT token |
| GET    | `/health`          | Simple health check                |

## 🔐 Authorization (next step)
The JWT contains a `role` claim. Add an Express middleware that verifies the token and checks `req.user.role` for protected routes.

---

## 🎨 Architecture Diagram
![Clean Architecture Diagram](file:///C:/Users/Krish/.gemini/antigravity-ide/brain/1a7a0006-b33f-4aa9-9d9a-d8d89c1de350/clean_arch_auth_diagram_1792586704268.jpg)

---

## 📖 Further Reading
- *Clean Architecture* – Robert C. Martin
- InversifyJS docs: https://inversify.io/
- Sequelize docs: https://sequelize.org/
- JWT best practices: https://jwt.io/

Feel free to expand the project with role‑based guards, refresh tokens, and unit tests!
