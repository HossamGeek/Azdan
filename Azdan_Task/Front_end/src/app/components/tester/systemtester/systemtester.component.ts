import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-systemtester',
  templateUrl: './systemtester.component.html',
  styleUrls: ['./systemtester.component.css']
})
export class SystemtesterComponent implements OnInit {
  loginuser = '';
  tester = '';
  status = 0;
  allsystem = [];
  setInterval :any;

  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.tester = sessionStorage.getItem('userid');
    this.setInterval = setInterval(()=>{
      this.getallsystem(this.tester);
    },1000);
    this.getallsystem(this.tester);
  }


  ngOnInit() {
  }
  showlogin() {
    this.tester = sessionStorage.getItem('userid');
    if(this.tester){
      this.dataService.getStatus(this.tester).subscribe(status =>{
        this.loginuser = sessionStorage.getItem('login');
        this.status = status.data[0].status;
        if ( Boolean(this.loginuser) && (this.status != 2)) {
          this.router.navigate(['/home']);
        }
      });
    }else{
      this.router.navigate(['/home']);
    }
  }
  getallsystem(id){
    this.dataService.getAllsystemForTestser(id).subscribe(res =>{
      this.allsystem = res.data;
      console.log(this.allsystem);
    })
  }
}
