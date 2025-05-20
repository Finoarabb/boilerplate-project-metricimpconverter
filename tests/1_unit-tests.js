const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

suite("Unit Tests", function () {
    let handler = new ConvertHandler;
  suite("Function getNum()", () => {
    const cases = [
      { input: "32L", expected: 32 },
      { input: "3mi", expected: 3 },
      { input: ".31mi", expected: 0.31 },
      { input: "mi", expected: 1 },
      { input: "3/5mi", expected: 0.6 },
      { input: "3.3/1.1mi", expected: 2.9999999999999996 },
    ];

    cases.forEach(({ input, expected }) => {
      test(`convertHandler.getNum(${input})=>${expected}`, () => {
        assert.strictEqual(handler.getNum(input),expected);
      });
    });
  });

  suite('Function getUnit()',()=>{
    const cases = [
        {input:'gal',expected:'gal'},
        {input:'L',expected:'L'},
        {input:'Mi',expected:'mi'},
        {input:'mI',expected:'mi'},
    ]

    cases.forEach(({input,expected})=>{
        test(`convertHandler.getUnit(${input})=>${expected}`,()=>{
            assert.strictEqual(handler.getUnit(input),expected)
        })
    })
  });
  
  suite('Function convert()',()=>{
    const cases = [
       { nmbr: 32, unit:'L', expected: 8.45351 },
      { nmbr: 3, unit:'gal', expected: 11.35623 },
      { nmbr: .31, unit:'lbs', expected: 0.14061 },
      { nmbr: 1, unit:'kg', expected: 2.20462 },
      { nmbr: 0.6, unit:'km', expected: 0.37282 },
      { nmbr: 2.9999999999999996, unit:'mi', expected: 4.82802 },
    ]
    cases.forEach(({nmbr,unit,expected})=>{
        test(`convertHandler.convert(${nmbr.toString()+unit})=>${expected}`,()=>{
            assert.strictEqual(handler.convert(nmbr,unit),expected)
        })
    })
});

});
