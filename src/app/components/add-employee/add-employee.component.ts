import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {EmployeeAddService} from 'src/app/services/employees/employee-add.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {Manager} from '../../common/manager';
import { Employee } from 'src/app/common/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  name:string;
  addedSuccessfully = false;
  form:any={};
  errorMessage: any;
  homeComponent:HomeComponent;
  employee:Employee;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
 

  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService:EmployeeAddService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data)
      {
        console.log("conat data ");
        this.form = data.pageValue;
      }

      else{
        console.log("data is null");
        this.form={};
      }
     
     
     }

  ngOnInit() {
    this.addedSuccessfully = false;
    console.log("data of formmm "+this.form.firstName);
  }

  
  onSubmit(){
   this.employee= this.form;
     this.employeeService.addEmployee(this.form).subscribe(
       data=>
       {
         console.log("firstname : "+ data.firstName);
         this.name = data.firstName+" "+ data.lastName;
         this.addedSuccessfully=true;
       },
       err => {
        this.errorMessage = err.error.message;
      }
     );
     }

  

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
    window.location.reload()
    
  }
}
