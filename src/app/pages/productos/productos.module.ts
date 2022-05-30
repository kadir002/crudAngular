import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@NgModule({
  declarations: [
    ProductosComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
   
  ],
})
export class ProductosModule { }
