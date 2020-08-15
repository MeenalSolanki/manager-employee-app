import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeAddService } from 'src/app/services/employees/employee-add.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from 'src/app/common/employee';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  employee: Employee;

  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService:EmployeeAddService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.employee= data.pageValue;;
     }

  ngOnInit(): void {
  }
  
  closeModal() {
    this.dialogRef.close();
    window.location.reload()
    
  }

}
