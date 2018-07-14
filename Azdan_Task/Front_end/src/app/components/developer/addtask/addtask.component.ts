import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  loginuser = '';
  developer = '';
  systemid='';
  status = 0;
  tasks = {
    name: '',
    systemid: '',
    developerid: '',
    describe: '',
    status: ''
  };
  erralert = false;
  errdata = '';

  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.developer = sessionStorage.getItem('userid');

    this.route.params.subscribe(params => {
      this.systemid = params.id;
    });
  }

  ngOnInit(): void {
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

  addstatus(e){
    if(parseInt(e) === 1){
      this.tasks.status = '10';
    }else if(parseInt(e) === 2){
      this.tasks.status = '40';
    }else if(parseInt(e) === 3){
      this.tasks.status = '70';
    }else if(parseInt(e) === 4){
      this.tasks.status = '100';
    }
  }

  addTask({valid}){
    if(valid){
      this.tasks.developerid = this.developer;
      this.tasks.systemid = this.systemid;
      this.dataService.addIssues(this.developer,this.tasks).subscribe(res => {
        if(res.success === false){
          this.erralert = true;
          this.errdata = 'Task has been Added before';
        }
        setTimeout(()=>{
          this.router.navigate(['/developer/alltasks']);

        },1000);
      })
    }else{
      this.erralert = true;
      this.errdata = 'data not completed';
    }
  }


}
