import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewwalletserveService {
  isOperating_1= true
  receive = true
  send = true
  nonce;
  balance;
  address_1;
  constructor() {
  }
}
