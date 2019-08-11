// 创建表的初始数据
const diffTable = require("./models/difftable");

// 创建difftable表的基础数据
diffTable
  .create({
    key: "1",
    name: "zh",
    age: "27",
    address: "33333"
  })
  .then(function(p) {
    console.log("created. " + JSON.stringify(p));
  })
  .catch(function(err) {
    console.log("failed: " + err);
  });
