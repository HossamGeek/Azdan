import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-allissues',
  templateUrl: './allissues.component.html',
  styleUrls: ['./allissues.component.css']
})
export class AllissuesComponent implements OnInit {
  loginuser = '';
  tester = '';
  status = 0;
  allisues = [];
  setInterval :any;

  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.tester = sessionStorage.getItem('userid');
    this.setInterval = setInterval(()=>{
      this.getallisues(this.tester);
    },1000);
    this.getallisues(this.tester);
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
  getallisues(id){
    this.dataService.getAllIsuess(id).subscribe(res =>{
      this.allisues = res.data;
      if(new String(this.allisues).valueOf() == new String( 'empty').valueOf()){
        this.router.navigate(['/home']);
      }
      });
  }
  delete(idtask){
      this.dataService.deleteIsues(this.tester,idtask).subscribe(res =>{
        this.getallisues(this.tester);
      });
  }
}
