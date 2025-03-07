import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, interval, Observable } from 'rxjs';

// Beispiel-Datenmodelle (passt sie je nach Bedarf an)
export interface EateryManager {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  eateryId: number;
  jobTitle: string;
  workSchedules?: BusinessDayTime[];
}

export interface BusinessDayTime {
  day: string;
  startTime: string;
  endTime: string;
}

export interface ManagerRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  eateryId: number;
  jobTitle: string;
  workSchedules?: BusinessDayTime[];
}

const eateryManagerUrl: string = 'http://localhost:8080/api/managers'; // Basis-URL für das Backend

@Injectable({ providedIn: 'root' })
export class EateryManagerService {
  constructor(private http: HttpClient) { }

  // Get all managers
  getManagers() {
    return this.http.get<EateryManager[]>(`${eateryManagerUrl}managers`);
  }

  // Get manager by ID
  getManager(id: number) {
    return this.http.get<EateryManager>(`${eateryManagerUrl}managers/${id}`);
  }

  // Create new manager
  createManager(managerRequest: ManagerRequest): Observable<EateryManager> {
    return this.http.post<EateryManager>(`${eateryManagerUrl}`, managerRequest);
  }

  // Update existing manager
  updateManager(id: number, managerRequest: ManagerRequest): Observable<EateryManager> {
    return this.http.put<EateryManager>(`${eateryManagerUrl}/${id}`, managerRequest);
  }

  // Delete manager
  deleteManager(id: number): Observable<void> {
    return this.http.delete<void>(`${eateryManagerUrl}/${id}`);
  }

  // Login
  login(username: string, password: string): Observable<EateryManager> {
    return this.http.get<EateryManager>(`${eateryManagerUrl}/login`, { params: { 'username': username, 'password': password } });
  }  
}
