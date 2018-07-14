import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnectService} from '../../services/connect.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login Page';
  errdata = '';
  erralert = false;
  userdata = {
    name: '',
    password: ''
  };
  loginuser = '';
  constructor(public  dataService: ConnectService, public router: Router) {
    this.showlogin();
  }
  ngOnInit() {}

  showlogin() {
    this.loginuser = sessionStorage.getItem('login');
    if (Boolean(this.loginuser)) {
      this.router.navigate(['/home']);
    } else {
    }

  }

  login({value, valid}) {
    if (valid) {
      this.dataService.login(this.userdata).subscribe(data => {
        const result = data;
        if (result.data === 'empty') {
          this.erralert = true;
          this.errdata = 'username or password not valid';
        } else {
          const userid = 'userid';
          const idvalue = result.data[0]._id;
          const username = 'name';
          const usernamevalue = result.data[0].name;
          const status = 'status';
          const statusvalue = result.data[0].status;
          sessionStorage.setItem(userid, idvalue);
          sessionStorage.setItem(status, statusvalue);
          sessionStorage.setItem(username, usernamevalue);
          sessionStorage.setItem('login', 'true');
        }
        location.reload();
        this.router.navigate(['/home']);
      });
    } else {
      this.erralert = true;
      this.errdata = 'data empty';
    }
  }
}
