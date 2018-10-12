import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import zh from '@angular/common/locales/zh';
import {Observable, of} from 'rxjs'
import {HomeComponent} from './home/home.component';
import {HomeserveService} from "./home/homeserve.service";
import { Process1Component } from "./process1/process1.component";
import{Process1serveService} from "./process1/process1serve.service";
import { PrintComponent } from './print/print.component';
import {PrintserveService} from "./print/printserve.service";
import { QRCodeModule } from 'angular2-qrcode';
import { NewwalletComponent } from './newwallet/newwallet.component';
import {NewwalletserveService} from "./newwallet/newwalletserve.service";
registerLocaleData(zh);
// import {Keyth}
const routes: Routes = [
  {path: '', redirectTo: '/process', pathMatch: 'full'},
  // { path: '**',component: Process1Component },
  {path: 'home', component: HomeComponent},
  {path: 'process', component: Process1Component},
  {path: 'print', component: PrintComponent},
  {path: 'wallet', component: NewwalletComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Process1Component,
    PrintComponent,
    NewwalletComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routes),
    NgZorroAntdModule,
    QRCodeModule
  ],
  providers: [NewwalletserveService,HomeserveService,Process1serveService,PrintserveService, {provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
