import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  employee: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: 0,
    dateOfJoining: '',
    profilePicture: ''
  };

  errorMessage = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  saveEmployee() {
    this.errorMessage = '';

    const e = this.employee;
    if (!e.firstName || !e.lastName || !e.email || !e.phone || !e.department || !e.position || !e.dateOfJoining) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    e.salary = Number(e.salary);

    this.employeeService.addEmployee(e).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => this.errorMessage = 'Failed to add employee.'
    });
  }
}