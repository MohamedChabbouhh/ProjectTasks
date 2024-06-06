import {Component, OnInit, signal} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {ProjectInterface} from "../../Models/Project.interface";
import {TaskService} from "../../services/task.service";
import {TasksInterface} from "../../Models/Tasks.interface";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  tasks : TasksInterface[] = [] ;
  projects : ProjectInterface[] = [] ;
  task! : TasksInterface;
  project! : ProjectInterface;
  tskform!: FormGroup;
  updated: boolean =false;

  constructor(private taskservice : TaskService , private projectService : ProjectService,
              private fb:FormBuilder , private router:Router
              ) {
  }
  ngOnInit(): void {

    this.tskform= this.fb.group({
        tname : ['',[Validators.required]],
        projet :[[Validators.required]]
      }
    );
    this.taskservice.getalltasks().subscribe(t=>{
      this.tasks = t ;
      console.log('tasks', this.tasks)
    })
    this.projectService.getallpr().subscribe(prjs=>{
      this.projects = prjs ;
    })
  }

  addtask() {

    const rq:TasksInterface = {
      id : null ,
      Name : this.tskform.getRawValue().tname ,
      projet: this.tskform.getRawValue().projet
    }
    console.log('values',this.tskform.getRawValue())
    this.taskservice.createtsk(rq).subscribe(aa=>{
      console.log('here we are');
      this.tasks.push(rq);
    });
  }
  gettsk(id: number | null) {
    this.taskservice.gettsk(id).subscribe(data2=>{
      this.task = data2 ;
      console.log('task is ',this.task);
      this.updated = true ;
    });
  }
  deletetask(id: number | null) {
    this.taskservice.deletetsk(id).subscribe(response => {
      this.tasks = this.tasks.filter(a=>a.id!==id);
      console.log(this.tasks)
      console.log('task deleted', response);
    });
  }
  update(task: TasksInterface, id: number | null) {
    console.log('id', id);
    const rq:TasksInterface = {
      id : id ,
      Name : this.tskform.getRawValue().tname||task.Name,

      projet: this.tskform.getRawValue().projet||task.projet
    }
    console.log(rq,'reqq')
    this.taskservice.updatask(rq,id).subscribe(test=>{
      console.log('testtest')
    });
    this.tasks = this.tasks.filter(a=>a.id!==id);
    this.tasks.push(rq);


  }

}
