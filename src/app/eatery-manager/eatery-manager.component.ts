import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importiere CommonModule
import { ApiService } from '../services/api.service';
import { EateryManager } from './eatery-manager';

@Component({
  selector: 'app-eatery-manager',
  standalone: true, // Falls es eine Standalone-Komponente ist
  imports: [CommonModule], // Importiere das CommonModule hier
  templateUrl: './eatery-manager.component.html',
  styleUrls: ['./eatery-manager.component.css']
})
export class EateryManagerComponent implements OnInit {
  manager = {
    id: 1,
    firstName: 'Anna',
    lastName: 'Müller',
    email: 'anna.mueller@test.de',
    phoneNumber: '030 987 654 321',
    jobTitle: 'Restaurant Manager',
    workSchedules: ['Monday 9 AM - 5 PM', 'Tuesday 10 AM - 6 PM']
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Später API-Aufruf einfügen
    const managerId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Manager ID:', managerId);
  }
}
