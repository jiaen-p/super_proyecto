import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../shared/empresa.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Sectores, Sector } from 'src/app/models/sectores.enum';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-publicar-proyecto',
  templateUrl: './publicar-proyecto.component.html',
  styleUrls: ['./publicar-proyecto.component.css']
})
export class PublicarProyectoComponent implements OnInit {
  public sector = Sector;
  public sectorType = [];
  public sectorName = [];
  constructor(public empresa: EmpresaService, private usuario: UsuarioService, private router: Router, public _location: Location) { }

  save( project_name: string, description: string, total_amount: number, end_date: Date, project_img_url: string, sector: string){
    let proyecto = new Proyecto();
    proyecto = {
      project_id: null,
      project_name,
      company_name: this.usuario.empresa.company_name,
      description,
      total_amount,
      remaining_amount: total_amount,
      end_date,
      project_img_url,
      sector: sector as Sectores,
      update: null,
      update_: null
    };
    console.log(proyecto);
    this.empresa.publicarProyecto(proyecto).subscribe(res => {
      this.router.navigate(['/dashboard']);
    });
  }
  ngOnInit(): void {
    this.sectorType = Object.keys(this.sector);
    this.sectorName = Object.values(this.sector);
  }
}
