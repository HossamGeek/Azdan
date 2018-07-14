import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectService} from '../../../services/connect.service';

@Component({
  selector: 'app-alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.css']
})
export class AlltasksComponent implements OnInit {
  loginuser = '';
  developer = '';
  status = 0;
  alltasks = [];
  constructor(public  dataService: ConnectService, public route: ActivatedRoute, public router: Router) {
    this.showlogin();
    this.developer = sessionStorage.getItem('userid');

    this.getalltasks(this.developer);
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
  getalltasks(id){
    this.dataService.getAllTasks(id).subscribe(res =>{
      this.alltasks = res.data;
      if(new String(this.alltasks).valueOf() == new String( 'empty').valueOf()){
        this.router.navigate(['/home']);
      }

    });
  }
  getstyle(status){
    const status_value = parseInt(status);
    if(status_value <= 10 ){
      const style = {'background-color':' #f64141','width':`${status_value}%`};
      return style;
    }else if(status_value <= 50 ){
      const style = {'background-color':' #213687','width':`${status_value}%`};
      return style;
    }else if(status_value < 100 ){
      const style = {'background-color':' #d8c743','width':`${status_value}%`};
      return style;
    }else if(status_value === 100 ){
      const style = {'background-color':' #26ad43','width':`${status_value}%`};
      return style;
    }
  }
 delete(idtask){
    this.dataService.deleteIsues(this.developer,idtask).subscribe(res =>{
      this.getalltasks(this.developer);
    });
  }
}
