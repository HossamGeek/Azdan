import { Component, OnInit } from '@angular/core';
import {ConnectService} from '../../../../services/connect.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  loginuser = '';
  admin='';
  status =0;
  errdata = '';
  erralert = false;
  system = {
    name: '',
    describe: ''
  };
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
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
  add({value, valid}) {
    if (valid) {
      this.dataService.addSystem(this.system).subscribe(alldata => {
        this.router.navigate(['/admin/allsystems']);
      });
    } else {
      this.erralert = true;
      this.errdata = 'please compleate input';
    }
  }
}
