import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import {ListarLibrosComponent} from './components/listar-libros/listar-libros.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
// import { EditarLibroComponent } from './components/editar-libro/editar-libro.component';

const routes: Routes = [
  {path: '', component: ListarLibrosComponent},
  {path: 'crear-libro', component: CrearLibroComponent },
  {path: 'editar-libro/:id', component: CrearLibroComponent},

  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
