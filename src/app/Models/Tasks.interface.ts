import {ProjectInterface} from "./Project.interface";

export interface TasksInterface{
  id : number | null ,
  Name : string ,
  projet : ProjectInterface
}
