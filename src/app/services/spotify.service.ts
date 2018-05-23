import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas: any[] = [];

  constructor( public http:HttpClient) {
    console.log('Servicio spotify listo');
  }
  
  getArtists(term: string){
    let url = 'https://api.spotify.com/v1/search?query='+term+'&type=artist&offset=0&limit=20';
    let headers = new HttpHeaders({
      'authorization': 'Bearer BQC3_w6ptbVO0zzTgXM_aQhujgab6t0e2zBT1Ln8MJ4Z_dhbfPXqOB_KmMeTkInKZz5hl3IT-o6dOok0cVg'
    });
    return this.http.get(url, { headers } ).map(function( data:any ){
      this.artistas = data.artists.items;
      return this.artistas;
    });
  }
}
