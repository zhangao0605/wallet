import {Component, OnInit} from '@angular/core';

declare var qrcode: any;

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor() {

  }

  address = ''
  key = ''

  ngOnInit() {
    let a = localStorage.getItem('add')
    console.log(a.length)
    this.address = a + '                         '
    this.key = localStorage.getItem('key')
    setTimeout(function () {
      localStorage.removeItem('add')
      localStorage.removeItem('key')
    }, 2000)
  }
}
