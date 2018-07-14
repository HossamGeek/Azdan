import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  url = 'https://azdan.herokuapp.com';
  headers = null;
  options = null;
  constructor(public  http: Http) {
    this.headers = new  Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With , Content-Type, Origin, ' +
      'Authorization, Accept, Client-Security-Token, Accept-Encoding');

    this.options = new RequestOptions({ headers: this.headers });

  }
  getAllSystems() {
    return this.http.get(this.url + '/admin/allsystems', this.options).pipe(map(res => res.json()));
  }
  getSystemById(id) {
    return this.http.get(this.url + `/admin/system/${id}` , this.options).pipe(map(res => res.json()));
  }
  deleteDeveloper(id, data: any) {
    return this.http.put(this.url + `/admin/system/deletedeveloper/${id}`, data).pipe(map(res => res.json()));
  }
  deleteTester(id, data: any) {
    return this.http.put(this.url + `/admin/system/deletetester/${id}`, data ).pipe(map(res => res.json()));
  }
  getAllTesters() {
    return this.http.get(this.url + '/admin/alluser/2', this.options).pipe(map(res => res.json()));
  }
  getAllDevelopers() {
    return this.http.get(this.url + '/admin/alluser/3', this.options).pipe(map(res => res.json()));
  }
  addTester(id, data: any) {
    return this.http.put(this.url + `/admin/system/addtester/${id}`, data ).pipe(map(res => res.json()));

  }
  addDeveloper(id, data: any) {
    return this.http.put(this.url + `/admin/system/adddeveloper/${id}`, data ).pipe(map(res => res.json()));

  }
  editSystem(id, data: any) {
    return this.http.put(this.url + `/admin/system/${id}`, data ).pipe(map(res => res.json()));
  }
  addSystem(data: any){
    return this.http.post(this.url + '/admin/addsystem', data ).pipe(map(res => res.json()));

  }
  deleteSystem(id) {
    return this.http.delete(this.url + `/admin/system/${id}`).pipe(map(res => res.json()));

  }
  login(data: any) {
    return this.http.post(this.url + '/user/login', data ).pipe(map(res => res.json()));
  }
  getAllUser() {
    return this.http.get(this.url + '/admin/alluser', this.options).pipe(map(res => res.json()));

  }
  addUser(data: any){
    return this.http.post(this.url + '/admin/adduser', data).pipe(map(res => res.json()));
  }
  deleteUser(id){

    return this.http.delete(this.url + `/admin/user/${id}`).pipe(map(res => res.json()));

  }
  getStatus(id){
    return this.http.get(this.url + `/user/getuserstatus/${id}`, this.options).pipe(map(res => res.json()));
  }
  getAllsystemForTestser(id){
    return this.http.get(this.url + `/admin/getsystem/tester/${id}`, this.options).pipe(map(res => res.json()));
  }
  getAllsystemForDeveloper(id){
    return this.http.get(this.url + `/admin/getsystem/developer/${id}`, this.options).pipe(map(res => res.json()));
  }
  addIssues(id, data: any){
    return this.http.post(this.url + `/user/addtask/${id}`, data).pipe(map(res => res.json()));
  }
  getAllIsuess(id) {
    return this.http.get(this.url + `/user/tester/${id}`, this.options).pipe(map(res => res.json()));
  }
  deleteIsues(iduser, idtask) {
    return this.http.delete(this.url + `/user/task/${idtask}/${iduser}`).pipe(map(res => res.json()));
  }
  getissue(id){
    return this.http.get(this.url + `/user/getissue/${id}`, this.options).pipe(map(res => res.json()));
  }
  editissue(iduser, idtask ,data: any) {
    return this.http.put(this.url + `/user/task/${idtask}/${iduser}`, data).pipe(map(res => res.json()));
  }
  getAllTasks(id) {
    return this.http.get(this.url + `/user/developer/${id}`, this.options).pipe(map(res => res.json()));
  }
  gettask(id){
    return this.http.get(this.url + `/user/gettask/${id}`, this.options).pipe(map(res => res.json()));
  }
}
