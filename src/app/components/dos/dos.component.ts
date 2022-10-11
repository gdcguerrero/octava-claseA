import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public pokemon$!: Observable<any>
  public pokename : string = 'giratina-altered'

  constructor(private api: ApiService) {
    this.pokemon$ = api.searchPokemon(this.pokename).pipe(
      tap(
        console.log
      )
    )
  }

  ngOnInit(): void {
  }

  onInput(){
    this.pokemon$ = this.api.searchPokemon(this.pokename)
  }

}
