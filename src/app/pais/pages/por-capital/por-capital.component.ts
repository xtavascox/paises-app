import {Component} from '@angular/core';
import {Country} from "../../interfaces/pais.interface";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: []
})
export class PorCapitalComponent {

  termino: string = ''
  hayError: boolean = false;
  paises: Country[] = []

  constructor(private readonly paisService: PaisService) {
  }

  buscar(args: string) {
    this.hayError = false;
    this.termino = args;
    this.paisService.searchByCapital(args).subscribe(
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
    this.hayError = false;
  }

}
