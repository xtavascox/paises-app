import {Component} from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`li {
    cursor: pointer;
  }`]
})
export class PorPaisComponent {
  termino: string = ''
  hayError: boolean = false;
  paises: Country[] = []
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private readonly paisService: PaisService) {
  }

  buscar(args: string) {
    this.mostrarSugerencias = false
    this.hayError = false;
    this.termino = args;
    this.paisService.searchByName(args).subscribe(
      {
        next: (resp) => {
          console.log(resp);
          this.paises = resp;
        },
        error: (err) => {
          this.hayError = true;
          console.log('Error');
          console.warn(err);
        }
      });
  }

  sugerencias(arg: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = arg;
    this.paisService.searchByName(arg).subscribe({
      next: (paises) => this.paisesSugeridos = paises.splice(0, 5),
      error: () => this.paisesSugeridos = []
    })
  }

  buscarSugerido() {
    this.buscar(this.termino);
  }
}
