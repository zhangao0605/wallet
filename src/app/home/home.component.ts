import { Component, OnInit } from '@angular/core';
// import {NewwalletComponent} from "../newwallet/newwallet.component";
import {NewwalletserveService} from "../newwallet/newwalletserve.service";
import {Process1serveService} from "../process1/process1serve.service";
import {HomeserveService} from "./homeserve.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import * as GlobalUrl from "../globals";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor( private adc:NewwalletserveService,private home_serve:HomeserveService, private message: NzMessageService, private route: Router,private agc: Process1serveService) { }
  errormessage;
  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.errormessage + ``);
  }
  wallet_hidden=true
  iskey='';
  ispwd='';
  visible = false;
  myadd;
  mynonce;
  mybalance;
  close_this(){
    this.visible=false;
    this.iskey=''
    this.ispwd=''
  }
  send(){
    this.adc.isOperating_1=false
    this.adc.send=false

  }

  get() {
    this.adc.isOperating_1=false
    this.adc.receive=false
  }
  /*登录地址*/
  login_Url=GlobalUrl.prioductUrl +'/account/login'
  login(){
    if(this.iskey===''||this.ispwd===''){
      this.errormessage = '私钥与密码为必填项请输入！'
      this.createMessage('error')
    }else {
      let data=new FormData()
      data.append('password',''+this.ispwd+'')
      this.home_serve.homeServe(this.login_Url, data, 1, 'save', this)
    }

  }
  postOk(val, flag, distinguish) {
    if(distinguish===1){
      this.myadd=val.data.account.address
      this.mynonce=val.data.account.nonce
      this.mybalance=val.data.account.balance
      localStorage.setItem('address',''+val.data.account.address+'')
      localStorage.setItem('pwd',''+this.ispwd+'')
      this.agc.keyJson_address=val.data.account.address
      this.agc.keyJson_pwd=this.ispwd
      this.close_this()

      this.route.navigate(['/wallet'])
    }
  }

  postOther(val, flag, distinguish) {
    if(distinguish===1){
      this.errormessage =val.msg
      this.createMessage('error')
    }

  }

  postErr(val, flag, distinguish) {
    if (distinguish === 1) {
      this.errormessage = '当前账户无效！'
      this.createMessage('error')
    }

  }
  ngOnInit() {
    console.log(this.login_Url)
    // console.log(this.adc)
  }
  ngDoCheck() {
    this.myadd=this.adc.address_1
    this.mynonce=this.adc.nonce
    this.mybalance=this.adc.balance
  }
  out_this(){
    localStorage.removeItem('address')
    localStorage.removeItem('pwd')
  }
}
