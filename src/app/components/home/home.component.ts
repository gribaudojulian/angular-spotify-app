import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newReleases: any[]=[];
  loading:boolean = false;

  constructor( private spotify: SpotifyService, private router: Router) { 
    
  }

  verArtista(release:any){
    let artistId = release.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }

  ngOnInit() {
    this.loading = true;
    this.getNewReleases();
  }

  getNewReleases(): void {
    this.spotify.getNewReleases().subscribe(( data:any ) =>{
      console.log(data);
      this.newReleases = data;
      this.loading=false;
    }, error =>{
      if(error.status >= 400){
        this.getNewToken();
      }
    });
  }

  getNewToken(): void {
    this.spotify.getNewTokken().then(() => {
      this.getNewReleases();
    });
  }

}
