import { Component, OnInit } from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }
/*  if (statusvalue === 1) {
  this.router.navigate(['/admin/allsystems']);
  location.reload();
} else if (statusvalue === 2) {
  this.router.navigate(['/tester/allsystems']);
  location.reload();
} else if (statusvalue === 3) {
  this.router.navigate(['/developer/allsystems']);          }
location.reload();
}*/

}
