import { Component, OnInit } from '@angular/core';
import {ConnectService} from '../../../../services/connect.service';
import {ActivatedRoute, Router} from '@angular/router';
import {split} from 'ts-node';
import {not} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-getsystem',
  templateUrl: './getsystem.component.html',
  styleUrls: ['./getsystem.component.css']
})
export class GetsystemComponent implements OnInit {
  loginuser = '';
  admin= '';
  status=0;
  systemid = '';
  getsystem = [];
  showdeveloperdialog = false;
  showtesterdialog = false;
  testers = [];
  developers = [];
  errdata = '';
  erralert = false;

  deletedalert = false;
  deletedmsg = '';

  inputtester = '';
  id_tester = '';
  inputdeveloper = '';
  id_developer = '';
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.route.params.subscribe(params => {
      this.systemid = params.id;
    });
    this.getSystemById(this.systemid);
    this.getAllTesters();
    this.getAlldevelopers();
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
  getSystemById(id) {
    this.dataService.getSystemById(id).subscribe(alldata => {
      this.getsystem = alldata.data[0];

    });
  }

  getAllTesters() {
    this.dataService.getAllTesters().subscribe(alltester => {
      this.testers = alltester.data;
    });
  }
  getAlldevelopers() {
    this.dataService.getAllDevelopers().subscribe(alldeveloper => {
      this.developers = alldeveloper.data;
    });
  }
  deleteSystem(id){
    this.dataService.deleteSystem(id).subscribe(deleted => {
      if(deleted.success === false){
        this.deletedalert = true;
        this.deletedmsg = 'system can not Deleted and system must have one or more';
      }else{
        this.router.navigate(['/admin/allsystems']);
      }
    });
  }
  deleteDeveloper(id) {
    const userid = {
      developerid: id
    };
    this.dataService.deleteDeveloper(this.systemid, userid).subscribe(data => {
      this.getSystemById(this.systemid);
    });
  }
  deleteTester(id) {
    const userid = {
      testerid: id
    };
    this.dataService.deleteTester(this.systemid, userid).subscribe(data => {
      this.getSystemById(this.systemid);
    });
  }
  close() {
    this.showdeveloperdialog = false;
    this.showtesterdialog = false;
    this.errdata = '';
    this.erralert = false;
  }
  showdeveloper() {
    this.showdeveloperdialog = true;
  }
  showtester() {
    this.showtesterdialog = true;
  }
  addtester(data) {
    this.erralert = false;
    const data1 = data.split(',');
    this.id_tester = data1[0];
    this.inputtester = data1[1];
  }
  addTesterToDb({valid}) {
    if (valid) {
        const data = {
          testerid: this.id_tester
        };
      this.dataService.addTester(this.systemid, data).subscribe(addtester => {
        this.getSystemById(this.systemid);
        this.close();
      });

    } else {
      console.log('not vaild');
         this.erralert = true;
        this.errdata = 'not data to add';
    }
  }
  adddeveloper(data) {
    this.erralert = false;
    const data1 = data.split(',');
    this.id_developer = data1[0];
    this.inputdeveloper = data1[1];
  }
  addDeveloperToDb({valid}) {
    if (valid) {
      const data = {
        developerid: this.id_developer
      };
     this.dataService.addDeveloper(this.systemid, data).subscribe(adddeveloper => {
        this.getSystemById(this.systemid);
        this.close();
      });
    } else {
      this.erralert = true;
      this.errdata = 'not data to add';
    }
  }
}
