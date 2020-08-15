import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import { EmployeeAddService } from 'src/app/services/employees/employee-add.service';
import{Employee} from 'src/app/common/employee';
import{ConfirmationDialogService} from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { ShowDetailsComponent } from '../show-details/show-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
 {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  
  

//new properties for pagination
  thePageNumber:number =1;
  thePageSize: number = 5;
  theTotalElements:number =0;
  employees:Employee[];
  deleteMessage: boolean;
  
   dialogConfig = new MatDialogConfig();

  constructor(private tokenStorageService:TokenStorageService,
              private router:Router,
              private matDialog: MatDialog,
              private employeeSerive:EmployeeAddService,
              private confirmationDialogService:ConfirmationDialogService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
     
      this.username = user.firstname;
    }

  this.listEmployee();

  }
//load employee
  listEmployee() {
    this.employeeSerive.getEmployeeListPaginate(this.thePageNumber-1,this.thePageSize).subscribe(this.processResult());
    
  }
  
  processResult() {
    return data =>
    {
      this.employees = data._embedded.employees;
    console.log()
      this.thePageNumber =data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;

    }
  }

  //update pagination page size 
  updatePageSize(pageSize:number)
  {
   this.thePageSize = pageSize;
   this.thePageNumber=1;
   this.listEmployee(); 
  }

  dialogProperty()
  {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.id = "modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "650px";
  }

  openAddEmployeeModel(){
   
   // The user can't close the dialog by clicking outside its body
   this.dialogProperty();
    this.dialogConfig.data= { pageValue: {} }
 
    const modalDialog = this.matDialog.open(AddEmployeeComponent, this.dialogConfig);
  }


//delete 
  deleteEmployee(theId:number){
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete this Employee ?')
    .then((confirmed)=>{
      if(confirmed == true)
      {
        this.employeeSerive.deleteTheEmployee(theId).subscribe(
          data=>{
            console.log(data);  
              this.deleteMessage=true;  
              this.listEmployee();  
          },
          error => console.log(error));    
      }}  
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));  
  }


  //update employee
  updateEmployee(employee:Employee)
  {
    this.dialogProperty();
    this.dialogConfig.data= { pageValue: employee }
 
    const modalDialog = this.matDialog.open(AddEmployeeComponent, this.dialogConfig);


  }


  //logout
  logout() {

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Logout  ?')
    .then((confirmed)=>{
      if(confirmed == true)
      {
      this.tokenStorageService.signOut();
      this.router.navigateByUrl(`\login`);
      }
 })
.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}

detailsEmployee(employee:Employee)
{
  this.dialogProperty();
  this.dialogConfig.height = "440px";
  this.dialogConfig.disableClose = false;
  this.dialogConfig.data= { pageValue: employee }
 
  const modalDialog = this.matDialog.open(ShowDetailsComponent, this.dialogConfig);
}

}


