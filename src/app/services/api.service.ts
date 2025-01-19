import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Beispiel-Datenmodelle (passt sie je nach Bedarf an)
export interface EateryManager {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  workSchedules: string[];
}

const apiUrl: string = 'http://localhost:8080/api/'; // Basis-URL für das Backend

@Injectable({
  providedIn: 'root'
})
export class EateryManagerService {
  constructor(private http: HttpClient) { }

  // Get manager
  getManager(id: number) {
    return this.http.get<EateryManager>(`${apiUrl}managers/${id}`);
  }

  getManagers() {
    return this.http.get<EateryManager[]>(`${apiUrl}managers`);
  }
}