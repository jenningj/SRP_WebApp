
var ScenerioName = '';
var StartYear = '';
var DialType = '';

var UserID = '';
var Sessiondt = '';


$(document).ready(function () {
  let worksheet;
  const wsName = 'Activity';    // This is the sheet we'll use for updating task info

  function onSelectionChanged (marksEvent) {
    const sheetName = marksEvent.worksheet.name;
    marksEvent.getMarksAsync().then(function (selectedMarks) {
      handleSelectedMarks(selectedMarks, sheetName, true);
    });
  }

  function handleSelectedMarks (selectedMarks, sheetName, forceChangeSheet) {
    // If we've got selected marks then process them and show our update button

    console.log(selectedMarks);

    if (selectedMarks.data[0].totalRowCount > 0) {
      populateTable(selectedMarks.data[0]);
      $('#updateItem').show();
    } else {
      resetTable();
      $('#updateItem').hide();
    }
  }

  tableau.extensions.initializeAsync().then(function () {
    // Initialization succeeded! Get the dashboard's name & log to console
    let dashboard;
    dashboard = tableau.extensions.dashboardContent.dashboard;

    for (const ws of dashboard.worksheets) {
      if (ws.name === wsName) {
        worksheet = ws;
      }
    }

    // Get metadata (USER ID & Datetime)
    get_metadata()

    // Add in get parameters:
    tableau.extensions.dashboardContent.dashboard.getParametersAsync().then(function (parameters) {
      parameters.forEach(function (p) {
        // p.addEventListener(tableau.TableauEventType.ParameterChanged, onParameterChange);
        get_parameter(p);
      });
    });

    // Add mark selection event listener to our sheet
    worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, onSelectionChanged);

    console.log('"Extension Initialized. Running in dashboard named ' + dashboard.name);
    console.log('Sheet info: ' + worksheet.name);
  }, function (err) {
    // something went wrong in initialization
    console.log('Error while Initializing: ' + err.toString());
  });

  function resetTable () {
    $('#data_table tr').remove();
    var headerRow = $('<tr/>');
    headerRow.append('<th>Select a project to update</th>');

    $('#data_table').append(headerRow);
  }

  function populateTable (dt) {


    y1 = parseInt(StartYear)+1;
    y2 = parseInt(StartYear)+2;
    y3 = parseInt(StartYear)+3;
    y4 = parseInt(StartYear)+4;

    $('#data_table tr').remove();
    var headerRow = $('<tr/>');
    headerRow.append('<th>Activity</th>');
    headerRow.append('<th>' + StartYear + '</th>');
    headerRow.append('<th>' + y1 + '</th>');
    headerRow.append('<th>' + y2 + '</th>');
    headerRow.append('<th>' + y3 + '</th>');
    headerRow.append('<th>' + y4 + '</th>');
    headerRow.append('<th>Comment</th>');
    
    $('#data_table').append(headerRow);

    let ActivityIndex, rowIDIndex, FTEIndex, USERIndex, DateTimeIndex;

    // get our column indexes
    //stock and ordered seem to be flipped for some reason in the datatable (bug?) so reversing them here.

    // console.log('Columns');
    // console.log(dt.columns);


    for (let c of dt.columns) {
      switch (c.fieldName) {
        case 'Activity':
          ActivityIndex = c.index;
          break;
        case 'AGG(RowID)':
          rowIDIndex = c.index;
        break;
        case 'Measure Values':
          FTEIndex = c.index;
        break;
        case '#User':
          USERIndex = c.index;
        break;
        case '#DateTime':
          DateTimeIndex = c.index;
        break;
        default:
          break;
      }
    }

    console.log("USERID ?? : ")
    console.log(dt.data[0][USERIndex]._formattedValue)
    
    console.log("Datetime ??:  ")
    console.log(dt.data[0][DateTimeIndex]._formattedValue)
    
    // console.log(rowIDIndex)
   
    // add our rows for the selected marks
    dt.data.forEach(function (item) {
      // console.log("Item:  ");
      // console.log(item);
      
      // console.log("Item:  ");
      // console.log(item[rowIDIndex]);

      const rowID = item[rowIDIndex]._formattedValue;
      const ActivityType = item[ActivityIndex]._formattedValue;
      const base_value = item[FTEIndex]._formattedValue;
      let dataRow = $('<tr/>');
      dataRow.append('<td>' + item[ActivityIndex]._formattedValue + '</td>');
      dataRow.append('<td><input type="number" style="width: 80px" id="' + ActivityType + '_' + StartYear  + '"/></td>');
      dataRow.append('<td><input type="number"  style="width: 80px" id="' + ActivityType + '_' + y1  + '"/></td>');
      dataRow.append('<td><input type="number"  style="width: 80px" id="' + ActivityType + '_' + y2  + '"/></td>');
      dataRow.append('<td><input type="number"  style="width: 80px" id="' + ActivityType + '_' + y3  + '"/></td>');
      dataRow.append('<td><input type="number"  style="width: 80px" id="' + ActivityType + '_' + y4  + '"/></td>');
      dataRow.append('<td><input type="text" size="25" id="' + ActivityType + '_comment"/></td>');
      dataRow.append('<td><input type="number" style="visibility:hidden;" size="0" value="' + base_value + '"id="' + ActivityType + '_baseFTE"/></td>');
      // dataRow.append('<td><input type="text" size="20" id="' + ActivityType + '_comment'" /></td>');
      
      $('#data_table').append(dataRow);
    });


  }

  $('form').submit(function (event) {
    console.log('Update Clicked');


    // console.log("This is the value of: Scenerio: " + ScenerioName);
    // console.log("This is the value of: Start Year: " + StartYear);
    // console.log("This is the value of: Dial Type: " + DialType);

    event.preventDefault();
    let formInputs = $('form#projectTasks :input[type="text"], input[type="number"]');
    let postData = [];


    console.log("form Inputs:");
    console.log(typeof formInputs);
    
    console.log(formInputs);
    // console.log

    formInputs.each(function () {
      let c = $(this);
      postData.push({id: c[0].id, 'value': c[0].value});
    });

    console.log(postData)

    // Post it
    // $.ajax({
    //   type: 'POST',
    //   url: 'http://localhost:8765',
    //   data: JSON.stringify(postData),
    //   contentType: 'application/json'
    // }).done(
    //   worksheet.getDataSourcesAsync().then(function (dataSources) {
    //     dataSources[0].refreshAsync();
    //   })
    // );

    // event.preventDefault();
  });

  // function onParameterChange (parameterChangeEvent) {
  //   parameterChangeEvent.getParameterAsync().then(function (param) {
  //     const newRow = parameterRow(param);
  //     const oldRow = $("tr[data-fieldname='" + param.id + "'");
  //     console.log('Old Row',oldRow);

  //     oldRow.replaceWith(newRow);
  //     console.log('New Row',newRow);


  //   });
  // }

    // This function creates a subtree of a row for a specific parameter.
    function get_parameter (p) {
      console.log(p.name);
      switch  (p.name){
          case 'Dial Type':
              DialType = p.currentValue.formattedValue;
              console.log(DialType);
              break;
          case 'ScenerioName':
              ScenerioName = p.currentValue.formattedValue;
              console.log(ScenerioName);
              break;
          case 'ForecastStartYear':
              StartYear = p.currentValue.formattedValue;
              console.log(StartYear);
              break;
  
      }
    };

    function get_metadata(){
      worksheet.getSummaryDataAsync().then(function (sumdata) {

        const worksheetData = sumdata;
        
         UserID = worksheetData['_data'][0][3]._formattedValue;
         Sessiondt = worksheetData['_data'][0][4]._formattedValue;

         console.log('USER is is ' + UserID);
         console.log('Session DateTime is '+ Sessiondt);

      });
    };




});
