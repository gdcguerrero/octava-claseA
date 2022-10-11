import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnoComponent } from './components/uno/uno.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './libs/interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { DosComponent } from './components/dos/dos.component';
import { ValidatorInterceptor } from './libs/interceptors/validator.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UnoComponent,
    DosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ValidatorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
