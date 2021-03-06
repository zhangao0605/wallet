import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class HomeserveService {
  homeServe(reqUrl: string, reqBody, distinguish, flag, comp) {
    this.httpClient.post(reqUrl, reqBody)
      .subscribe(
        val => {
          if (val['code'] === 200) {
            comp.postOk(val, flag, distinguish);
          } else {
            comp.postOther(val, flag, distinguish);
          }
        },
        error => {
          comp.postErr(error, flag, distinguish);
        }
      );
  }
  constructor(private httpClient: HttpClient) { }

}
