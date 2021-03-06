import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { Location } from '@angular/common';
import { ChatService } from 'src/app/shared/chat.service';
import { InversorService } from 'src/app/shared/inversor.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-proyecto-ampliacion',
  templateUrl: './proyecto-ampliacion.component.html',
  styleUrls: ['./proyecto-ampliacion.component.css']
})
export class ProyectoAmpliacionComponent implements OnInit {

  public proyecto: Proyecto  = new Proyecto();
  public project_id: number;
  public fecha: Date;

  constructor(public route: ActivatedRoute, public _location: Location,
              private apiService: ProyectosService, public chat: ChatService,
              private router: Router, private inversor: InversorService, public usuario: UsuarioService) { }

  // Coge el valor del id del proyecto pasado por la url y devuelve toda su información
  projectsForId(id: number)
  {
    this.apiService.getProyecto(id).subscribe((data: any[]) =>
    {
          this.proyecto.project_id = data[0].project_id;
          this.proyecto = data[0];
          this.fecha = new Date(data[0].end_date);
          console.log(this.proyecto);
    }
  );
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.project_id = params.project_id;
      this.projectsForId(this.project_id);
    }
    );
   }

  getConversation(project_id: number){
    this.chat.getProjectOwner(project_id).then(res => {
        const project_owner = res['user_id'];
        this.chat.getConversationId(project_owner).then(conv_id => {
        console.log(conv_id['conversation_id']);
        this.router.navigate(['/chat'], {queryParams: {conversation_id: conv_id['conversation_id']}});
      });
    });
  }

  seguir(){
    this.inversor.postProyectosFavoritos(this.project_id).subscribe((res =>
    {
        this.router.navigate(['dashboard']);
    }));

   }

}
