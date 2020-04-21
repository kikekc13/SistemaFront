import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { Cliente } from '../../../models/Cliente';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes;
  public filtro;
  public url;
  public p;
  public filtroText;

  constructor(
    private _clienteService: ClienteService,
  ) {
  this.url = GLOBAL.url;
   }

  ngOnInit() {
    this._clienteService.get_clientes().subscribe(
      response=>{
        this.clientes = response.clientes;
        
      },
      error=>{

      }
    )
  }
  search(searchForm){
    this._clienteService.get_cliente(searchForm.value.filtro).subscribe(
      response =>{
        console.log(searchForm.value.filtro);
      this.clientes = response.clientes;
      },
      error =>{

      }
    )
    
  }

  eliminar(id){
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        )

        this._clienteService.delete_cliente(id).subscribe(
          resposen=>{
            this._clienteService.get_clientes().subscribe(
              response=>{
                this.clientes = response.clientes;
              },
              error=>{

              }
            );
          },
          erro=>{

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Solicitud cancelada',
          'error'
        )
      }
    })
  }

}
