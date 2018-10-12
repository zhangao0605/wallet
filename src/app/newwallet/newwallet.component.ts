import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {NewwalletserveService} from "./newwalletserve.service";
// import {Process1Component} from "../process1/process1.component";
import {Process1serveService} from "../process1/process1serve.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import * as GlobalUrl from "../globals";

@Component({
  selector: 'app-newwallet',
  templateUrl: './newwallet.component.html',
  styleUrls: ['./newwallet.component.css']
})

export class NewwalletComponent implements OnInit {

  constructor(private homeCo: HomeComponent, private adc: NewwalletserveService, private agc: Process1serveService, private home_serve: Process1serveService, private route: Router, private message: NzMessageService) {
  }

  createMessages;

  /*全局提示*/
  createMessage(type: string): void {
    this.message.create(type, `` + this.createMessages + ``);
  }

  // keyJson_address
  isOperating_1 = true
  detail = true
  send_address;
  send_number;
  send_say;
  send = true
  receive = true
  my_address;
  my_pwd;
  /*广播地址获取相关信息*/
  get_Url = GlobalUrl.prioductUrl + '/account/getAccount'
  getAllTransactions = GlobalUrl.prioductUrl + '/transactions/getAllTransactions'
  getTransactionsByOnly = GlobalUrl.prioductUrl + '/transactions/getTxDetail'
  sendTransactions = GlobalUrl.prioductUrl + '/transactions/sendTransactions'

  ngOnInit() {

    this.my_address = localStorage.getItem('address')
    this.my_pwd = localStorage.getItem('pwd')
    this.homeCo.wallet_hidden = false
    this.adc.address_1 = this.my_address
    this.isOperating_1 = this.adc.isOperating_1
    this.receive = this.adc.receive
    this.send = this.adc.send
    let data = new FormData()
    data.append('password', '' + this.my_pwd + '')
    data.append('address', '' + this.my_address + '')
    this.home_serve.homeServe(this.get_Url, data, 1, 'save', this)
    let data1 = new FormData()
    data1.append('address', '' + this.my_address + '')
    this.home_serve.homeServe(this.getAllTransactions, data1, 2, 'save', this)
  }

  data = {
    "account": {
      "id": 0,
      "address": "",
      "name": "",
      "password": "",
      "nonce": 0,
      "balance": "0"
    }
  }
  details = {
    "id":0,
    "chainId":0,
    "height":0,
    "from":" ",
    "to":" ",
    "value":"0",
    "nonce":0,
    "remark":" ",
    "timeTamp":0,
    "theDate":" ",
    "theDateString":" ",
    "hashCode":0,
    "status":0,
    "txHeight":0
  }

  postOk(val, flag, distinguish) {
    if (distinguish === 1) {
      this.data = val.data
      this.adc.nonce = val.data.account.nonce
      this.adc.balance = val.data.account.balance
    } else if (distinguish === 2) {
      this.dataSet = val.data.transactionsList
    } else if (distinguish === 3) {
      this.adc.isOperating_1 = false
      this.detail = false
      this.details = val.data.transactionsList[0]
    } else if (distinguish === 4) {
      let data = new FormData()
      data.append('password', '' + this.my_pwd + '')
      data.append('address', '' + this.my_address + '')
      this.home_serve.homeServe(this.get_Url, data, 1, 'save', this)
      this.close_send()
      let data1 = new FormData()
      data1.append('address', '' + this.my_address + '')
      this.home_serve.homeServe(this.getAllTransactions, data1, 2, 'save', this)
    }
  }

  postOther(val, flag, distinguish) {
    if (distinguish === 1) {
      this.createMessages = val.msg
      this.createMessage('error')
    } else if (distinguish === 4) {
      this.createMessages = val.msg
      this.createMessage('error')
    }

  }

  postErr(val, flag, distinguish) {
    if (distinguish === 4) {
      this.createMessages = '交易失败，请稍后再试！'
      this.createMessage('error')
    }
  }

  dataSet = []

  seeDetial(e,q) {

    let data = new FormData()
    data.append('address', '' + e + '')
    data.append('id', '' + q + '')
    this.home_serve.homeServe(this.getTransactionsByOnly, data, 3, 'save', this)
  }

  closedetail() {
    this.adc.isOperating_1 = true
    this.detail = true
  }

  open_send() {
    this.adc.isOperating_1 = false
    this.send = false;
    this.send_address = ''
    this.send_number = ''
    this.send_say = ''
  }

  close_send() {
    this.adc.isOperating_1 = true
    this.adc.send = true;
    this.send_address = ''
    this.send_number = ''
    this.send_say = ''
  }

  open_receive() {
    this.adc.isOperating_1 = false
    this.receive = false;
  }

  close_receive() {
    this.adc.isOperating_1 = true
    this.adc.receive = true;
  }

  sure_send() {
    // if(this.send_number>Number(this.data.account.balance)||Number(this.data.account.balance)<=0){
    if (this.send_number > Number(this.data.account.balance) || this.send_number <= 0) {
      this.createMessages = '请输入有效转账金额！';
      this.createMessage('error')
      this.send_number = 0
    } else if (Number(this.data.account.balance) <= 0) {
      this.createMessages = '账户余额不足，无法进行转账！';
    } else {
      let data = new FormData()
      data.append('sendAddress', '' + this.my_address + '')
      data.append('address', '' + this.send_address + '')
      data.append('value', '' + this.send_number + '')
      data.append('remark', '' + this.send_say + '')
      this.home_serve.homeServe(this.sendTransactions, data, 4, 'save', this)
    }

  }

  /*复制*/
  cope_input() {
    let copyHttp = document.getElementById('copy');
    var range = document.createRange();     //创建一个范围的对象
    range.selectNode(copyHttp);             //选择范围内容
    window.getSelection().removeAllRanges();  //移除剪切板中其他的东西
    window.getSelection().addRange(range); //把范围添加进剪切板
    document.execCommand('copy'); //执行复制的命令
  }

  ngDoCheck() {
    this.send = this.adc.send
    this.isOperating_1 = this.adc.isOperating_1
    this.receive = this.adc.receive
  }

  peoSlice(e) {
    let a;
    let b = e.slice(0, 8)
    let c = e.slice(e.length - 8, e.length)
    a = b + '***' + c
    return a
  }
}
