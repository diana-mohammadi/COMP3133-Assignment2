const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    department: String!
    position: String!
    salary: Float!
    dateOfJoining: String!
    profilePicture: String
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getEmployees: [Employee]
    getEmployee(id: ID!): Employee
    searchEmployees(department: String, position: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addEmployee(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      department: String!
      position: String!
      salary: Float!
      dateOfJoining: String!
      profilePicture: String
    ): Employee

    updateEmployee(
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      department: String!
      position: String!
      salary: Float!
      dateOfJoining: String!
      profilePicture: String
    ): Employee

    deleteEmployee(id: ID!): String
  }
`;