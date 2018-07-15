import { Component, OnInit } from '@angular/core';
import {ConnectService} from '../../../../services/connect.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  loginuser = '';
  admin = '';
  status = 0;
  alluser = [];
  tester = false;
  developer = false;
  setInterval :any;

  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.setInterval = setInterval(()=>{
      this.getAllUser();
    },1000);

    this.getAllUser();
  }

  ngOnInit() {
  }
  showlogin() {
    this.admin = sessionStorage.getItem('userid');
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

  getAllUser() {
    this.dataService.getAllUser().subscribe(alldata => {
      this.alluser = alldata.data;

    });
  }
  deleteUser(id){
    this.dataService.deleteUser(id).subscribe(res =>{
      this.getAllUser();
    });
  }
}
