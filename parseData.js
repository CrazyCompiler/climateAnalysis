var fs = require("fs");
var papa = require("papaparse");
var _ = require("lodash");

var data = fs.readFileSync("./bangaloreClimate.csv","UTF-8");
var parsedData = papa.parse(data)

var extractData = function(data){
    var d = data.join(",").split(',,');
    return d.map(function(data){
        return data.split(",");
    })
}

var splitedData = parsedData.data.map(extractData);
var slicedData = splitedData.slice(2,splitedData.length-1);

var getMonthMaxMin = function () {
    var monthMin = [];
    var sum = 0;

    _.forEach(slicedData,function (element,index) {
        monthData = +element[1][11];
        sum += monthData;
        if((index+1)%10==0){
            monthMin.push(sum/10);
            sum = 0
        }
    });
    return monthMin
};

var getDecadeAverage = function(data){
    var decadeData = [];
    var sum = 0;

    _.forEach(data,function (element,index) {
        sum += element;
        if((index+1)%10==0){
            decadeData.push(sum/10);
            sum = 0
        }
    });
    return decadeData
}

var getTemperatureDiff = function () {
    var tempDiff = [];
    var sum = 0;

    _.forEach(slicedData,function (element,index) {
        var max = +element[0][12];
        var min = +element[1][11];
        var diff = max - min;
        tempDiff.push(diff)
    });
    return getDecadeAverage(tempDiff);
};


console.log(getTemperatureDiff());




