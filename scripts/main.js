var caught = 0, progress = 0, pokemon, i, totalPokemon = 722;
FRAME_TIME = 1000 / 15;
$.getJSON("json/pokemon.json", "json", function (json) {
    pokemon = json;
    totalPokemon = json.length;
});
//var client = new $.RestClient("localhost:8000/api/v2/");
$('#progress').progressbar({max: totalPokemon}, 'enable');
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
}

function update() {
    progress = $('input:checked').length;
    percent = (progress / totalPokemon) * 100;
    $('#progress').progressbar('value', progress);
    $('.ui-progressbar-value > div').text(percent.toPrecision(3) + '% Complete');
    $('#needed').text(totalPokemon - progress + ' Pokemon needed to complete dex');
}

$(document).ready(function () {
  populate();
});

$(document).click( function() {
  update();
});

//===== Cookies Plugin=====   //

(function ($) {
            $.cookie = function (key, value, options) {

                // key and at least value given, set cookie...
                if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
                    options = $.extend({}, options);

                    if (value === null || value === undefined) {
                        options.expires = -1;
                    }

                    if (typeof options.expires === 'number') {
                        var days = options.expires, t = options.expires = new Date();
                        t.setDate(t.getDate() + days);
                    }

                    value = String(value);

                    return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
                }

                // key and possibly options given, get cookie...
                options = value || {};
                var decode = options.raw ? function (s) { return s; } : decodeURIComponent;

                var pairs = document.cookie.split('; ');
                for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
                    if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
                }
                return null;
            };
        })(jQuery);

//======================================//

  $(document).ready(function () {
            var checkbox = $('body').find(':checkbox'), checkboxCookieName = 'checkbox-state';

            checkbox.each(function () {
                $(this).attr('checked', $.cookie(checkboxCookieName + '|' + $(this).attr('name')));
            });

            checkbox.click(function () {
                $.cookie(checkboxCookieName + '|' + $(this).attr('name'), $(this).prop('checked'));
            });
        });
