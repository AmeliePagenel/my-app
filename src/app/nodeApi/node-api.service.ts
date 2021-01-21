import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Tweet } from './../models/tweet.model';
import 'rxjs/add/operator/map';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NodeApiService {
  constructor(private http: HttpClient) {}

  //GET ALL TWEETS
  getTweets() {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Tweet[]>(API_URL + '/tweets').map((result) => result);
  }

  // GET TWEETS BY TOPIC
  getTweetsByTopic(topic: string) {
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get(API_URL + '/tweets/find/topic/' + topic)
      .map((result) => result);
  }
}
