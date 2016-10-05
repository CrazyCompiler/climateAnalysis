var fs = require("fs");
var papa = require("papaparse");

var data = fs.readFileSync("./bangaloreClimate.csv","UTF-8");
var parsedData = papa.parse(data)

var extractData = function(data){
    var d = data.join(",").split(',,');
    return d.map(function(data){
        return data.split(",");
    })
}
var splitedData = parsedData.data.map(extractData);
console.log(splitedData);


