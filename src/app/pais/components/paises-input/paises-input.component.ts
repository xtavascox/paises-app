import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-paises-input',
  templateUrl: './paises-input.component.html',
  styles: []
})
export class PaisesInputComponent implements OnInit {

  termino: string = '';

  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject<string>();


  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(valor => {
        console.log('debouncer: ', valor)
        this.onDebounce.emit(valor)
      })
  }


  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any) {
    this.debouncer.next(this.termino);

  }


}
