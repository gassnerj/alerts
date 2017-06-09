var jsonAlerts;
var url = "https://api.weather.gov/alerts?active=1&zone_type=land&severity=severe";

function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  var x;
  var alertObj;
  var i;
  var n = 0;

  var table = document.getElementById("alerts");




  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alertObj = JSON.parse(this.responseText);

      document.getElementById("title").innerHTML = alertObj['title'];


      for (i = 0; i < alertObj.features.length; i++) {
        x = alertObj.features[i];
        var alertID = x['properties'].id;
        var activeID = document.getElementById(alertID);
        if (!activeID) {
          n++;
          var row = table.insertRow(n + 1);
          row.setAttribute("id", x['properties'].id);

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          var aID = "http://api.weather.gov/alerts/" + x['properties'].id;

          row.setAttribute("alt", x['properties'].areaDesc);
          cell1.innerHTML = "<a href=\"#\" onclick=loadDetails(\""+ x['properties'].id + "\")>View Alert</a>";
          cell1.setAttribute("class", "my_popup_open");
          cell2.innerHTML = x['properties'].headline;
          switch(x['properties'].event) {
            case "Severe Thunderstorm Warning":
              row.setAttribute("style", "background-color:yellow");
              break;
            case "Tornado Warning":
              row.setAttribute("style", "background-color:red");
              break;
            case "Flood Warning":
              row.setAttribute("style", "background-color:green");
              break;
            case "Severe Thunderstorm Watch":
              row.setAttribute("style", "color:yellow;background-color:black");
              break;
          }

        } else {
          row.deleteRow(x);
          alert("Warning " + x['properties'].id + " expired.");

        }
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


$(document).ready(function () {
  loadDoc(url);
  setInterval("location.reload(true)", 60000);
  $('#my_popup').popup();
});

function loadDetails(alertID) {
  alertID = "http://api.weather.gov/alerts/" + alertID;
  
  document.getElementById("alertID").innerHTML = alertID;


  //alert(alertID);
}