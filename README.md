# Management Project

Made by [longpt99](https://github.com/longpt99)

# New Features!

- Authentication (jsonwebtoken)
- Category (customer, project type, project status, tech stack)
- Management (project, department, staff)
- User role (pending)

# File Structure

> ├── Procfile
> ├── README.md
> ├── package.json
> ├── server.js
> ├── src
> │ ├── app.js
> │ ├── config
> │ │ ├── database.js
> │ │ ├── dependencies.js
> │ │ ├── env
> │ │ ├── routeSchema.json
> │ │ ├── routes.js
> │ │ └── webpack
> │ │ ├── webpack.common.js
> │ │ ├── webpack.dev.js
> │ │ └── webpack.prod.js
> │ ├── controllers
> │ │ ├── auth.controller.js
> │ │ ├── customer.controller.js
> │ │ ├── department.controller.js
> │ │ ├── permission.controller.js
> │ │ ├── project.controller.js
> │ │ ├── projectStatus.controller.js
> │ │ ├── projectType.controller.js
> │ │ ├── role.controller.js
> │ │ ├── search.controller.js
> │ │ ├── staff.controller.js
> │ │ └── techStack.controller.js
> │ ├── helpers
> │ │ ├── logger.helper.js
> │ │ ├── response.helper.js
> │ │ └── token.helper.js
> │ ├── json
> │ │ ├── auth
> │ │ │ ├── login.json
> │ │ │ ├── refreshToken.json
> │ │ │ └── resetPassword.json
> │ │ ├── customers
> │ │ │ ├── createCustomer.json
> │ │ │ └── updateCustomer.json
> │ │ ├── departments
> │ │ │ ├── createDepartment.json
> │ │ │ └── updateDepartment.json
> │ │ ├── permissions
> │ │ │ ├── createPermission.json
> │ │ │ └── updatePermission.json
> │ │ ├── projectStatuses
> │ │ │ ├── createProjectStatus.json
> │ │ │ └── updateProjectStatus.json
> │ │ ├── projectTypes
> │ │ │ ├── createProjectType.json
> │ │ │ └── updateProjectType.json
> │ │ ├── projects
> │ │ │ ├── createProject.json
> │ │ │ └── updateProject.json
> │ │ ├── staffs
> │ │ │ ├── createStaff.json
> │ │ │ ├── updateStaff.json
> │ │ │ └── updateStaffExp.json
> │ │ └── techStacks
> │ │ ├── createTechStack.json
> │ │ └── updateTechStack.json
> │ ├── middlewares
> │ │ ├── basicToken.js
> │ │ ├── bearerToken.js
> │ │ ├── errorHandler.js
> │ │ ├── index.js
> │ │ ├── initialAccount.js
> │ │ ├── refreshTokenHandler.js
> │ │ ├── roleHandler.js
> │ │ └── verifyRequest.js
> │ ├── models
> │ │ ├── account.model.js
> │ │ ├── client.model.js
> │ │ ├── customer.model.js
> │ │ ├── department.model.js
> │ │ ├── index.js
> │ │ ├── permission.model.js
> │ │ ├── project.model.js
> │ │ ├── projectStatus.model.js
> │ │ ├── projectType.model.js
> │ │ ├── role.model.js
> │ │ ├── staff.model.js
> │ │ ├── staffExp.model.js
> │ │ └── techStack.model.js
> │ ├── modules
> │ │ ├── auths
> │ │ │ ├── account.model.js
> │ │ │ ├── auth.controller.js
> │ │ │ ├── auth.route.js
> │ │ │ └── auth.service.js
> │ │ ├── customers
> │ │ ├── permissions
> │ │ ├── project-statuses
> │ │ ├── project-types
> │ │ ├── projects
> │ │ ├── staffs
> │ │ └── tech-stacks
> │ ├── routes
> │ │ ├── auth.route.js
> │ │ ├── customer.route.js
> │ │ ├── department.route.js
> │ │ ├── permission.route.js
> │ │ ├── project.route.js
> │ │ ├── projectStatus.route.js
> │ │ ├── projectType.route.js
> │ │ ├── role.route.js
> │ │ ├── search.route.js
> │ │ ├── staff.route.js
> │ │ └── techStack.route.js
> │ ├── services
> │ │ ├── auth.service.js
> │ │ ├── client.service.js
> │ │ ├── commonQuery.service.js
> │ │ ├── customer.service.js
> │ │ ├── department.service.js
> │ │ ├── permission.service.js
> │ │ ├── project.service.js
> │ │ ├── projectStatus.service.js
> │ │ ├── projectType.service.js
> │ │ ├── role.service.js
> │ │ ├── search.service.js
> │ │ ├── staff.service.js
> │ │ └── techStack.service.js
> │ ├── tests
> │ │ ├── auth.test.js
> │ │ ├── customer.test.js
> │ │ ├── department.test.js
> │ │ ├── index.test.js
> │ │ ├── project.test.js
> │ │ ├── projectStatus.test.js
> │ │ ├── projectType.test.js
> │ │ ├── staff.test.js
> │ │ └── techStack.test.js
> │ └── utils
> │ ├── arrayLength.util.js
> │ ├── capitalizeFirstLetter.util.js
> │ └── pagination.util.js
> ├── swagger.json
> ├── yarn-error.log
> └── yarn.lock

# Requirements

- Install [Node](https://nodejs.org/en/download) v14.15.1 LTS
- Install [yarn](https://yarnpkg.com/getting-started) v1.22.5
- Install [MongoDB](https://firebase.google.com/docs/cli/) v4.4.2

# Development

```
$ yarn install
$ yarn server # start dev server
```

# Unit Test

```
$ yarn test
```

# Start server at

```
127.0.0.1:8080 or localhost://8080
```
