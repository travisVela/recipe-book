import { Injectable } from '@angular/core';
import { Guitar} from './guitar.model';
import { Subject } from 'rxjs';

@Injectable()
export class GuitarsService {
    guitarsChanged = new Subject<Guitar[]>();
    private guitars: Guitar[] = [];

    constructor() {}

    getGuitars() {
        return this.guitars.slice();
    }

    addGuitar(guitar: Guitar) {
        this.guitars.push(guitar);
        this.guitarsChanged.next(this.guitars.slice());
    }
}
