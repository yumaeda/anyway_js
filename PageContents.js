var rgobjNewWineBanner = [
    { imgUrl: '../images/banners/miniere.png', pageUrl: '//anyway-grapes.jp/producers/france/champagne/montagne-de-reims/miniere-fetr/' },
    { imgUrl: '../images/banners/meo.png',     pageUrl: '//anyway-grapes.jp/store/index.php?pc_view=1&lang=ja&submenu=search&keyword=M%C3%A9o-Camuzet' },
    { imgUrl: '../images/banners/banner99.png', pageUrl: '#' },
    { imgUrl: '../images/banners/banner99.png', pageUrl: '#' }
],

rgobjSaleWineBanner = [
    { imgUrl: '../images/banners/glass-banner001.png', pageUrl: '//anyway-grapes.jp/store/index.php?submenu=wine_detail&id=3480' },
    { imgUrl: '../images/banners/banner99.png', pageUrl: '#' },
    { imgUrl: '../images/banners/banner99.png', pageUrl: '#' },
    { imgUrl: '../images/banners/banner99.png', pageUrl: '#' }
],

rgobjOtherDrinkBanner = [
    { imgUrl: '../images/banners/alain-milliat.png', pageUrl: '//anyway-grapes.jp/producers/france/vallee-du-rhone/vignoble-septentrional/alain-milliat/' },
    { imgUrl: '../images/banners/onoya.png', pageUrl: '//anyway-grapes.jp/producers/japan/oita/ono-shuzou/' },
    { imgUrl: '../images/banners/caperitif.png', pageUrl: '//anyway-grapes.jp/producers/south-africa/western-cape/badenhorst/#8781' },
    { imgUrl: '../images/banners/vermouth.png', pageUrl: '//anyway-grapes.jp/producers/italy/sicilia/baglio-baiata-alagna#9702' }
],

rgobjFoodBanner = [
    { imgUrl: '../images/banners/banner029.png', pageUrl: '//anyway-grapes.jp/store/index.php?submenu=wine_detail&id=6262&pc_view=1' },
    { imgUrl: '../images/banners/leatherwood_honey.png', pageUrl: '//anyway-grapes.jp/producers/australia/tasmania/australian-honey-products/' },
    { imgUrl: '../images/banners/mustard.png', pageUrl: '//anyway-grapes.jp/producers/australia/tasmania/hill-farm/' },
    { imgUrl: '../images/banners/banner99.png', pageUrl: '#' }
],

BannerContents =
{
    render: function($contentsDiv, rgobjBanner)
    {
        if (rgobjBanner && $contentsDiv && ($contentsDiv.length == 1))
        {
            var cBanner   = rgobjBanner.length,
                objBanner = null,
                tmpClass  = '',
                html      = '<table class="banner-table">';

            for (var i = 0; i < cBanner; ++i)
            {
                objBanner = rgobjBanner[i];

                if ((i % 4) == 0)
                {
                    if (i > 0)
                    {
                        html += '</tr>';
                        html += '<tr style="padding-top:">';
                    }
                    else
                    {
                        html += '<tr>';
                    }
                }

                html +=
                    '<td>' +
                        '<a href="{0}">'.format(objBanner.pageUrl) +
                            '<img src="{0}" alt="Banner {1}" class="banner-img" />'.format(objBanner.imgUrl, (i + 1)) +
                        '</a>' +
                    '</td>';
            }

            html += '</table>';

            $contentsDiv.html(html);
        }
    }
};


//-------------------------------------------------------
//
// PageContents
//
//-------------------------------------------- YuMaeda --
class PageContents extends HtmlControl
{
    constructor()
    {
        super($('div#page-contents'));
    }

    renderChildren()
    {
        var html = '';

        html =
            '<h2>新着情報</h2>' +
            '<div id="new-info-pane"></div>' +
            '<h2>入荷ワイン</h2>' +
            '<div id="arrival-pane"></div>' +
            '<h2>特集</h2>' +
            '<div id="new-wine-pane" class="banner-pane"></div>' +
            '<h2>セール</h2>' +
            '<div id="sale-pane" class="banner-pane"></div>' +
            '<h2>ランキング</h2>' +
            '<div id="ranking-pane"></div>' +
            '<h2>輸入元</h2>' +
            '<div id="importer-pane"></div>' +
            '<h2>その他のドリンク</h2>' +
            '<div id="other-drink-pane" class="banner-pane"></div>' +
            '<h2>フード</h2>' +
            '<div id="food-pane" class="banner-pane"></div>';

        this.$m_parentContainer.html(html);

        BannerContents.render($('div#new-wine-pane'), rgobjNewWineBanner);
        BannerContents.render($('div#sale-pane'), rgobjSaleWineBanner);
        BannerContents.render($('div#other-drink-pane'), rgobjOtherDrinkBanner);
        BannerContents.render($('div#food-pane'), rgobjFoodBanner);

        var newInfoControl    = new NewInfoControl($('div#new-info-pane')),
            newArrivalControl = new NewArrivalControl($('div#arrival-pane')),
            rankingControl    = new RankingControl($('div#ranking-pane')),
            importerControl   = new ImporterControl($('div#importer-pane'));

        newInfoControl.render();
        newArrivalControl.render();
        rankingControl.render();
        importerControl.render();
    }

    postRender()
    {
        var $parentContainer = this.$m_parentContainer;
        $parentContainer.on('click', 'div#importer-pane table a', function()
        {
            var strImporter = $(this).attr('title');

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                data:
                {
                    importer: strImporter
                },

                dataType: 'json',
                success: function(data)
                {
                    var rgobjWine         = data.wines,
                        searchResultTable = new SearchResultTable($parentContainer);

                    searchResultTable.clearFilter();
                    searchResultTable.wines = rgobjWine;
                    searchResultTable.render();
                },

                error: function() {}
            });

            return false;
        });
    }

    refreshWidth(containerWidth, asideWidth)
    {
        var $container = $('div#page-container'),
            $aside     = $('aside');

        this.$m_parentContainer.width($container.width() - $aside.width() - 1);
    }
}

