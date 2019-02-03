

export class Patient {
    FirstName?: string = this.FirstName || '';
    LastName?: string = this.LastName || '';
    Id?: number = this.Id || 0;
    Country?: { Name: string, Id: number }[] = this.Country || [];
    City?: { Name: string, Id: number, CountryId: number }[] = this.City || [];
}



export class Factory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}
