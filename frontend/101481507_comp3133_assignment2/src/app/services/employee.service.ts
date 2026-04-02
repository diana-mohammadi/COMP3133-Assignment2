import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private api = 'https://comp3133-backend-41ku.onrender.com/graphql';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.post<any>(this.api, {
      query: `
        query {
          getEmployees {
            id
            firstName
            lastName
            email
            phone
            department
            position
            salary
            dateOfJoining
            profilePicture
          }
        }
      `
    });
  }

  getEmployee(id: string) {
    return this.http.post<any>(this.api, {
      query: `
        query GetEmployee($id: ID!) {
          getEmployee(id: $id) {
            id
            firstName
            lastName
            email
            phone
            department
            position
            salary
            dateOfJoining
            profilePicture
          }
        }
      `,
      variables: { id }
    });
  }

  addEmployee(employee: any) {
    return this.http.post<any>(this.api, {
      query: `
        mutation AddEmployee(
          $firstName: String!,
          $lastName: String!,
          $email: String!,
          $phone: String!,
          $department: String!,
          $position: String!,
          $salary: Float!,
          $dateOfJoining: String!,
          $profilePicture: String
        ) {
          addEmployee(
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            phone: $phone,
            department: $department,
            position: $position,
            salary: $salary,
            dateOfJoining: $dateOfJoining,
            profilePicture: $profilePicture
          ) {
            id
            firstName
          }
        }
      `,
      variables: employee
    });
  }

  updateEmployee(employee: any) {
    return this.http.post<any>(this.api, {
      query: `
        mutation UpdateEmployee(
          $id: ID!,
          $firstName: String!,
          $lastName: String!,
          $email: String!,
          $phone: String!,
          $department: String!,
          $position: String!,
          $salary: Float!,
          $dateOfJoining: String!,
          $profilePicture: String
        ) {
          updateEmployee(
            id: $id,
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            phone: $phone,
            department: $department,
            position: $position,
            salary: $salary,
            dateOfJoining: $dateOfJoining,
            profilePicture: $profilePicture
          ) {
            id
            firstName
          }
        }
      `,
      variables: employee
    });
  }

  deleteEmployee(id: string) {
    return this.http.post<any>(this.api, {
      query: `
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    });
  }

  searchEmployees(department?: string, position?: string) {
    return this.http.post<any>(this.api, {
      query: `
        query SearchEmployees($department: String, $position: String) {
          searchEmployees(department: $department, position: $position) {
            id
            firstName
            lastName
            email
            department
            position
            profilePicture
          }
        }
      `,
      variables: { department, position }
    });
  }
}