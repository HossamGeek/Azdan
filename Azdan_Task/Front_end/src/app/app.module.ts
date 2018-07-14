import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


/*Form*/
import {FormsModule} from '@angular/forms';

/*service*/
import {ConnectService} from './services/connect.service';
import {HttpModule} from '@angular/http';


/*Routeing*/
import {Router, RouterModule, Routes} from '@angular/router';

/*components*/
import {AppComponent} from './components/app/app.component';
import { ShowsystemsComponent } from './components/admin/systems/showsystems/showsystems.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GetsystemComponent } from './components/admin/systems/getsystem/getsystem.component';
import { EditComponent } from './components/admin/systems/edit/edit.component';
import { AddComponent } from './components/admin/systems/add/add.component';
import { AllusersComponent } from './components/admin/systems/allusers/allusers.component';
import { AdduserComponent } from './components/admin/systems/adduser/adduser.component';
import { SystemtesterComponent } from './components/tester/systemtester/systemtester.component';
import { AddissuesComponent } from './components/tester/addissues/addissues.component';
import { EditissuesComponent } from './components/tester/editissues/editissues.component';
import { AllissuesComponent } from './components/tester/allissues/allissues.component';
import { AddtaskComponent } from './components/developer/addtask/addtask.component';
import { AlltasksComponent } from './components/developer/alltasks/alltasks.component';
import { EdittasksComponent } from './components/developer/edittasks/edittasks.component';
import { SystemdeveloperComponent } from './components/developer/systemdeveloper/systemdeveloper.component';


/*router*/
const approutes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  { path: 'admin/allsystems', component: ShowsystemsComponent},
  { path: 'getsystem/:id', component: GetsystemComponent},
  {path: 'editsystem/:id', component: EditComponent},
  {path: 'addsystem', component: AddComponent},
  {path: 'alluser', component: AllusersComponent},
  {path:'adduser', component:AdduserComponent},
  {path: 'tester', children: [
  { path: 'allsystems', component: SystemtesterComponent},
  {path: 'addissues/:id', component: AddissuesComponent},
  {path: 'allissues', component: AllissuesComponent},
  {path: 'editissue/:id', component: EditissuesComponent},
  ]},
  {path: 'developer', children: [
      {path: 'allsystems' , component : SystemdeveloperComponent},
      {path : 'addtask/:id', component: AddtaskComponent},
      {path: 'alltasks', component:AlltasksComponent},
      {path: 'edittask/:id', component: EdittasksComponent}
  ]},

/*  { path: 'editComment/:id',      component: EditCommentComponent },*/
  { path: '**',      component: HomeComponent },

  /*
  {path: 'register', component : RegisterComponent, children: [
      {path: 'user' , component : RegisteruserComponent},
      {path: 'store' , component : RegisterstoreComponent }
    ]}
*/
];



@NgModule({
  declarations: [
    AppComponent,
    ShowsystemsComponent,
    LoginComponent,
    HomeComponent,
    GetsystemComponent,
    EditComponent,
    AddComponent,
    AllusersComponent,
    AdduserComponent,
    SystemtesterComponent,
    AddissuesComponent,
    EditissuesComponent,
    AllissuesComponent,
    AddtaskComponent,
    AlltasksComponent,
    EdittasksComponent,
    SystemdeveloperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes),
  ],
  providers: [ConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
