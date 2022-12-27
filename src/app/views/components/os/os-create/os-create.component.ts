import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent {

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''

  }

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private OsService: OsService,
    private router: Router
  ){

  }

  ngOnInit(): void{
    this.listarTecnicos();
    this.listarClientes();
  }

  listarTecnicos(): void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  create(): void{
    this.OsService.create(this.os).subscribe(resposta=> {
      this.OsService.message("Ordem de serviço criada com sucesso!"),
      this.router.navigate(['os'])
    })
  }

  cancel(): void{
    this.router.navigate(['os'])
  }

}
