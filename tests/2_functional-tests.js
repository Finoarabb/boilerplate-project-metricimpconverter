const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  cases = [
    { input: "3.4.5xyz", expected: "Invalid number and unit" },
    { input: "xyz", expected: "Invalid number and unit" },
    { input: "3.4.5mi", expected: "Invalid number" },
    { input: "3..45mi", expected: "Invalid number" },
    { input: "3./45mi", expected: "Invalid number" },
    { input: "3/0mi", expected: "Invalid number" },
    { input: "3/mi", expected: "Invalid number" },
    { input: "3.4mil", expected: "Invalid unit" },
    {
      input: "3.4mi",
      expected: {
        initNum: 3.4,
        initUnit: "mi",
        returnNum: 5.47176,
        returnUnit: "km",
        string: "3.4 miles converts to 5.47176 kilometers",
      },
    },
  ];

  cases.forEach(({ input, expected }) => {
    test(`Input: ${input}`, (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({input})
        .end((err, res) => {
           if (typeof expected === "string") {
            chai.expect(res.text).to.equal(expected);
          } else {
            chai.expect(res.body).to.deep.equal(expected);
          }
        });
        done();
    });
  });
});
