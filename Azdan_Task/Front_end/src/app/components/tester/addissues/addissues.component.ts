import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-addissues',
  templateUrl: './addissues.component.html',
  styleUrls: ['./addissues.component.css']
})
export class AddissuesComponent implements OnInit {
  loginuser = '';
  tester = '';
  systemid='';
  status = 0;
  issues = {
    name: '',
    systemid: '',
    testerid: '',
    describe: ''
  };
  erralert = false;
  errdata = '';
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.tester = sessionStorage.getItem('userid');

    this.route.params.subscribe(params => {
      this.systemid = params.id;
    });
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
  addissues({valid}){
    if(valid){
      this.issues.testerid = this.tester;
      this.issues.systemid = this.systemid;
      this.dataService.addIssues(this.tester,this.issues).subscribe(res => {
        if(res.success === false){
          this.erralert = true;
          this.errdata = 'Task has been Added before';
        }
        setTimeout(()=>{
          this.router.navigate(['/tester/allissues']);

        },1000);
      })
    }else{
      this.erralert = true;
      this.errdata = 'data not completed';
    }
  }
}
