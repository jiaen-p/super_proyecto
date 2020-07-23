import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa'
import { Sectores } from 'src/app/models/sectores.enum';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  public newEmpresa: Empresa = new Empresa();
  public newCompany_id: number
  public newUser_id: number
  public newNif:string
  public newTelefono: number
  public newCompany_name: string
  public newDireccion: string
  public newWeb_url: string
  public newDescripcion: string
  public newLogo_url: string
  public newSector: string;

  
 
  constructor(private route: ActivatedRoute, private router: Router) { }

  save(direccion: HTMLInputElement, nif: HTMLInputElement, telefono: HTMLInputElement,web_url: HTMLInputElement,descripcion: HTMLInputElement, logo_url: HTMLInputElement, company_name: HTMLInputElement, sector: HTMLInputElement){
    this.newCompany_id = null;
    this.newDireccion = direccion.value;
    this.newNif = nif.value;
    this.newTelefono = Number(telefono.value);
    this.newUser_id = null;
    this.newWeb_url = web_url.value;
    this.newDescripcion = descripcion.value;
    this.newLogo_url = logo_url.value;
    this.newCompany_name = company_name.value;
    this.newSector = sector.value;
    this.newEmpresa =  {company_id:this.newCompany_id, direccion: this.newDireccion, nif: this.newNif, telefono: this.newTelefono, user_id: this.newUser_id,web_url: this.newWeb_url, descripcion: this.newDescripcion, logo_url: this.newLogo_url, company_name: this.newCompany_name,sector: <Sectores>this.newSector}
    console.log(this.newEmpresa);

    // redireccion a login

    this.router.navigate(['/login'])
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(query => {
      console.log(query.bussness_info)
    })
  }

}
