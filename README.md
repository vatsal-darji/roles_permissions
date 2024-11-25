# Role-Based Access Control System

A robust Node.js backend application implementing Role-Based Access Control (RBAC) using TypeScript, Express, and Sequelize ORM with MySQL.

## Features

- 🔐 Complete authentication system
- 👥 User management with roles
- 📝 Module-based permissions
- 🛡️ Role-Permission mapping
- 🔒 Secure middleware for route protection
- 📊 Pagination support for data retrieval
- 🗄️ MySQL database with Sequelize ORM
- 🏗️ TypeScript for type safety

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MySQL
- Sequelize ORM
- Passport.js
- JWT Authentication
- bcrypt

## Project Structure

src/
├── controllers/ # Request handlers
├── middleware/ # Custom middleware functions
├── migrations/ # Database migrations
├── models/ # Sequelize models
├── routes/ # API routes
├── seeders/ # Database seeders
├── services/ # Business logic
├── types/ # TypeScript interfaces
└── utils/ # Utility functions

## Database Schema

The system uses the following main tables:

- Users
- Roles
- Permissions
- Modules
- RolePermissions
- BlacklistedTokens

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd roles-n-permissions
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
USER_NAME=your_mysql_username
USER_PASSWORD=your_mysql_password
JWT_SECRET=your_jwt_secret
```

4. Create the database:

```bash
mysql -u root -p
CREATE DATABASE roles_permissions;
```

5. Run migrations:

```bash
npm run migrate
```

6. Seed the database:

```bash
npm run seed
```

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- POST `/auth/login` - User login
- POST `/auth/logout` - User logout

### Users

- POST `/user/createUser` - Create new user
- GET `/user/all` - Get all users (with pagination)
- PUT `/user/update/:id` - Update user

### Roles

- POST `/role/create` - Create new role
- GET `/role/getAll` - Get all roles

### Permissions

- POST `/permission/create` - Create new permission
- GET `/permission/all` - Get all permissions
- PUT `/permission/update/:id` - Update permission

### Modules

- POST `/module/create` - Create new module

### Role-Permissions

- POST `/rolePermission/create` - Assign permission to role
- GET `/rolePermission/all` - Get all role-permission mappings
- DELETE `/rolePermission/delete` - Remove permission from role

## Authentication & Authorization

The system uses JWT tokens for authentication. Protected routes require:

1. Valid JWT token in Authorization header
2. Appropriate role and permission for the requested resource

Example protected route access:

```typescript
Authorization: Bearer<jwt_token>;
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Author

Vatsal Darji

---

