(function($) {

    $('#main-banner').css({
        'min-height': $(window).height()
    });
    $('.topten').css({
        'max-height': $(window).height() - 208
    });
    $(window).resize(function() {
        console.log(1);
        $('#main-banner').css({
            'min-height': $(window).height()
        });
        $('.topten').css({
            'max-height': $(window).height() - 208
        });
    })



    console.log($('.shape'));

    let flipTimer = setInterval(flip, 3000);

    function flip() {
        $('.shape').shape('flip right');
    }

    $('.ui .image').on('mouseenter', function() {

        $('.ui.dimmer')
            .dimmer({
                on: 'hover'
            });
    });



    $('.ui.search')
        .search({
            type: 'category',
            minCharacters: 1,
            apiSettings: {
                onResponse: function(SpotifyResponse) {
                    var response = {
                        results: {}
                    };
                    
                    $.each(SpotifyResponse, function(index, item) {
                        //console.log(item);
                        //console.log(typeof item)
                        let type = item.type;
                        let maxResults = 20;
                        if (index >= maxResults) {
                            return false;
                        }
                        // create new language category
                        if (response.results[type] === undefined) {
                            response.results[type] = {
                                name: type,
                                results: []
                            };
                        }
                        // add result to category
                        response.results[type].results.push({
                            title: item["name"],
                            description: 'no description',
                            url: type + '/' + item["id"]
                        });
                    });
                    console.log(response);
                    return response;
                },
                url: 'http://localhost:3000/search/{query}'
            }
        });

})(jQuery);