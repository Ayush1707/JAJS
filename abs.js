Papa = require('papaparse');

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

var dataset = {};    

    Papa.parse("https://github.com/Ayush1707/JAJS/blob/master/data.csv", {
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        dataset = results.data;
      }
    });

console.log(dataset);  