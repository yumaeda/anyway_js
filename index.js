function onWindowResize()
{
    var pageContents = new PageContents();
    pageContents.refreshWidth($('div#page-container').width() - $('aside').width());
}

$(document).ready(function()
{
    var headerElement = new HeaderElement(),
        asideElement  = new AsideElement(),
        pageContents  = new PageContents(),
        footerElement = new FooterElement(),
        $pageContents = pageContents.$m_parentContainer;

    headerElement.render();
    asideElement.render();

    var strSubMenu = UrlQuery.getValue('submenu');
    if (strSubMenu == 'wine_detail')
    {
        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines/{0}'.format(UrlQuery.getValue('id')),
            dataType: 'json',
            success: function(data)
            {
                var rgobjWine = data.wines;
                if (rgobjWine && rgobjWine.length == 1)
                {
                    var wineDetailTable = new WineDetailTable(rgobjWine[0], $pageContents);
                    wineDetailTable.render();
                }
            },

            error: function(){}
        });
    }
    else if (strSubMenu == 'advanced_search')
    {
        var advancedSearch = new AdvancedSearchControl($pageContents);
        advancedSearch.render();
    }
    else if (strSubMenu == 'search')
    {
        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
            dataType: 'json',
            data:
            {
                keyword: UrlQuery.getValue('keyword')
            },
            success: function(data)
            {
                var searchResultTable = new SearchResultTable($pageContents);
                searchResultTable.wines = data.wines;
                searchResultTable.render();
            },

            error: function() {}
        });
    }
    else if (strSubMenu == 'gift')
    {
        var giftWrapControl = new GiftWrapControl();
        giftWrapControl.render();
    }
    else if (strSubMenu == 'wine_set')
    {
        var wineSetControl = new WineSetControl('', 0);
        wineSetControl.render();
    }
    else if (strSubMenu == 'limited_set')
    {
        var headerHtml =
            '<img src="//anyway-grapes.jp/images/limited_set.png" />' +
            '<p style="margin:20px 0 20px 0;">' +
                'ブルゴーニュの神様アンリ・ジャイエ氏を叔父に持つエマニュエル・ルジェ氏は、偉大なる叔父からワイン造りを学びました。叔父の教えを尊重し、最高品質のものを造るという姿勢のエマニュエル氏のワインは、その外見とは裏腹に非常に繊細で芸術とも言える出来上がりになっています。様々な評論家から高い評価を受け、生産量も限られている為、並行品になるととてつもない金額になってしまうブルゴーニュ・ワインの１つとしても知られています。エマニュエル・ルジェはアンリ・ジャイエ同様にジョルジュ・ジャイエ氏の畑を分益小作してのワイン造りも行っています。エマニュエル・ルジェ名義のワインは新樽を使用するのに対してジョルジュ・ジャイエ名義のワインでは新樽を使用していません。ジョルジュ・ジャイエ名義の方が新樽を使用していない分エマニュエル・ルジェ名義のものよりも早くから楽しむ事が出来、若干お買い求めやすい価格なのでお買い得なワインでもあります。' +
            '</p>';

        var wineSetControl = new WineSetControl(headerHtml, 1);
        wineSetControl.render();
    }
    else if (strSubMenu == 'set_detail')
    {
        var intSetId = UrlQuery.getValue('id');
        if (intSetId && intSetId > 0)
        {
            var wineSetDetail = new WineSetDetail(intSetId);
            wineSetDetail.render();
        }
    }
    else if (strSubMenu == 'photo')
    {
        var photoControl = new PhotoControl(13);
        photoControl.render();
    }
    else if (strSubMenu == 'vintage_info')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/vintage.inc.html');
    }
    else if (strSubMenu == 'critics')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/critics.inc.html');
    }
    else if (strSubMenu == 'guide')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/user_guide.html');
    }
    else if (strSubMenu == 'quality')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/quality.html');
    }
    else if (strSubMenu == 'company')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/company.html');
    }
    else if (strSubMenu == 'cmtransaction')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/cmTransaction.html');
    }
    else if (strSubMenu == 'privacy')
    {
        HtmlUtility.renderPage($pageContents, '//anyway-grapes.jp/pages/privacy.html');
    }
    else if (strSubMenu == 'faq')
    {
        $('header').css('position', 'absolute');
        $pageContents.load('../pages/faq.inc.html', function(){});
    }
    else if (strSubMenu == 'member_rules')
    {
        $pageContents.load('../pages/member_rules.inc.html', function(){});
    }
    else
    {
        pageContents.render();
    }

    footerElement.render();

    onWindowResize();

    $(window).resize(onWindowResize);
});

