import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'; 
import { Topic } from '../Topic';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl: string = environment.apiRootUrl + '/api/Topic';

  constructor(private httpClient: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.apiUrl);
  }
}
