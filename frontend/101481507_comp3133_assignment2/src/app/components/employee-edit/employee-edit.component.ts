import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {
  employee: any = {
    id: '',
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

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(id).subscribe((res) => {
      this.employee = res?.data?.getEmployee;
    });
  }

  updateEmployee() {
    this.errorMessage = '';

    const e = this.employee;
    if (!e.firstName || !e.lastName || !e.email || !e.phone || !e.department || !e.position || !e.dateOfJoining) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    e.salary = Number(e.salary);

    this.employeeService.updateEmployee(e).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => this.errorMessage = 'Failed to update employee.'
    });
  }
}