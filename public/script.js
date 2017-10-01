google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawTable);

function drawTable() {
    $.ajax({
        url: "/houses",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'name');
            data.addColumn('string', 'price');
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
            //var formatter = new google.visualization.BarFormat({ width: 100 });
            //formatter.format(data, 3); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawTable();
});
