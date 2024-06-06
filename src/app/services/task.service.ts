import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TasksInterface} from "../Models/Tasks.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http :HttpClient) { }
  api = 'http://localhost:8080/api/task/'

  getalltasks():Observable<TasksInterface[]>{
    return this.http.get<TasksInterface[]>(this.api+'all')
  }

  gettsk(id:number|null):Observable<TasksInterface>{
    return this.http.get<TasksInterface>(this.api+`${id}`);
  }

  createtsk(pl:TasksInterface):Observable<TasksInterface>{
    return this.http.post<TasksInterface>(this.api, pl);
  }

  deletetsk(id: number | null):Observable<TasksInterface[]>{
    return this.http.delete<TasksInterface[]>(this.api + `${id}`);
  }

  updatask(pl:TasksInterface,id:number|null):Observable<TasksInterface>{
    return this.http.put<TasksInterface>(this.api+`${id}`,pl)
  }
}
