

export class Patient {
    FirstName: string;
    LastName: string;
    Id?: number;
    Country: { Name: string, Id: number }[];
    City: { Name: string, Id: number, CountryId: number }[];
}
