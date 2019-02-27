
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(array: any[], Field: string, isSorted: boolean): any[] {
        if (!Array.isArray(array) || isSorted) {
            return array;
        }
        if (!isSorted) {
            array = array.sort((item1, item2) => {
                return (item1[Field] === item2[Field] ? 0 : (item1[Field] < item2[Field] ? -1 : 1));
            });
        }
        return array;
    }

}
