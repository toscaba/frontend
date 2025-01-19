import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EateryManager } from '../model/eatery-manager';

@Injectable({
  providedIn: 'root',
})
export class EateryManagerService {
  private baseUrl = 'http://localhost:8080/api/eatery-managers'; // Backend-API-URL

  constructor(private http: HttpClient) {}

  /**
   * Fetches all eatery managers from the backend.
   * @returns An observable of the list of eatery managers.
   */
  getAllManagers(): Observable<EateryManager[]> {
    return this.http.get<EateryManager[]>(`${this.baseUrl}`);
  }

  /**
   * Fetches a specific eatery manager by ID.
   * @param id The ID of the eatery manager.
   * @returns An observable of the eatery manager.
   */
  getManager(id: number): Observable<EateryManager> {
    return this.http.get<EateryManager>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new eatery manager.
   * @param manager The eatery manager object to create.
   * @returns An observable of the created eatery manager.
   */
  createManager(manager: EateryManager): Observable<EateryManager> {
    return this.http.post<EateryManager>(`${this.baseUrl}`, manager);
  }

  /**
   * Updates an existing eatery manager by ID.
   * @param id The ID of the eatery manager to update.
   * @param manager The updated eatery manager data.
   * @returns An observable of the updated eatery manager.
   */
  updateManager(id: number, manager: EateryManager): Observable<EateryManager> {
    return this.http.put<EateryManager>(`${this.baseUrl}/${id}`, manager);
  }

  /**
   * Deletes an eatery manager by ID.
   * @param id The ID of the eatery manager to delete.
   * @returns An observable of the deletion response.
   */
  deleteManager(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
