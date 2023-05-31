import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { libro } from 'src/app/models/libro'; // Importa el modelo 'libro'
import { LibroService } from 'src/app/services/libro.service';
import Swal from 'sweetalert2'; // Importa la biblioteca SweetAlert2

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.scss']
})
export class CrearLibroComponent {
  libroForm: FormGroup; // Formulario del libro
  titulo = 'Crear libro';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _libroService: LibroService,
    private aRouter: ActivatedRoute
  ) {
    // Inicializa el formulario del libro con validaciones
    this.libroForm = this.fb.group({
      nombre: ['', Validators.required], // Campo 'nombre' requerido
      genero: ['', Validators.required], // Campo 'genero' requerido
      autor: ['', Validators.required], // Campo 'autor' requerido
      paginas: ['', Validators.required] // Campo 'paginas' requerido
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.esEditar();
  }

  registrar() {
    console.log(this.libroForm); // Imprime en la consola el formulario del libro

    console.log(this.libroForm.get('nombre')?.value); // Imprime en la consola el valor del campo 'nombre'

    // Crea un objeto 'Libro' con los valores del formulario
    const Libro: libro = {
      nombre: this.libroForm.get('nombre')?.value,
      genero: this.libroForm.get('genero')?.value,
      autor: this.libroForm.get('autor')?.value,
      paginas: this.libroForm.get('paginas')?.value,
    };

    if (this.id !== null) {
      // Editamos el libro
      this._libroService.editarLibro(this.id, Libro).subscribe(data => {
        // Muestra un SweetAlert de éxito al editar el libro
        Swal.fire({
          title: '¡Libro editado!',
          text: 'El libro se ha editado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listar-libros']); // Redirige a la página de listar libros
          }
        });
      })
    } else {
      // Agregamos el libro
      console.log(Libro); // Imprime en la consola el objeto 'Libro' creado
      this._libroService.guardarLibros(Libro).subscribe(data => {
        // Muestra un SweetAlert de éxito al registrar el libro
        Swal.fire({
          title: '¡Libro registrado!',
          text: 'El libro se ha registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listar-libros']); // Redirige a la página de listar libros
          }
        });
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar libro';
      this._libroService.obtenerLibro(this.id).subscribe(data => {
        this.libroForm.setValue({
          nombre: data.nombre,
          genero: data.genero,
          autor: data.autor,
          paginas: data.paginas,
        })
      })
    }
  }
}