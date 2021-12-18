import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  inSession = new Subject();

  constructor(private router: Router) { }

  setToken(userObj: any){
    localStorage.setItem('token', JSON.stringify(userObj));
    this.inSession.next(true);
  }

  getToken(){
    let token = localStorage.getItem('token');
    return JSON.parse(token);
  }

  removeToken(){
    localStorage.removeItem('token');
    this.inSession.next(false);
  }

  isUserInSession(){
    let token = this.getToken();
    if(!token || token=={} || token==null){
      this.router.navigate(['/login']);
    }
  }
}
