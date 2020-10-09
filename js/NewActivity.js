


var index = 1;





function EnterForecast()
{
  // Perform some validation (ie fields filled in and start year is number) !!!!

  
  // Get Activity Name:
  var_activity = document.getElementById('customer').value 
  var_activity = var_activity + " " + document.getElementById('activity').value 
  var_activity = var_activity + " " + document.getElementById('category').value 
  var_activity =var_activity + " " + document.getElementById('subcategory').value 
  document.getElementById("ActivityName").value = var_activity
  document.getElementById("ActivityName").style.backgroundColor = "lightgray";

  // Create year headers based on start year
  start_yr = document.getElementById("start_year").value

  start_yr = parseInt(start_yr)
  y1 = start_yr + 1
  y2 = start_yr + 2
  y3 = start_yr + 3
  y4 = start_yr + 4
  
  document.getElementById('year0').value = start_yr
  document.getElementById('year1').value =  y1
  document.getElementById('year2').value =  y2
  document.getElementById('year3').value =  y3
  document.getElementById('year4').value =  y4

  document.getElementById('year0').style.border = 0;
  document.getElementById('year1').style.border = 0;
  document.getElementById('year2').style.border = 0;
  document.getElementById('year3').style.border = 0;
  document.getElementById('year4').style.border = 0;


  // Display the Forecast Form;
  document.getElementById('ForecastForm').style.display = ''; // Display the Forecast Form

  // Make top form read only 

  document.getElementById("customer").readOnly = true;
  document.getElementById("activity").readOnly = true;
  document.getElementById("category").readOnly = true;
  document.getElementById("subcategory").readOnly = true;
  document.getElementById("start_year").readOnly = true;

  
  document.getElementById("customer").style.backgroundColor = "lightgray ";
  document.getElementById("activity").style.backgroundColor = "lightgray ";
  document.getElementById("category").style.backgroundColor = "lightgray ";
  document.getElementById("subcategory").style.backgroundColor = "lightgray ";
  document.getElementById("start_year").style.backgroundColor = "lightgray ";
}

function insertRow(mytable){
  var_activity = document.getElementById('customer').value 
  var_activity = var_activity + " " + document.getElementById('activity').value 
  var_activity = var_activity + " " + document.getElementById('category').value 
  var_activity =var_activity + " " + document.getElementById('subcategory').value 

  var table = document.getElementById( mytable ),
      row = table.insertRow(table.rows.length),
      cell1 = row.insertCell(0),
      cell2 = row.insertCell(1);
      cell3 = row.insertCell(2);
      cell4 = row.insertCell(3),
      cell5 = row.insertCell(4);
      cell6 = row.insertCell(5);
      cell7 = row.insertCell(6)
      
    
    
  
      var t1=document.createElement("textarea");
          t1.id = "ActivityName"+index;
          t1.value = var_activity
          t1.setAttribute('readonly', "true");
          t1.setAttribute('name', "name"+index);
          t1.setAttribute('rows', 3);
          t1.setAttribute('cols', 35);
          t1.setAttribute('wrap', "soft");
          t1.style.backgroundColor = "lightgray";
          
          cell1.appendChild(t1);
          // cell1.style.backgroundColor =  "lightgray";
  
  
  
  
  // Add in Cost Centre Selection:
  cell2.innerHTML = '<td><input list="costcentres" name="costcentre" id="costcentre"><datalist id="costcentres"><option value="COE AMS"><option value="COE Net Eng"><option value="COE Gen Eng"><option value="COE C&E"></datalist></td>';

  // Add in Each Year:
  cell3.innerHTML = '<td><input type="number" id="start_year_' +index+  '"max = 2099 style="width: 7em"  ></td>';
  cell4.innerHTML = '<td><input type="number" id="start_year_' +index+ '"max = 2099 style="width: 7em"  ></td>'; 
  cell5.innerHTML = '<td><input type="number" id="start_year_' +index+ '"max = 2099 style="width: 7em"  ></td>'; 
  cell6.innerHTML = '<td><input type="number" id="start_year_' +index+ '"max = 2099 style="width: 7em"  ></td>'; 
  cell7.innerHTML = '<td><input type="number" id="start_year_' +index+ '"max = 2099 style="width: 7em"  ></td>';

  index += 1;
}


function pushtoDB(mytable){
  let foo = prompt('Hello Jennings_J, please Enter Scenerio Name, below and confirm');
  console.log(foo);

  // Loop through grabbing everything:
  // var myRows = [];
  // var $headers = $("th");
  // var $rows = $("tbody tr").each(function(index) {
  //   $cells = $(this).find("td");
  //   myRows[index] = {};
  //   $cells.each(function(cellIndex) {
  //     myRows[index][$($headers[cellIndex]).html()] = $(this).html();
  //   });    
  // });
  
  // // Let's put this in the object like you want and convert to JSON (Note: jQuery will also do this for you on the Ajax request)
  // var myObj = {};
  // myObj.myrows = myRows;
  // alert(JSON.stringify(myObj));​
  
  // Check the Table and where Null insert 0 
  // if all null then drop row, ()



}

// Create JSON Object for API call to the Database: https://stackoverflow.com/questions/9927126/how-to-convert-the-following-table-to-json-with-javascript/9927335
// Loop through grabbing everything:
// var myRows = [];
// var $headers = $("th");
// var $rows = $("tbody tr").each(function(index) {
//   $cells = $(this).find("td");
//   myRows[index] = {};
//   $cells.each(function(cellIndex) {
//     myRows[index][$($headers[cellIndex]).html()] = $(this).html();
//   });    
// });

// // Let's put this in the object like you want and convert to JSON (Note: jQuery will also do this for you on the Ajax request)
// var myObj = {};
// myObj.myrows = myRows;
// alert(JSON.stringify(myObj));​