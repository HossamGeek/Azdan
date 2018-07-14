import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-editissues',
  templateUrl: './editissues.component.html',
  styleUrls: ['./editissues.component.css']
})
export class EditissuesComponent implements OnInit {
  loginuser = '';
  tester = '';
  issueid='';
  status = 0;
  issues = {
    name: '',
    describe: ''
  };
  erralert = false;
  errdata = '';
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.tester = sessionStorage.getItem('userid');

    this.route.params.subscribe(params => {
      this.issueid = params.id;
    });
    this.getissue(this.issueid);
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

  getissue(id){
    this.dataService.getissue(id).subscribe(res =>{
      this.issues.name = res.data[0].name;
      this.issues.describe = res.data[0].describe;

    })
  }


  editissues({valid}){
    if(valid){

      this.dataService.editissue(this.tester,this.issueid,this.issues).subscribe(res => {
          this.router.navigate(['/tester/allissues']);

      });
    }else{
      this.erralert = true;
      this.errdata = 'data not completed';
    }
  }
}
