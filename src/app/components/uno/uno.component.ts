import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(private api: ApiService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.api.login(this.username, this.password).subscribe(
      {next: resp => {
        this.data.session$.next(
          {
            username: this.username,
            token: resp.token
          }
        )
        this.router.navigate(['search'])
      }}
    )
  }

}
