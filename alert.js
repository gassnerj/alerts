var jsonAlerts;

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  var url = "https://api.weather.gov/alerts?active=1&zone_type=land&severity=severe";
  var x;
  var alertObj;
  var i;
  var n = 0;

  var table = document.getElementById("alerts");

  


  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     	alertObj = JSON.parse(this.responseText);

        document.getElementById("title").innerHTML = alertObj['title'];


     	for (i=0; i < alertObj.features.length; i++) {
            x = alertObj.features[i];
            var alertID = x['properties'].id;
            var activeID = document.getElementById(alertID);
            if (!activeID) {
              n++;
              var row = table.insertRow(n+1);
              row.setAttribute("id", x['properties'].id);

              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);

              cell1.innerHTML = x['properties'].effective;
              cell2.innerHTML = x['properties'].headline;
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
  $('#get-data').click(function () {
    var showData = $('#show-data');

    $.getJSON('https://api.weather.gov/alerts?active=1&zone_type=land&severity=severe', function (data) {
      console.log(data);

      var items = data.items.map(function (item) {
        return item.key + ': ' + item.value;
      });

      showData.empty();

      if (items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
    });

    showData.text('Loading the JSON file.');
  });
});