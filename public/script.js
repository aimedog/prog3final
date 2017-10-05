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
            var roomarr = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ];
            for (i = 0; i < jsonData.length; i++) {
                if (jsonData[i].rooms == 1) {
                    roomarr[0].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == 2) {
                    roomarr[1].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == 3) {
                    roomarr[2].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == 4) {
                    roomarr[3].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == 5) {
                    roomarr[4].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == 6) {
                    roomarr[5].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms == 7) {
                    roomarr[6].push(jsonData[i].rooms);
                }
                else if (jsonData[i].rooms === "8+") {
                    roomarr[7].push(jsonData[i].rooms);
                }
            }
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Rooms Count');
            data.addColumn('number', 'Rooms Count');
            for (var i = 0; i < 8; i++) {
                data.addRows([
                    [String(i + 1) + " Rooms", roomarr[i].length]
                ]);
            }

            var options = {
                legend: 'left',
                title: 'Rooms Count',
                is3D: true,
                width: '100%',
                height: '100%'
            };
            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
};

function drawPieChart2() {
    $.ajax({
        url: "/houses",
        dataType: "json",
        success: function (jsonData) {
            var roomarr = [
                [],
                [],
                [],
                [],
                [],
                []
            ];
            for (i = 0; i < jsonData.length; i++) {
                if (jsonData[i].type == 'Քարե') {
                    roomarr[0].push(jsonData[i].type);
                }
                else if (jsonData[i].type == 'Պանելային') {
                    roomarr[1].push(jsonData[i].type);
                }
                else if (jsonData[i].type == 'Մոնոլիտ') {
                    roomarr[2].push(jsonData[i].type);
                }
                else if (jsonData[i].type == 'Աղյուսե') {
                    roomarr[3].push(jsonData[i].type);
                }
                else if (jsonData[i].type == 'Կասետային') {
                    roomarr[4].push(jsonData[i].type);
                }
                else if (jsonData[i].type == 'Փայտե') {
                    roomarr[5].push(jsonData[i].type);
                }
            }
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Type');
            data.addColumn('number', 'Type');
            for (var i = 0; i < roomarr.length; i++) {
                data.addRows([
                    [roomarr[i][0], roomarr[i].length]
                ]);
            }

            var options = {
                title: 'Type',
                pieHole: 0.4,
                width: '100%',
                height: '100%'
            };
            var chart = new google.visualization.PieChart(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawPieChart2();
    drawTable();
});