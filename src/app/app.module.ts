import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ChartsComponent } from './charts/charts.component';
import { BarchartComponent } from './barchart/barchart.component';
import { BubblechartComponent } from './bubblechart/bubblechart.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NodeApiService } from './nodeApi/node-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ChartsComponent,
    BarchartComponent,
    BubblechartComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [NodeApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
