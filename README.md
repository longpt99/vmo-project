account: admin01@gmail.com
password: admin123

Route API:

Mục lục:

1. Cài đặt môi trường

- Package: nodejs, yarn
  Create file .env.dev trong src/config/env;

2. Start project: yarn server

3. Docs API:

- Authentication:

* Login: POST method
  Router: http://localhost:8080/api/auth/login
  Body: {
  email: "admin01@gmail.com",
  password: "admin01"
  }

* Refresh token: POST method
  Router: http://localhost:8080/api/auth/refresh-token
  Body: {
  accessToken: String,
  refreshToken: String
  }

- Customer (must attach Authorization header):

* Get customer list: GET method
  Router: http://localhost:8080/api/customers
* Create new customer: POST method
  Router: http://localhost:8080/api/customers
  Body: {
  name: String,
  description: String,
  priorityNumber: Number,
  status: String,
  }
* Get customer detail: GET method
  Router: http://localhost:8080/api/customers/customerId
* Update customer detail: PUT method
  Router: http://localhost:8080/api/customers/customerId
* Delete customer detail: DELETE method
  Router: http://localhost:8080/api/customers/customerId

- Project Type (must attach Authorization header):

* Get project type list: GET method
  Router: http://localhost:8080/api/project-types
* Create new project type: POST method
  Router: http://localhost:8080/api/project-types
  Body: {
  name: String,
  description: String,
  priorityPoint: Number,
  status: String,
  }
* Get project type detail: GET method
  Router: http://localhost:8080/api/project-types/projectTypeId
* Update project type detail: PUT method
  Router: http://localhost:8080/api/project-types/projectTypeId
* Delete project type detail: DELETE method
  Router: http://localhost:8080/api/project-types/projectTypeId

- Project status (must attach Authorization header):

* Get project status list: GET method
  Router: http://localhost:8080/api/project-statuses
* Create new project status: POST method
  Router: http://localhost:8080/api/project-statuses
  Body: {
  name: String,
  description: String,
  status: String,
  }
* Get project status detail: GET method
  Router: http://localhost:8080/api/project-statuses/projectStatusId
* Update project status detail: PUT method
  Router: http://localhost:8080/api/project-statuses/projectStatusId
* Delete project status detail: DELETE method
  Router: http://localhost:8080/api/project-statuses/projectStatusId

- Tech stack (must attach Authorization header):

* Get tech stack list: GET method
  Router: http://localhost:8080/api/tech-stacks
* Create new tech stack: POST method
  Router: http://localhost:8080/api/tech-stacks
  Body: {
  name: String,
  description: String,
  status: String,
  }
* Get tech stack detail: GET method
  Router: http://localhost:8080/api/tech-stacks/techStackId
* Update tech stack detail: PUT method
  Router: http://localhost:8080/api/tech-stacks/techStackId
* Delete tech stack detail: DELETE method
  Router: http://localhost:8080/api/tech-stacks/techStackId

- Project (must attach Authorization header):

* Get project list: GET method
  Router: http://localhost:8080/api/projects
* Create new project: POST method
  Router: http://localhost:8080/api/projects
  Body: {
  name: String,
  description: String,
  projectTypesId: [id],
  techStacksId: [id],
  departmentsId: [id],
  staffsId: [id],
  customersId: [id],
  projectStatusId: id,
  }
* Get project detail: GET method
  Router: http://localhost:8080/api/projects/projectId
* Update project detail: PUT method
  Router: http://localhost:8080/api/projects/projectId
* Delete project detail: DELETE method
  Router: http://localhost:8080/api/projects/projectId

- Department (must attach Authorization header):

* Get department list: GET method
  Router: http://localhost:8080/api/departments
* Create new department: POST method
  Router: http://localhost:8080/api/departments
  Body: {
  name: String,
  description: String,
  techStacksId: ["id"],
  projectsId: ["id"],
  staffsId: ["id"],
  }
* Get department detail: GET method
  Router: http://localhost:8080/api/departments/departmentId
* Update department detail: PUT method
  Router: http://localhost:8080/api/departments/departmentId
* Delete department detail: DELETE method
  Router: http://localhost:8080/api/departments/departmentId

- Staff (must attach Authorization header):

* Get staff list: GET method
  Router: http://localhost:8080/api/staffs
* Create new staff: POST method
  Router: http://localhost:8080/api/staffs
  Body: {
  name: String,
  email: String,
  dob: Date,
  phoneNumber: String,
  address: String,
  identityNumber: String,
  languages: [String],
  certs: [String],
  rolesId: [id],
  }
* Get staff detail: GET method
  Router: http://localhost:8080/api/staffs/staffId
* Update staff detail: PUT method
  Router: http://localhost:8080/api/staffs/staffId
* Delete staff detail: DELETE method
  Router: http://localhost:8080/api/staffs/staffId

- Search (must attach Authorization header):

* Get result: GET method
  Router: http://localhost:8080/api/search?modelName&limit&page&sortBy&orderBy
