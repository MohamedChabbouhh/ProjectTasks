import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectInterface} from "../Models/Project.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) {
  }
  private api ='http://localhost:8080/api/project/'

  getallpr():Observable<ProjectInterface[]>{
    return this.http.get<ProjectInterface[]>(this.api+'all');
  }

  getprById(id:number|null):Observable<ProjectInterface>{
    return this.http.get<ProjectInterface>(this.api+`${id}`)
  }

  createpr(tm:ProjectInterface):Observable<ProjectInterface>{
    return this.http.post<ProjectInterface>(this.api,tm);
  }

  delete(id:number|null){
    return this.http.delete(this.api+`${id}`)
  }

  updatepr(id:number|null,tm:ProjectInterface|undefined):Observable<ProjectInterface>{
    return this.http.put<ProjectInterface>(this.api+`${id}`,tm);
  }
}
