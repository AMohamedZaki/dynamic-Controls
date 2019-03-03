

export interface IPatient {
    firstName: string;
    lastName: string;
    Id?: number;
    Country: { key: string, value: string };
    City: { key: string, value: string };
    PatientSub: { paragraph: string };
}
