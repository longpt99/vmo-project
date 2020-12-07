account: admin01@gmail.com
password: admin123

Route API:

Mục lục:

1. Cài đặt môi trường:
   nodejs, yarn

Create file .env.dev trong src/config/env;

2. Start project: yarn server

3. Docs API:

- Authentication:

* Login: POST method
  Router: http://localhost:8080/api/auth/login
  Body: {
  "email": "admin01@gmail.com",
  "password": "admin01"
  }

*

├── package.json
├── server.js
├── src
│ ├── app.js
│ ├── config
│ │ ├── database.js
│ │ ├── dependencies.js
│ │ ├── env
│ │ ├── routeSchema.json
│ │ └── routes.js
│ ├── controllers
│ │ ├── authController.js
│ │ ├── customerController.js
│ │ ├── departmentController.js
│ │ ├── projectTypeController.js
│ │ ├── projectController.js
│ │ ├── searchController.js
│ │ ├── staffController.js
│ │ └── techStackController.js
│ ├── helpers
│ │ ├── logger.js
│ │ └── response.js
│ ├── json
│ │ ├── auth
│ │ │ ├── login.json
│ │ │ ├── refreshToken.json
│ │ │ └── resetPassword.json
│ │ ├── customers
│ │ │ ├── createCustomer.json
│ │ │ └── updateCustomer.json
│ │ ├── departments
│ │ │ ├── createDepartment.json
│ │ │ └── updateDepartment.json
│ │ ├── projectTypes
│ │ │ ├── createProjectType.json
│ │ │ └── updateProjectType.json
│ │ ├── projects
│ │ │ ├── createProject.json
│ │ │ └── updateProject.json
│ │ ├── staffs
│ │ │ ├── createStaff.json
│ │ │ └── updateStaff.json
│ │ └── techStacks
│ │ ├── createTechStacks.json
│ │ └── updateTechStacks.json
│ ├── middlewares
│ │ ├── basicToken.js
│ │ ├── bearerToken.js
│ │ ├── index.js
│ │ ├── initialAccount.js
│ │ ├── verifyRefreshToken.js
│ │ └── verifyRequest.js
│ ├── models
│ │ ├── Account.js
│ │ ├── Client.js
│ │ ├── Customer.js
│ │ ├── Department.js
│ │ ├── Project.js
│ │ ├── ProjectType.js
│ │ ├── Staff.js
│ │ ├── StaffExp.js
│ │ ├── TechStack.js
│ │ └── index.js
│ ├── routes
│ │ ├── auth.js
│ │ ├── customer.js
│ │ ├── department.js
│ │ ├── project.js
│ │ ├── projectType.js
│ │ ├── staff.js
│ │ └── techStack.js
│ └── services
│ ├── arrayLength.js
│ ├── authService.js
│ ├── commonQuery.js
│ └── tokenService.js
├── webpack.common.js
├── webpack.dev.js
├── yarn-error.log
└── yarn.lock
