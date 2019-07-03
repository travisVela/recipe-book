import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test', 'This is a test', 'https://www.wellplated.com/wp-content/uploads/2017/12/Hoppin-John-recipe-600x629.jpg'),
    new Recipe('Another Test', 'This is a test', 'https://www.wellplated.com/wp-content/uploads/2017/12/Hoppin-John-recipe-600x629.jpg')];
  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
