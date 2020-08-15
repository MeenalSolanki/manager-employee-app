import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Manager } from 'src/app/common/manager';
import { TokenStorageService } from '../token-storage/token-storage.service';
import {Employee} from  'src/app/common/employee';

const baseUrl = 'http://localhost:8080/mindbowser/employees';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EmployeeAddService {
  isLoggedIn = false;
  managerId:number; 
  employeeData:Subject<Employee> = new Subject<Employee>();


  constructor(private http:HttpClient,
    private tokenStorage: TokenStorageService) { }

//get current session manager info 
    currentSessionInfo()
    {
      this.isLoggedIn = !!this.tokenStorage.getToken();

      if (this.isLoggedIn) {
        const user = this.tokenStorage.getUser();
        console.log("user.id "+user.id + " user.firstname "+user.firstname);
       this.managerId = user.id;
      }
    }


  addEmployee(employee): Observable<any> {
    console.log("Address: "+employee.address);
    console.log("email: "+employee.email);
    console.log("lastname: "+employee.lastName);
    return this.http.post(baseUrl , employee,httpOptions)
}

getEmployeeListPaginate(thePage: number, thePageSize:number): Observable<GetResponseEmployee>
{
  this.currentSessionInfo();
const searchUrl =`${baseUrl}/search/findByManagerId?id=${this.managerId}&page=${thePage}&size=${thePageSize}`;

return this.http.get<GetResponseEmployee>(searchUrl);
}

deleteTheEmployee(id: number) :Observable<String> 
{
    const deleteUrl = `${baseUrl}/${id}`;
   
    return this.http.delete<String>(deleteUrl);
}

}



interface GetResponseEmployee
{
_embedded:{
  employee: Employee[];
},
page:{
  size:number,
  totalElements:number,
  totalPages:number,
  number:number
}

}