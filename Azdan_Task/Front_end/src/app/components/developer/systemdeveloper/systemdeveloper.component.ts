import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-systemdeveloper',
  templateUrl: './systemdeveloper.component.html',
  styleUrls: ['./systemdeveloper.component.css']
})
export class SystemdeveloperComponent implements OnInit {
  loginuser = '';
  developer = '';
  status = 0;
  allsystem = [];
  setInterval :any;

  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.developer = sessionStorage.getItem('userid');
    this.setInterval = setInterval(()=>{
      this.getallsystem(this.developer);
    },1000);

    this.getallsystem(this.developer);
  }

  ngOnInit() {
  }
  showlogin() {
    this.developer = sessionStorage.getItem('userid');
    if(this.developer){
      this.dataService.getStatus(this.developer).subscribe(status =>{
        this.loginuser = sessionStorage.getItem('login');
        this.status = status.data[0].status;
        if ( Boolean(this.loginuser) && (this.status != 3)) {
          this.router.navigate(['/home']);
        }
      });
    }else{
      this.router.navigate(['/home']);
    }
  }
  getallsystem(id){
    this.dataService.getAllsystemForDeveloper(id).subscribe(res =>{
      this.allsystem = res.data;
      console.log(this.allsystem);
    })
  }
}
