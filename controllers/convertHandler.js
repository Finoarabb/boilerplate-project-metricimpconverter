function ConvertHandler(input) {
  this.getNum = function (input) {
    let result;
    if (["gal", "l", "lbs", "kg", "mi", "km"].includes(input.toLowerCase()))
      return 1;
    result = input.match(
      /^((\.?\d+(\.\d+)?(\/\d+(\.\d+)?)?)|(\d\.))(?=[a-zA-z])/g
    )[0];
    if (result.includes("/")) {
      result = result.split("/");
      result =
        Number.parseFloat(result[0]) / Number.parseFloat(result[1]).toFixed(5);
      return result;
    }
    return Number.parseFloat(result);
  };
  this.getUnit = function (input) {
    let result;
    result = input.match(/(mi|km|l|gal|kg|lbs)$/gi)[0];
    if (result === "l") result = result.toUpperCase();
    else if (result != "L") result = result.toLowerCase();
    return result;
  };
  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      default:
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        break;
    }
    return Number.parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  if (!input) return;
  const initNum = this.getNum(input);
  const initUnit = this.getUnit(input);
  const returnNum = this.convert(initNum, initUnit);
  const returnUnit = this.getReturnUnit(initUnit);
  const string = this.getString(initNum, initUnit, returnNum, returnUnit);

  return { initNum, initUnit, returnNum, returnUnit, string };
}

module.exports = ConvertHandler;
