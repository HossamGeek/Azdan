import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ConnectService} from '../../services/connect.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  loginuser = '';
  status = '';
  admin = false;
  tester = false;
  developer = false;
  logined = false;
  constructor(public  dataService: ConnectService, public router: Router) {
    this.showlogin();
  }
  showlogin() {
    this.loginuser = sessionStorage.getItem('login');
    this.username = sessionStorage.getItem('name');
    this.status =  sessionStorage.getItem('status');
    if (Boolean(this.loginuser)) {
      this.logined = true;
      if ( parseInt(this.status) === 1) {
        this.admin = true;
      } else if(parseInt(this.status) === 2) {
        this.tester = true;
      } else if (parseInt(this.status) === 3) {
        this.developer = true;
      }


    } else {
      this.logined = false;
    }

  }
  logout() {
    sessionStorage.clear();
    location.reload();
    this.router.navigate(['/home']);

  }
  login() {
    this.router.navigate(['/login']);
  }
}
