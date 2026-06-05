# 🔐 Role-Based Authentication System (NestJS)

Day 2 Backend Internship Task – Schedula Project

---

## ⚙️ Tech Stack
NestJS • TypeORM • PostgreSQL (Docker) • JWT • bcrypt

---

## 🎥 Demo & API Testing

- 🎥 Loom Video: https://www.loom.com/share/02e9b0b1664f4812aefcb5c75c477498  
- 📦 Postman Collection: https://solar-shuttle-667923.postman.co/workspace/ca6a7db0-ba68-4a43-8a6a-74f7a097cbbe/collection/43085990-025e7b4e-ae8c-4c62-ae28-2275a781c504?action=copy-link&source=copy-link&creator=43085990  

---

## 🔐 Features Implemented

- User Signup & Login APIs
- DTO validation for request handling
- Exception handling for auth flows
- JWT Authentication system
  - `jwt-auth.guard.ts`
  - `jwt.strategy.ts` (payload extraction & token validation)
- User entity with role-based enum (DOCTOR / PATIENT)
- Role-based access control
  - `roles.decorator.ts`
  - `roles.guard.ts`
- Password hashing using bcrypt
- PostgreSQL connected via Docker container and user table verified locally
- User data stored & verified in database
- Entire flow tested using Postman collection

---
![Login](./postman%20ss/Screenshot%202026-06-05%20213535.png)

![Role Check](./postman%20ss/Screenshot%202026-06-05%20214031.png)

## 🧱 File Structure

```bash
src
├── auth
│   ├── dto
│   │   ├── login.dto.ts
│   │   └── signup.dto.ts
│   │
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   │
│   ├── jwt-auth.guard.ts
│   ├── jwt.strategy.ts
│   ├── roles.decorator.ts
│   ├── roles.guard.ts
│   └── user.entity.ts
│
├── common
│   └── role.enum.ts
│
├── app.module.ts
└── main.ts
