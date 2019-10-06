import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Guitar } from '../guitar.model';
import { Subscription } from 'rxjs';
import { GuitarsService } from '../guitars.service';
import { Router, ActivatedRoute } from '@angular/router';

// for chips autocomplete
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
    selector: 'app-guitar-list',
    templateUrl: './guitar-list.component.html'
})

export class GuitarListComponent implements OnInit, OnDestroy {
    guitars: any[] = [];
    subscription: Subscription;

    // for chips autocomplete
    visisble = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    seperatorKeyCodes: number[] = [ENTER, COMMA];
    guitarControl = new FormControl();
    filteredGuitars: Observable<string[]>;
    allGuitars: any = [];

    @ViewChild('guitarInput', {static: false}) guitarInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutoComplete: MatAutocomplete;

    constructor(
        private guitarService: GuitarsService,
        private router: Router,
        private route: ActivatedRoute,

    ) {
        this.filteredGuitars = this.guitarControl.valueChanges.pipe(
            startWith(null),
            map((guitar: string | null) => guitar ? this._filter(guitar) : this.guitars.slice())
        );
    }

    add(event: MatChipInputEvent): void {
        if (!this.matAutoComplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) {
                this.guitars.push(value);
            }

            if (input) {
                input.value = '';
            }
            this.guitarControl.setValue(null);
        }
    }

    remove(guitar: string): void {
        const index = this.guitars.indexOf(guitar);

        if (index >= 0) {
            this.guitars.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.guitars.push(event.option.viewValue);
        this.guitarInput.nativeElement.value = '';
        this.guitarControl.setValue(null);
    }

    private _filter(value: string): Guitar[] {
        const filterValue = value;

        return this.guitars.filter(guitar => guitar.indexOf(filterValue) === 0);
    }


    ngOnInit() {
        this.guitars = this.guitarService.getGuitars();
        this.subscription = this.guitarService.guitarsChanged
            .subscribe(
                (guitars: Guitar[]) => {
                    this.guitars = guitars;
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
