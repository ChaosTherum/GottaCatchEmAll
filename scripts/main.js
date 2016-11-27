var caught = 0, progress = 0, pokemon, i;
FRAME_TIME = 1000 / 15;
$.getJSON("json/pokemon.json", "json", function (json) {
    pokemon = json;
}
         );
//var client = new $.RestClient("pokeapi.co/api/v2/");

$('#progress').progressbar({max: 721}, 'enable');
$('.ui-progressbar-value').append('<div />');
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
                id: 't' + i + 'h' + m,
                text: 'test'
            }).appendTo('#thead' + i + ' > tr');
        }

        $('<tbody>',{
            id: 'tbody' + i
        }).appendTo('#box' + i);

        for (j = 1; j < 6; j++) {
            $("#tbody" + i).append("<tr id='row" + j + "'></tr>");
            for (k = 1; k < 7; k++) {
                currentPokemon = 30 * (i - 1) + 6 * (j - 1) + (k - 1);
                boxNumber = currentPokemon + 1;
                $("#box" + i + " > tbody > #row" + j).append('<td id="tabledata' + k + '" class="box' + boxNumber + '"></td>');
            }
        }
    }
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
}

function update() {
    progress = $('input:checked').length;
    percent = (progress / 721) * 100;
    $('#progress').progressbar('value', progress);
    $('.ui-progressbar-value > div').text(percent.toPrecision(3) + '% Complete');
    $('#needed').text(721 - progress + ' Pokemon needed to complete dex');
}

$(document).ready(function () {populate();
                                  });

$(document).click( function() {
  update();
});
