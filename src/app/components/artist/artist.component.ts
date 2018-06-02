import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  id: string = '';
  artist:any[] = [];
  topTracks:any[] = [];
  loading:boolean=false;

  constructor(private activatedRoute: ActivatedRoute, private spotify: SpotifyService) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.id= params['id'];
      this.getArtista();
      
    });
  }

  getArtista(){
    this.loading=true;
    this.spotify.getArtist(this.id).subscribe(artist=>{
      this.artist = artist;
      //console.log(artist);
      this.getTopTracks();
      this.loading=false;
    }, error =>{
      if(error.status >= 400){
        this.getNewToken();
      }
    });
  }

  getNewToken() {
    this.spotify.getNewTokken().then(() => {
      this.getArtista();
    });
  }

  getTopTracks(){
    this.loading=true;
    this.spotify.getTopTracks(this.id).subscribe(topTracks=>{
      this.topTracks = topTracks;
      console.log(topTracks);
      this.loading=false;
    });
  }
  

}
