import { Component, OnInit } from '@angular/core';
import { libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.scss']
})
export class ListarLibrosComponent implements OnInit {
  listLibros: libro[] = [];
  terminoBusqueda: string = '';

  constructor(private _libroService: LibroService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this._libroService.getLibros().subscribe(data => {
      console.log(data);
      this.listLibros = data;
    }, error => {
      console.log(error);
    });
  }

  buscarLibros() {
    if (this.terminoBusqueda.trim() !== '') {
      this._libroService.buscarLibros(this.terminoBusqueda).subscribe(data => {
        console.log(data);
        this.listLibros = data;
      }, error => {
        console.log(error);
      });
    } else {
      this.obtenerLibros();
    }
  }

  eliminarLibro(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._libroService.eliminarLibros(id).subscribe(() => {
          Swal.fire('Libro eliminado', 'El libro ha sido eliminado correctamente', 'success');
          this.obtenerLibros();
        }, error => {
          Swal.fire('Error', 'Hubo un error al eliminar el libro', 'error');
        });
      }
    });
  }
}