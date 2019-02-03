export class ObjDetails {
    Name: string;
    Object: string;

  static ConvertObject(obj: any): string {
    if (obj) {
        return JSON.stringify(obj);
    }
    return '';
}
}

