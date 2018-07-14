import { Component, OnInit } from '@angular/core';
import {ConnectService} from '../../../../services/connect.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  errdata = '';
  erralert = false;
  status=0;
  loginuser = '';
  admin= '';
  adminid = '';
  userstatus = '';
  user= {
    admin_id: '',
    name: '',
    password:'',
    status:0
  };
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin(); }

  ngOnInit() {
  }

  showlogin() {
    this.admin = sessionStorage.getItem('userid');
    this.user.admin_id = this.admin;
    if(this.admin){
      this.dataService.getStatus(this.admin).subscribe(status =>{
        this.loginuser = sessionStorage.getItem('login');
        this.status = status.data[0].status;
        if ( Boolean(this.loginuser) && (this.status != 1)) {
          this.router.navigate(['/home']);
        }
      });
    }else{
      this.router.navigate(['/home']);
    }
  }
  addstatus(e){

    if(e == 1){
      this.user.status = 1;
      this.userstatus = 'add';
    }else if(e == 2){
      this.user.status = 2;
      this.userstatus = 'add';
    }else if(e == 3){
      this.user.status = 3;
      this.userstatus = 'add';
    }
  }

  adduser({value, valid}){
    if(valid){
      this.dataService.addUser(this.user).subscribe(res =>{
        this.router.navigate(['alluser']);

      })
    }else{
      this.erralert = true;
      this.errdata = 'complete data input';
    }
  }
}
