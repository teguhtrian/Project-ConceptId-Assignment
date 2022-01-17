initialData();

function initialData() {
    var initialPairsData;
    var initial24HData;

    $.ajax({
        url: 'https://indodax.com/api/pairs',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (result) {
            initialPairsData = result;
            $.ajax({
                url: 'https://indodax.com/api/summaries',
                type: 'get',
                dataType: 'json',
                data: {},
                success: function (result) {
                    initial24HData = result['tickers'];

                    $.each(initialPairsData, function (i, pairs) {
                        $.each(initial24HData, function (j, data24h) {
                            if (j === pairs['ticker_id']) {

                                $('#tbody').append(`
                                    <tr>
                                        <td style="text-align: center;vertical-align: middle;"><img src="${pairs.url_logo}" alt="Girl in a jacket" width="50" height="50"><h4>${pairs.description}</h4></td>
                                        <td>
                                            <p style="color: #4CAF50">High : Rp.` + $.number(data24h.high, 2) + `</p>
                                            <p style="color: #FF0000">Low : Rp.` + $.number(data24h.low, 2) + `</p>
                                            <hr>
                                            <p style="color: #4CAF50">Beli : Rp.` + $.number(data24h.buy, 2) + `</p>
                                            <p style="color: #FF0000">Jual : Rp.` + $.number(data24h.sell, 2) + `</p>
                                        </td>
                                        <td style=";vertical-align: middle;
                                        text-align: center;">
                                            <h4 style="color: #4CAF50">Rp.` + $.number(data24h.vol_idr, 2) + `</h4>
                                        </td>
                                    </tr>
                                `);
                            }
                        });
                    });
                    console.log(initialPairsData);
                }
            });

        }
    });
}

$("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
})

$('th').click(function () {
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc) { rows = rows.reverse() }
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
})
function comparer(index) {
    return function (a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

$('#movie-list').on('click', '.see-detail', function () {

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'dca61bcc',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster + `" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                                    <li class="list-group-item">Released : `+ movie.Released + `</li>
                                    <li class="list-group-item">Genre : `+ movie.Genre + `</li>                 
                                    <li class="list-group-item">Director : `+ movie.Director + `</li>                 
                                    <li class="list-group-item">Director : `+ movie.Actors + `</li>                 
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

            }
        }
    });

});