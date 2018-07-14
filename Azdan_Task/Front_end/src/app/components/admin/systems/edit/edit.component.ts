import { Component, OnInit } from '@angular/core';
import {ConnectService} from '../../../../services/connect.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  loginuser = '';
  admin = '';
  status=0;
  systemid = '';
  getsystem = [];
  errdata = '';
  erralert = false;
  system = {
    name: '',
    describe: ''
  };
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
   this.showlogin();
    this.route.params.subscribe(params => {
      this.systemid = params.id;
    });
    this.getSystemById(this.systemid);
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

       this.system.name = this.getsystem[0].name;
        this.system.describe = this.getsystem[0].describe;
    });
  }
  edit({value, valid}) {
    if (valid) {
      this.dataService.editSystem(this.systemid, this.system).subscribe(alldata => {
        this.router.navigate(['/admin/allsystems']);
      });
    } else {
      this.erralert = true;
      this.errdata = 'please compleate input';
    }
  }
}
