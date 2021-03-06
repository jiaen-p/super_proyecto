import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/shared/proyectos.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { InversorService } from 'src/app/shared/inversor.service';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-proyectos-interes',
  templateUrl: './proyectos-interes.component.html',
  styleUrls: ['./proyectos-interes.component.css']
})
export class ProyectosInteresComponent implements OnInit {

  public fav: Proyecto;
  public favs: Proyecto[];
  public proyectosInteres: any[] = [];
  public favoritos: number;


  constructor(public router: Router, private apiService: ProyectosService, private usuario: UsuarioService, private inversor: InversorService, public chat: ChatService) { }

  proyectosFavoritos(){
   this.inversor.getProyectosFavoritos().subscribe((data: any[]) => {

    for (let index = 0; index <= data.length - 1; index++){

      this.favoritos = data[index].project_id;
      console.log(this.favoritos);
      this.apiService.getProyecto(this.favoritos).subscribe((data: any[]) => {

        this.proyectosInteres.push(data);

      });
    }});
   console.log(this.proyectosInteres);

  }



  // Coge el id del inversor y devuelve favoritos asociados
  /*
  Favs(id){
    this.apiService.getFav(id).subscribe((data: any[]) =>
    {
      for(let i = 0; i < data.length; i++)
      {
        console.log(this.fav = data[i]);
      }
    }
    )
  }
  */
  addInvertidos(idProyecto: number){
    this.inversor.postProyectosInvertido(idProyecto).subscribe(data => {
      this.inversor.deleteProyectosFavoritos(idProyecto).subscribe();
    });
    this.router.navigate(['/proyectos/invertidos']);
  }

  ngOnInit(): void {
    this.proyectosFavoritos();
  }

}
