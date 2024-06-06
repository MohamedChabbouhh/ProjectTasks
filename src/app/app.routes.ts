import { Routes } from '@angular/router';
import {ProjectsComponent} from "./components/projects/projects.component";
import {TasksComponent} from "./components/tasks/tasks.component";

export const routes: Routes = [


  { path : '' , pathMatch:"full", redirectTo:'projects' },
  { path : 'projects' , component:ProjectsComponent ,data: { animation: 'ProjectsPage' }},
  { path : 'tasks' , component:TasksComponent , data: {animation: 'TasksPage' }},

];
