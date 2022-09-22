import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  track(json: string, filename: string) {
    this.http.post(`http://localhost:2020/track/${filename}`, json, { headers: { "Content-Type": "application/json" } }).subscribe(() => {
      console.log(`Uploading csv ${json} to server completed`);
    });
  }
}
