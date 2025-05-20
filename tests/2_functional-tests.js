const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  cases = [
    { input: "3/7.2/4kilomegagram", expected: "invalid number and unit" },
    { input: "3/7.2/4kg", expected: "invalid number" },
    { input: "32g", expected: "invalid unit" },
    {
      input: "10L",
      expected: {
        initNum: 10,
        initUnit: "L",
        returnNum: 2.64172,
        returnUnit: "gal",
        string: "10 liters converts to 2.64172 gallons",
      },
    },
    {
      input: "kg",
      expected: {
        initNum: 1,
        initUnit: "kg",
        returnNum: 2.20462,
        returnUnit: "lbs",
        string: "1 kilograms converts to 2.20462 pounds",
      },
    },
  ];

  cases.forEach(({ input, expected }) => {
    test(`Input: ${input}`, (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input })
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
  after(function() {
  chai.request(server)
    .get('/')
});
});
