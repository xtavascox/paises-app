import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaisService} from "../../services/pais.service";
import {switchMap, tap} from "rxjs";
import {Country} from "../../interfaces/pais.interface";
import {log} from "util";

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: []
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly paisService: PaisService) {
  }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.searchByCode(id)),
        tap(console.log)
      )
      .subscribe({
        next: (pais) => this.pais = pais[0],
        error: (err) => console.log(err)
      })


    // this.activatedRoute.params.subscribe({
    //   next: ({id}) => {
    //     console.log(id);
    //     this.paisService.searchByCode(id).subscribe({
    //       next: (pais) => {
    //         console.log(pais)
    //       }
    //     })
    //   }
    // });

  }

}
