export class Guitar {
    public name: string;
    public make: string;
    public model: string;
    public year: string;

    constructor(
        name: string,
        make: string,
        model: string,
        year: string
    ) {
        this.name = name;
        this.make = make;
        this.model = model;
        this.year = year;
    }
}