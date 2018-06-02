import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  search:string = '';
  artistas:any[] = [];
  loading:boolean = false;

  constructor(public spotify: SpotifyService, private router: Router) { 
    
  }

  verArtista(artist:any){
    console.log(artist);
    let artistId = artist.id;
    this.router.navigate(['/artist', artistId]);
  }

  buscarArtista(){
    if(this.search.length == 0){
      return;
    }
    console.log(this.search);

    this.loading=true;
    this.spotify.getArtists(this.search).subscribe(data => {
      console.log(data);
      
      this.artistas = data;
      this.loading=false;
    }, error =>{
      if(error.status >= 400){
        this.getNewToken();
      }
    });
  }

  getNewToken(): void {
    this.spotify.getNewTokken().then(() => {
      this.buscarArtista();
    });
  }

}
