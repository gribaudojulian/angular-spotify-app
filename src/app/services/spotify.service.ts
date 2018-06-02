import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  private token: string = '';
  private clientId: string = '40415a8ea93549ab859d0903e2b0770c';
  private clientSectet: string = '7001d88ea8e14cd5bfaddb999ef0b27f';
  artistas: any[] = [];
  releases: any[] = [];

  constructor( public http:HttpClient) {
    console.log('Servicio spotify listo');
    
  }
  
  getNewTokken(){
    let url = 'https://spotify-get-token.herokuapp.com/spotify/'+this.clientId+'/'+this.clientSectet;
    return this.http.get(url).toPromise().then((data:any) => {
      return this.token = data.token_type+' '+data.access_token;
    });
  }

  getNewReleases(){
    let url = 'https://api.spotify.com/v1/browse/new-releases?limit=20';
    let headers = new HttpHeaders({
      'authorization': this.token
    });
    return this.http.get(url, { headers } ).map((data:any)=>{
      return this.releases = data.albums.items;
    });
  }

  getArtists(term: string){
    let url = 'https://api.spotify.com/v1/search?query='+term+'&type=artist&offset=0&limit=20';
    let headers = new HttpHeaders({
      'authorization': this.token
    });
    return this.http.get(url, { headers } ).map(( data:any )=>{
      this.artistas = data.artists.items;
      return this.artistas;
    });
  }

  getArtist(id: string){
    let url = 'https://api.spotify.com/v1/artists/'+id;
    let headers = new HttpHeaders({
      'authorization': this.token
    });
    return this.http.get(url, { headers } ).map(( data:any )=>{
      return data;
    });
  }

  getTopTracks(id: string){
    let url = 'https://api.spotify.com/v1/artists/'+id+'/top-tracks?country=ar';
    let headers = new HttpHeaders({
      'authorization': this.token
    });
    return this.http.get(url, { headers } ).map(( data:any )=>{
      return data.tracks;
    });
  }
}
