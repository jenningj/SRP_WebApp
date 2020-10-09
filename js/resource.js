
var ScenerioName = '';
var StartYear = '';
var DialType = '';
var UserID = '';
var Sessiondt = '';


$(document).ready(function () {
  let worksheet;
  const wsName = 'HCDepChange';    // This is the sheet we'll use for updating task info

  function onSelectionChanged (marksEvent) {
    const sheetName = marksEvent.worksheet.name;
    marksEvent.getMarksAsync().then(function (selectedMarks) {
      handleSelectedMarks(selectedMarks, sheetName, true);
    });
  }

  // initaliseButtons();

  function handleSelectedMarks (selectedMarks, sheetName, forceChangeSheet) {
    // If we've got selected marks then process them and show our update button

    console.log(selectedMarks);

    if (selectedMarks.data[0].totalRowCount > 0) {
      // console.log(selectedMarks.data[0]);
      populateHTML(selectedMarks.data[0]);
      // populateTable(selectedMarks.data[0]);
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

    // Add mark selection event listener to our sheet
    worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, onSelectionChanged);

    console.log('"Extension Initialized. Running in dashboard named ' + dashboard.name);
    console.log('Sheet info: ' + worksheet.name);
  }, function (err) {
    // something went wrong in initialization
    console.log('Error while Initializing: ' + err.toString());
  });

  // add Event Listener here ()

  // function initaliseButtons(){
  //   $('btn_update').click(writeback);
  // }

  function populateHTML(dt){
    console.log('Populate HTML 1');

    // console.log()
    let ActivityIndex, DepIndex, UserIndex, dateIndex, yearIndex;


    for (let c of dt.columns) {
      // console.log(c.fieldName)
      switch (c.fieldName) {
        case 'Activity1':
          ActivityIndex = c.index;
          break;
        case 'HC Dep1':
          DepIndex = c.index;
        break;
        case 'Added By':
          UserIndex = c.index;
        break;
        case 'Date Inserted':
          dateIndex = c.index;
        break;
        case 'Year1':
          yearIndex = c.index;
        break;
        default:
          break;
      }
    }

    // Get the data values for the html & populate HTML

    activity = dt.data[0][ActivityIndex]._formattedValue;
    dep = dt.data[0][DepIndex]._formattedValue;
    user = dt.data[0][UserIndex]._formattedValue;
    date = dt.data[0][dateIndex]._formattedValue;
    year = dt.data[0][yearIndex]._formattedValue;

    console.log(activity);
    console.log(dep);
    console.log(date);
    console.log(user);
    
    console.log(year);
    

    // document.getElementById().value = ;
    document.getElementById("activity").value = activity;
    document.getElementById("costcentre").value = dep;
    document.getElementById("year").value = year;



  } // End Populate HTML 

 
  $('form').submit(function (event) {
    console.log('Form Submitted');

    // Call php here for the update the resource table.
    varInputVal = document.getElementById("value_adj").value;
    varComment = document.getElementById("comment").value;

    // console.log(varInputVal);
    // console.log(varComment);

    console.log(varInputVal.length);
    console.log(varComment.length);

    
    if (varInputVal.length == 0 && varComment.length == 0){
      alert("Check an Adjusted Value and Comment have been input!!");
    }else{
      console.log('Insert to DB');
      
    }
      


  });
   
});
