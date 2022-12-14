import {Component} from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: []
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  resultado: Country[] = [];
  isLoading: boolean = false;

  constructor(private paisService: PaisService) {
  }

  getClassButton(region: string): string {
    return (this.regionActiva === region) ? 'btn btn-info mx-1' : 'btn btn-outline-info mx-1';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;
    this.regionActiva = region;
    this.resultado = [];
    this.isLoading = true;
    this.paisService.searchByRegion(region).subscribe({
      next: (paises) => this.resultado = paises.sort((a, b) => {
          if (a.name.official > b.name.official) {
            return 1
          }
          if (a.name.official < b.name.official) {
            return -1
          }
          return 0
        }
      ),
      error: (err) => console.log(err),
      complete: () => {
        this.isLoading = false;
      }

    })

  }

}
