'use strict';
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  app.get('/api/convert',(req,res)=>{
    const input = req.query.input;
    const unit = input.match(/(?<![a-zA-Z])(mi|km|l|gal|kg|lbs)$/gi);
    const isUnitInvalid = unit===null;
    // /0
    let number = input.match(/^((\.?\d+(\.\d+)?(\/\d+(\.\d+)?)?)|(\d\.))(?=[a-zA-z])/g);
    if(unit && unit[0]===input) number = ['1'];
    let isNumberInvalid = number === null;
    if(number) isNumberInvalid = number[0].slice(-2) === '/0';
    if(isNumberInvalid && isUnitInvalid){
      return res.send('invalid number and unit');
      
    } else if(isNumberInvalid){
      return res.send('invalid number');
      
    }else if(isUnitInvalid){
      return res.send('invalid unit');
      
    }
    let convertHandler = new ConvertHandler(input);
    res.json(convertHandler);
  });
};
