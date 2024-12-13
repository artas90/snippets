import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ParamsPageComponent } from './params-page/params-page.component';

const PAGES = [
  AboutPageComponent, ChatPageComponent, ParamsPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ComponentsModule
  ],
  declarations: [...PAGES],
  exports: [...PAGES],
})
export class PagesModule { }
