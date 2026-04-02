import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      console.log('Route id:', id);

      if (!id) {
        this.loading = false;
        this.errorMessage = 'No employee id found.';
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      this.employeeService.getEmployee(id).subscribe({
        next: (res: any) => {
          console.log('raw res:', res);
          this.employee = res?.data?.getEmployee || null;
          this.loading = false;
          if (!this.employee) {
            this.errorMessage = 'Employee not found.';
          }
        },
        error: (err) => {
          console.error('getEmployee error:', err);
          this.loading = false;
          this.errorMessage = 'Failed to load employee details.';
        }
      });
    });
  }
}