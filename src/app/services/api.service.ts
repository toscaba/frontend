import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConnectionService {

  private backendState = new BehaviorSubject<boolean>(true);
  currentState = this.backendState.asObservable();

  constructor() { }

  updateState(isBackendUp: boolean) { 
    console.log('updating connection state');
    this.backendState.next(isBackendUp);
   } 
}