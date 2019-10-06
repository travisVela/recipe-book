import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { GuitarsService } from '../guitars/guitars.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private guitarsService: GuitarsService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            'https://recipebook-891c9.firebaseio.com/recipes.json', recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    getRecipes() {
        return this.http.get<Recipe[]>(
            'https://recipebook-891c9.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }

    storeGuitars() {
        const guitars = this.guitarsService.getGuitars();
        this.http.put(
            'https://recipebook-891c9.firebaseio.com/recipes.json', guitars
        )
        .subscribe(res => {
            console.log('res: ' + res);
        });
    }
}
