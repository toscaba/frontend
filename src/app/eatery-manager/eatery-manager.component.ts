import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importiere CommonModule
import { EateryManagerService } from '../services/api.service';
import { EateryManager } from '../model/eatery-manager'

@Component({
  selector: 'app-eatery-manager',
  standalone: true, // Falls es eine Standalone-Komponente ist
  imports: [CommonModule], // Importiere das CommonModule hier
  templateUrl: './eatery-manager.component.html',
  styleUrls: ['./eatery-manager.component.css']
})
export class EateryManagerComponent implements OnInit {
  manager: EateryManager | undefined;

  constructor(private route: ActivatedRoute,
    private eateryManagerService: EateryManagerService) { }

  ngOnInit(): void {
    const managerId = Number(this.route.snapshot.paramMap.get('id'));
    this.eateryManagerService.getManager(managerId).subscribe(manager => {
      this.manager = manager;
    });
  }
}
