var caught = 0, progress = 0, pokemon, i, totalPokemon = 722, numberOfBoxes = 32;
FRAME_TIME = 1000 / 15;
$.getJSON("json/pokemon.json", "json", function (json) {
    pokemon = json;
    totalPokemon = json.length;
});
//var client = new $.RestClient("localhost:8000/api/v2/");
$('#progress').progressbar({max: totalPokemon}, 'enable');
function populate() {
    var i, j, k, poke = 1, currentPokemon, boxNumber, m;
    for (i = 1; i < 33; i++) {
        $("#boxes").append("<table id='box" + i + "' class='box'></table>");
        $('<thead />', {
            id: 'thead' + i
        }).appendTo('#box' + i);
        $('<tr />' + i, {
        }).appendTo('#thead' + i);
        for (m = 1; m < 7; m++) {
            $('<th />', {
                id: 't' + i + 'h' + m
                //text: 'test'
            }).appendTo('#thead' + i + ' > tr');
        }
        $('<tbody>',{
            id: 'tbody' + i
        }).appendTo('#box' + i);
        for (j = 1; j <= 5; j++) {
            $("#tbody" + i).append("<tr id='row" + j + "'></tr>");
            for (k = 1; k <= 6; k++) {
              //Calculate the number of the box based on table, column, and row
                currentPokemon = 30 * (i - 1) + 6 * (j - 1) + (k - 1);
                boxNumber = currentPokemon + 1;
                $("#box" + i + " > tbody > #row" + j).append('<td id="tabledata' + k + '" class="box' + boxNumber + '"></td>');
            }
        }
    }
    //Create pokemon checkboxes as well as labels
    for (key in pokemon) {
        $('<input />', {
            type: 'checkbox',
            name: 'poke' + key,
            value: pokemon[key].identifier,
            label: pokemon[key].identifier,
            id: 'poke' + key,
            text: pokemon[key].identifier
        }).appendTo('.box' + key);
        $('.box' + key + ' > input').wrap('<label />');
        $('.box' + key + ' > label').append(pokemon[key].identifier);
    }
    // Populate progressbars in boxes
    for (tableHeader = 1; tableHeader <= numberOfBoxes; tableHeader++) {
      var boxCount = $('#box' + tableHeader + ' input:checkbox').length;
      console.log(boxCount);
      console.log(tableHeader)
      $('#t' + tableHeader + 'h6').progressbar({value: 0, max: boxCount}, 'enable');
    }
    $('.ui-progressbar-value').append('<div />');
}

function update() {
    progress = $('input:checked').length;
    percent = (progress / totalPokemon) * 100;
    $('#progress').progressbar('value', progress);
    $('.ui-progressbar-value > div').text(percent.toPrecision(3) + '% Complete');
    $('#needed').text(totalPokemon - progress + ' Pokemon needed to complete dex');
    for (tableHeader = 1; tableHeader <= numberOfBoxes; tableHeader++){
      var boxValue = $('#box' + tableHeader + ' input:checkbox:checked').length
      var boxCount = $('#box' + tableHeader + ' input:checkbox').length
      var percent = (boxValue / boxCount) * 100;
      $('#t' + tableHeader + 'h6').progressbar('value', boxValue);
      $('#box' + tableHeader + ' .ui-progressbar-value > div').text(percent.toPrecision(3) + '%');
    }
}

$(document).ready(function () {
  populate();
});
update();
$(document).click( function() {
  update();
});
