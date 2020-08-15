import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth-service/auth-service.service';
import { Manager } from 'src/app/common/manager';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  manager:Manager;

  public min: Date = new Date(1980, 0o1, 0o1);
    public max: Date = new Date(2000, 0o1, 0o1);

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
  }
  
  onSubmit(): void {
    console.log("in Onsubit()");
    this.manager=this.form;
   this.authService.register( this.manager).subscribe(
   data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  
  }
  
}
