import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collpased = true;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onGetRecipes() {
    this.dataStorageService.getRecipes().subscribe();
  }
}
