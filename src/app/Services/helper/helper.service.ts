
export class HelperService {

  // return function details from string ex: method()
  static getMethodName(functionInfo: string) {
    if (functionInfo) {
      // check parameter contain (
      const rightBracketsIndex = functionInfo.indexOf('(');
      const leftBracketsIndex = functionInfo.indexOf(')');
      if (rightBracketsIndex !== -1) {
        // tslint:disable-next-line:prefer-const
        let funcDetails: FunctionDetails = <FunctionDetails>{};
        // get function name from string
        const funName = functionInfo.substring(0, rightBracketsIndex);
        funcDetails.Name = funName;
        // get method parameters
        const parametersString = functionInfo.substring(rightBracketsIndex + 1, leftBracketsIndex);
        if (parametersString) {
          funcDetails.hasParamaters = true;
          funcDetails.Parameters = parametersString.split(',');
        }
        return funcDetails;
      } else { // the parameters has no brackets (notValid)
        return null;
      }
    }
    // Empty Parameters
    return null;
  }
}


export class FunctionDetails {
  Name: string;
  hasParamaters: boolean;
  Parameters?: string[];
}
