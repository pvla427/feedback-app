import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { MessageRequest } from '../MessageRequest';
import { MessageResponse } from '../MessageResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl: string = environment.apiRootUrl + '/api/Message';

  constructor(private httpClient: HttpClient) { }

  sendMessage(message: MessageRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(this.apiUrl, message);
  }
}