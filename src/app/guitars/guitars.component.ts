import { Component, OnInit } from '@angular/core';
import { GuitarsService } from './guitars.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-guitars',
    templateUrl: './guitars.component.html',
    styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
    id: number;
    guitarForm: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private guitarsService: GuitarsService,
        private router: Router,
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit() {
        this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.initForm();
        }
      );
    }

    onAddGuitar() {
        this.guitarsService.addGuitar(this.guitarForm.value);
        this.onCancel();
    }

    onSaveGuitars() {
        this.dataStorageService.storeGuitars();
      }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    private initForm() {
    let guitarName = '';
    let guitarMake = '';
    let guitarModel = '';
    let guitarYear = '';

    this.guitarForm = new FormGroup({
        name: new FormControl(guitarName, Validators.required),
        make: new FormControl(guitarMake, Validators.required),
        model: new FormControl(guitarModel, Validators.required),
        year: new FormControl(guitarYear, Validators.required)
    });
    }
}
