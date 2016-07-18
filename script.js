jQuery(function () {
    'use strict';
    if (!(jQuery('div#dokuwiki__top.mode_search').length || jQuery('div#icke__wrapper.act_search').length)) {
        return;
    }

    var $quickresults = jQuery('.search_quickresult');
    $quickresults.hide();
    var $fulltext = jQuery('.search_results');
    var $tabs = jQuery('<ul class="tabs"></ul>');

    var numResults = $fulltext.find('dt').length;
    $fulltext = $fulltext.add(jQuery('.nothing'));
    var $searchResults = jQuery('<li class="active"></li>');
    var title = LANG['plugins']['tabbedsearchresults']['tab:Page Results'] + ' (' + numResults + ')';
    $searchResults.append(jQuery('<a>'+title+'</a>').click(function (evt) {
        $quickresults.hide();
        $fulltext.show();
        $tabs.find('>li').removeClass('active');
        $searchResults.addClass('active');
    }));
    $tabs.append($searchResults);

    $quickresults.each(function (index, elem) {
        var $elem = jQuery(elem);
        var numResults = $elem.find('ul.search_quickhits > li').length;
        var title = $elem.find('h3').text();
        if (title.substr(title.length - 1) == ':') {
            title = title.substr(0, title.length - 1);
        }
        $elem.find('h3').hide();
        var $li = jQuery('<li></li>').append(jQuery('<a>'+title+ ' (' + numResults + ')</a>').click(function (evt) {
            $quickresults.hide();
            $fulltext.hide();
            $elem.show();
            $tabs.find('>li').removeClass('active');
            jQuery(this).closest('li').addClass('active');
        }));
        $tabs.append($li);
    });
    jQuery('#dokuwiki__content, #icke__page').find('h2').first().after($tabs);
});
