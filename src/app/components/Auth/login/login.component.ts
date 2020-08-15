import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { Router } from '@angular/router';

import {Manager} from 'src/app/common/manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  manager:Manager=null;

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
       //if loged in save manager's token and data
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        
        this.manager=data;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    this.router.navigateByUrl(`/home`);
  }


}
