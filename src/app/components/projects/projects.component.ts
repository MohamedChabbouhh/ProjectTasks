import {Component, OnInit, signal} from '@angular/core';
import {ProjectInterface} from "../../Models/Project.interface";
import {ProjectService} from "../../services/project.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{
  projectsig = signal<ProjectInterface[]>([]);
  projects : ProjectInterface[] = [] ;
  projectform!:FormGroup ;
  prjt! : ProjectInterface |undefined;
  update! : boolean  ;

  constructor(private projectService : ProjectService , private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.projectform = this.fb.group({
      nomeq :['',Validators.required],
      datecr:['',Validators.required]
    });
    this.projectService.getallpr().subscribe(data=>{
      //this.projects  = data ;
      this.projectsig.set(data);
      console.log('projects', this.projects);
    })
  }


  addpr() {
      const request:ProjectInterface ={
        id : null ,
        name: this.projectform.getRawValue().nomeq ,
        date_creation: this.projectform.getRawValue().datecr ,
        tasks :  null
      }
      this.projectService.createpr(request).subscribe(()=>{
        console.log('ok');
      })

       this.projectsig.update(items=>[...items,request])
      //this.projects.push(request);

    }

  upproject(id:number |null ) {
    const request = {
      id : id  ,
      date_creation: this.projectform.getRawValue().datecr || this.prjt?.date_creation,
      name: this.projectform.getRawValue().nomeq || this.prjt?.name,
      tasks :  null
    }
     this.projectService.updatepr(request.id,request).subscribe(()=>{
       console.log('updated')
     });
    this.projectsig.update(items=>items.map(
      item=>item.id === request.id ? request : item
    ))
    //this.projects =this.projects.filter(e=>e.id!==id);
    //this.projects.push(request);
  }

  ajout() {
    this.update = false;
    this.projectform.reset();
  }

  getprjt(id: number | null) {
    this.projectService.getprById(id).subscribe(e=>{
      this.prjt = e;
      console.log('eq: ',e);
    });
    this.update = true ;
  }

  deletepr(itemToDelete :ProjectInterface) {
    const  request = itemToDelete ;
    this.projectService.delete(itemToDelete.id).subscribe(()=>{
      console.log('deleted')
    });
    this.projectsig.update(items=>items.filter(
      item=>item.id !== itemToDelete.id
      )
    )
    //this.projects= this.projects.filter(e=>e.id!==item.id);
  }
}

