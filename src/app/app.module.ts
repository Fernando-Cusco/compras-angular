import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreComponentsModule } from './core/components/core-components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { GlobalErrorHandler } from './core/error-handlers/error-handler';
import { ServerErrorInterceptor } from './core/error-handlers/server-error-interceptor';
import { RolesDirective } from './core/directives/roles.directive';


@NgModule({
  declarations: [
    AppComponent,
    RolesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreComponentsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [RolesDirective]
})
export class AppModule { }
