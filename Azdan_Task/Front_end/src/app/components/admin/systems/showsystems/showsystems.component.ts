import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnectService} from '../../../../services/connect.service';

@Component({
  selector: 'app-showsystems',
  templateUrl: './showsystems.component.html',
  styleUrls: ['./showsystems.component.css']
})
export class ShowsystemsComponent implements OnInit {
  allsystem = [];
  admin = '';
  status = 0;
  loginuser = '';
  constructor(public  dataService: ConnectService, public router: Router) {
    this.showlogin();
    this.getAllSystems();
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
  getAllSystems() {
    this.dataService.getAllSystems().subscribe(allsystem => {
      this.allsystem = allsystem.data[0];
      console.log(this.allsystem);
    });
  }
}
