google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawTable);

function drawTable() {
    $.ajax({
        url: "/houses",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'name');
            data.addColumn('string', 'price($)');
            data.addColumn('string', 'type');
            data.addColumn('string', 'square');
            data.addColumn('string', 'rooms');
            data.addColumn('string', 'location');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].name,
                    jsonData[i].price,
                    jsonData[i].type,
                    jsonData[i].square,
                    jsonData[i].rooms,
                    jsonData[i].location
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            table.draw(data, options);
        }
    });
}

function drawPieChart() {
    $.ajax({
        url: "/houses",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'House');
            data.addColumn('number', 'Price($)');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRows([
                    [jsonData[i].location, Number(jsonData[i].price)]
                ]);
            }

            var options = {
                legend: 'left',
                title: 'The high-priced houses',
                is3D: true,
                width: '100%',
                height: '100%'
            };
            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
};

function drawColumnChart() {
    $.ajax({
        url: "/houses",
        dataType: "json",
        success: function (jsonData) {
            var room_1 = [];
            var room_2 = [];
            var room_3 = [];
            var room_4 = [];
            var room_5 = [];
            var room_6 = [];
            var room_7 = [];
            var room_8 = [];
            for (i = 0; i < jsonData.length; i++) {
                if (jsonData[i].rooms == "1") {
                    room_1.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "2") {
                    room_2.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "3") {
                    room_3.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "4") {
                    room_4.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "5") {
                    room_5.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "6") {
                    room_6.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "7") {
                    room_7.push(...jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == "8+") {
                    room_8.push(...jsonData[i].rooms);
                }
            }

            var data = google.visualization.arrayToDataTable([
                ['Houses','1 Room', '2 Rooms', '3 Rooms', '4 Rooms', '5 Rooms', '6 Rooms', '7 Rooms', '8+ Rooms'],
                ['Houses',room_1.length, room_2.length, room_3.length, room_4.length, room_5.length, room_6.length, room_7.length, room_8.length]
            ]);

            var options = {
                title: 'Rooms Count',
                hAxis: { title: 'Rooms', titleTextStyle: { color: 'red' } }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    drawTable();
});