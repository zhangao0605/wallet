import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd'
import {HomeComponent} from "../home/home.component";
import {Process1serveService} from "./process1serve.service";
import {HomeserveService} from "../home/homeserve.service";
import {Router} from "@angular/router";

declare var keythereum: any

@Component({
  selector: 'app-process1',
  templateUrl: './process1.component.html',
  styleUrls: ['./process1.component.css']
})
export class Process1Component implements OnInit {
  current = 0;
  pwd = ''
  isOperating = true
  process_1 = false
  process_2 = true
  process_3 = true
  process_4 = true
  Privatekey = ''
  createMessages;

  /*全局提示*/
  createMessage(type: string): void {
  }

  next(e): void {
    if (e === 1) {
      if (this.pwd === '') {
        this.createMessages = '钱包密码不能为空，请输入！'
        this.createMessage('error')
      } else {
        this.afn.keyJson_pwd = this.pwd
        this.isOperating = false
        setTimeout(function () {
          that.createAccount()
        }, 500)
        let that = this
        let timer = setInterval(function () {
          if (that.keyJson === '') {
          } else {
            that.isOperating = true
            that.process_1 = true
            that.process_2 = false
            that.process_3 = true
            that.process_4 = true
            that.current = e
            clearInterval(timer)
          }
        }, 1000)
      }
    }
    else if (e === 2) {
      this.isOperating = false
      setTimeout(function () {
        that.getPrivate()
      }, 500)
      let that = this
      let timer1 = setInterval(function () {
        if (that.Privatekey === '') {
        } else {
          that.process_1 = true
          that.process_2 = true
          that.process_3 = false
          that.process_4 = true
          that.current = 1
          that.isOperating = true
          clearInterval(timer1)
        }
      }, 1000)
    }
    else if (e === 3) {
      this.process_1 = true
      this.process_2 = true
      this.process_3 = true
      this.process_4 = false
      this.current = 2
    } else if (e === 4) {
      localStorage.setItem('address',''+this.keyJson_address+'')
      localStorage.setItem('pwd',''+this.pwd+'')
      this.route.navigate(['/wallet'])
    }
  }

  constructor(private message: NzMessageService, private asd: HomeComponent, private afn: Process1serveService, private home_serve: Process1serveService, private route: Router) {
  }

  /*打开打印页*/
  openPage() {
    localStorage.setItem('add', '' + this.keyJson_address + '')
    localStorage.setItem('key', '' + this.Privatekey + '')
    window.open('#/print', '_blank')
  }

  ngOnInit() {
    this.asd.wallet_hidden = true
  }

  /*下载秘钥库文件*/
  download(filename, con) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(con));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  downloadFlie() {
    this.download('私钥库文件', '' + this.keyJson + '')
  }

  keyJson = ''
  keyJson_address = ''

  /*生成秘钥库文件*/
  createAccount() {
    let newAccountpwd = this.pwd
    let params = {keyBytes: 32, ivBytes: 16};
    let dk = keythereum.create(params)
    // let options = {
    //   kdf: "scrypt",
    //   cipher: "aes-128-ctr",
    //   kdfparams: {
    //     n: 262144,
    //     r: 8,
    //     p: 1,
    //     dklen: 32
    //   }
    // };
    // let keyObject = keythereum.dump(newAccountpwd, dk.privateKey, dk.salt, dk.iv, options);
    let keyObject = keythereum.dump(newAccountpwd, dk.privateKey, dk.salt, dk.iv);
    this.keyJson = JSON.stringify(keyObject)
    this.keyJson_address = keyObject.address
    this.afn.keyJson_address = this.keyJson_address
  }

  /*获取私钥*/
  getPrivate() {
    let keyObject = JSON.parse(this.keyJson);
    let privatekey = keythereum.recover(this.pwd, keyObject);
    let one = JSON.parse(JSON.stringify(privatekey))
    this.Privatekey = this.shuzuTo16Str(one.data);
  }

  shuzuTo16Str(as) {
    let rtnStr = '';
    for (let j = 0, len = as.length; j < len; j++) {
      rtnStr += as[j].toString(16);
    }
    return '0x' + rtnStr;
  }
}
