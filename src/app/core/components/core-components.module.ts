import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Error403Component } from './error403/error403.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, Error403Component],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    
    
  ],
  exports: [NavbarComponent, FooterComponent, Error403Component]
})
export class CoreComponentsModule { }
