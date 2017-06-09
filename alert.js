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
          cell1.innerHTML = "<a href=\"#\" onclick=loadDetails(\"" + x['properties'].id + "\")>View Alert</a>";
          cell1.setAttribute("class", "my_popup_open");
          cell2.innerHTML = x['properties'].headline;
          switch (x['properties'].event) {
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

  var xhttp2 = new XMLHttpRequest();
  var alertObj2;
  var x;
  var i;
  var n = 0;

  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alertObj2 = JSON.parse(this.responseText);

      document.getElementById("alertHeadline").innerHTML = alertObj2['properties'].headline;
      document.getElementById("alertDescription").innerHTML = alertObj2['properties'].description;

      if(alertObj2['properties'].event != "Severe Thunderstorm Warning") {
        document.getElementById("params").setAttribute("style", "display:none;");
      }

      if (alertObj2['properties']['parameters'].hailSize) {
        document.getElementById("hailSize").innerHTML = alertObj2['properties']['parameters'].hailSize + " inch(es)";
      }
      if (alertObj2['properties']['parameters'].windGust) {
        document.getElementById("windGust").innerHTML = alertObj2['properties']['parameters'].windGust + " MPH";
      }


      for (i = 0; i < alertObj2.properties.length; i++) {
        x = alertObj2.properties[i];
        if (1 == 1) {
          n++;
          alert(alertObj2.event);

        } else {

          alert("Warning " + x['properties'].id + " expired.");

        }
      }
    }
  };
  xhttp2.open("GET", alertID, true);
  xhttp2.send();

  //document.getElementById("alertID").innerHTML = alertID;


  //alert(alertID);
}


  function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 48.75, lng: -108.26},
    mapTypeId: 'terrain'
  });

  var flightPlanCoordinates = [
    {lng: -108.26, lat: 48.75},
    {lng: -108.32, lat: 48.74},
    {lng: -108.35, lat: 48.44},
    {lng: -108.42, lat: 48.44},
    {lng: -108.43, lat: 48.98},
    {lng: -108.6, lat: 47.99},
    {lng: -108.64, lat: 47.92}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}
