import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-edittasks',
  templateUrl: './edittasks.component.html',
  styleUrls: ['./edittasks.component.css']
})
export class EdittasksComponent implements OnInit {
  loginuser = '';
  developer = '';
  taskid='';
  status = 0;
  tasks = {
    name: '',
    describe: '',
    status: ''
  };
  erralert = false;
  errdata = '';

  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.developer = sessionStorage.getItem('userid');

    this.route.params.subscribe(params => {
      this.taskid = params.id;
    });
    this.gettask(this.taskid);
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
  gettask(id){
    this.dataService.gettask(id).subscribe(res =>{
      this.tasks.name = res.data[0].name;
      this.tasks.describe = res.data[0].describe;

    })
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

  editTask({valid}){
    if(valid){

      this.dataService.editissue(this.developer,this.taskid,this.tasks).subscribe(res => {
        this.router.navigate(['/developer/alltasks']);

      });
    }else{
      this.erralert = true;
      this.errdata = 'data not completed change select';
    }
  }
}
