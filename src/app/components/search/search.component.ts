import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  search:string = '';
  public artistas:any[] = [];

  constructor(public _spotify: SpotifyService) { 
    
  }

  buscarArtista(){
    if(this.search.length == 0){
      return;
    }
    console.log(this.search+'xxx');

    this._spotify.getArtists(this.search).subscribe(function(data){
      console.log(data);
      
      this.artistas = data;
    });
  }

}
