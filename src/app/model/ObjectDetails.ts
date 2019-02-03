export class ObjDetails {
    Name: string;
    Object: string;

    static ConvertObject(object: any): string {
        return JSON.stringify(object);
    }

}
