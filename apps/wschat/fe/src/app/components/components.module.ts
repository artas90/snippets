import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NewMessageComponent } from './new-message/new-message.component';
import { UserMessageComponent } from './user-message/user-message.component';

const COMPONENTS = [
  UserMessageComponent,
  NewMessageComponent,
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ComponentsModule { }
