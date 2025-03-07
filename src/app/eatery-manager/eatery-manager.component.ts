import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EateryManagerService } from '../services/eatery-manager.service';
import { EateryManagerViewModel } from '../model/eatery-manager'

@Component({
  selector: 'app-eatery-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eatery-manager.component.html',
  styleUrls: ['./eatery-manager.component.css']
})
export class EateryManagerComponent implements OnInit {
  managerViewModel: EateryManagerViewModel | undefined;

  constructor(private route: ActivatedRoute,
    private eateryManagerService: EateryManagerService) { }

  ngOnInit(): void {
    const managerIdFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    this.eateryManagerService?.getManager(managerIdFromRoute).subscribe(manager => {
      this.managerViewModel = manager;
    });
  }
}
