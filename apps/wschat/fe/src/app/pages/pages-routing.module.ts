import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ParamsPageComponent } from './params-page/params-page.component';

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: 'params', component: ParamsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
