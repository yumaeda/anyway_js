var CountryList =
{
    render: function($targetList)
    {
        $.ajax(
        {
            url: '../laravel5.3/public/api/v1/countries',
            dataType: 'json',
            success: function(data)
            {
                var rgobjCountry = data.countries,
                    cCountry     = rgobjCountry.length,
                    objCountry   = null,
                    html         = '';

                for (var i = 0; i < cCountry; ++i)
                {
                    objCountry = rgobjCountry[i];
                    var strCountry = objCountry.country;
                    if (strCountry)
                    {
                        html += 
                            '<li class="country-li">' +
                                '<a href="#" rel="{0}"><img src="../images/flags/flag-overlay.png" class="stainedFlag {1}" />&nbsp;{2}</a>'.format(
                                    strCountry,
                                    CountryInfo.getImgCssName(strCountry),
                                    CountryInfo.getJpnName(strCountry)) +
                            '</li>';
                    }
                }

                $targetList.html(html);
            },

            error: function() {}
        });
    }
};

function _generatePriceNavHtml()
{
    var html =
        '<ul class="price-range-ul">' +
            '<li><a href="#" rel="1000:1999">1,000〜1,999円</a></li>' +
            '<li><a href="#" rel="2000:2999">2,000〜2,999円</a></li>' +
            '<li><a href="#" rel="3000:3999">3,000〜3,999円</a></li>' +
            '<li><a href="#" rel="4000:4999">4,000〜4,999円</a></li>' +
            '<li><a href="#" rel="5000:5999">5,000〜5,999円</a></li>' +
            '<li><a href="#" rel="6000:6999">6,000〜6,999円</a></li>' +
            '<li><a href="#" rel="7000:7999">7,000〜7,999円</a></li>' +
            '<li><a href="#" rel="8000:8999">8,000〜8,999円</a></li>' +
            '<li><a href="#" rel="9000:9999">9,000〜9,999円</a></li>' +
            '<li><a href="#" rel="10000:9999999">10,000円〜</a></li>' +
        '</ul>';

    return html;
}

function _generateTypeNavHtml()
{
    var html =
        '<ul class="type-ul">' +
            '<li><a href="#" rel="Mousseux">スパークリング・ワイン</a></li>' +
            '<li><a href="#" rel="Champagne">シャンパーニュ</a></li>' +
            '<li><a href="#" rel="Blanc">白ワイン</a></li>' +
            '<li><a href="#" rel="Rosé">ロゼ</a></li>' +
            '<li><a href="#" rel="Rouge">赤ワイン</a></li>' +
            '<li><a href="#" rel="Doux">デザートワイン</a></li>' +
            '<li><a href="#" rel="Eau de Vie">オー・ド・ヴィ</a></li>' +
        '</ul>';

    return html;
}

function _generateVintageNavHtml()
{
    var html =
        '<ul class="vintage-ul">' +
            '<li><a href="#" rel="1930">1930年代</a></li>' +
            '<li><a href="#" rel="1940">1940年代</a></li>' +
            '<li><a href="#" rel="1950">1950年代</a></li>' +
            '<li><a href="#" rel="1960">1960年代</a></li>' +
            '<li><a href="#" rel="1970">1970年代</a></li>' +
            '<li><a href="#" rel="1980">1980年代</a></li>' +
            '<li><a href="#" rel="1990">1990年代</a></li>' +
            '<li><a href="#" rel="2000">2000年代</a></li>' +
            '<li><a href="#" rel="2010">2010年代</a></li>' +
        '</ul>';

    return html;
}


//-------------------------------------------------------
//
// AsideElement
//
//-------------------------------------------- YuMaeda --
class AsideElement extends HtmlControl
{
    constructor()
    {
        super($('aside'));

        this.m_searchResultTable =
            new SearchResultTable($('div#page-contents'));
        this.m_searchResultTable.fProducerLink = false;

        this.$m_selectedItem = null;
    }

    renderChildren()
    {
        var html   = '';

        html =
            '<hr />' +
            '<h2>産地</h2>' +
            '<ul id="country-ul"></ul>' +
            '<hr />' +
            '<h2>価格</h2>' +
            _generatePriceNavHtml() +
            '<hr />' +
            '<h2>種類</h2>' +
            _generateTypeNavHtml() +
            '<hr />' +
            '<h2>年代</h2>' +
            _generateVintageNavHtml() +
            '<hr />';

        this.$m_parentContainer.html(html);
        CountryList.render(this.$m_parentContainer.find('ul#country-ul')); 
    }

    postRender()
    {
        var self = this;

        $('ul#country-ul').on('click', 'li.country-li > a', function()
        {
            event.stopPropagation();
            $('ul#country-ul').css('visibility', 'hidden');

            var $this      = $(this),
                $li        = $this.closest('li'),
                strCountry = $this.attr('rel');

            if (self.$m_selectedItem != null)
            {
                self.$m_selectedItem.removeClass('item-selected');
            }

            self.$m_selectedItem = $li;
            self.$m_selectedItem.addClass('item-selected');

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                dataType: 'json',
                data: { country: strCountry },
                success: function(data)
                {
                    self.m_searchResultTable.clearFilter();
                    self.m_searchResultTable.wines = data.wines;
                    self.m_searchResultTable.render();
                },

                error: function() {}
            });

            // Fade out all the region lists.
            $('ul.region-ul').fadeOut();
            if ($li.find('ul.region-ul').length > 0)
            {
                $li.find('ul.region-ul').fadeIn();
                $('ul#country-ul').css('visibility', 'visible');
            }
            else
            {
                $.ajax(
                {
                    url: '../laravel5.3/public/api/v1/regions/' + strCountry,
                    dataType: 'json',
                    success: function(data)
                    {
                        var rgobjRegion = data.regions,
                            cRegion     = rgobjRegion.length,
                            objRegion   = null,
                            html        = '<ul class="region-ul">';

                        for (var i = 0; i < cRegion; ++i)
                        {
                            objRegion = rgobjRegion[i];
                            var strRegion = objRegion.region;
                            if (strRegion)
                            {
                                html += 
                                    '<li>' +
                                        '<a href="#" rel="{0}" class="region-link">{1}</a>'.format(strRegion, objRegion.region_jpn) +
                                    '</li>';
                            }
                        }

                        html += '</ul>';

                        $this.closest('li').append(html);
                        $('ul#country-ul').css('visibility', 'visible');
                    },

                    error: function() {}
                });
            }

            return false;
        });

        this.$m_parentContainer.on('click', 'a.region-link', function(event)
        {
            event.stopPropagation();
            $('ul#country-ul').css('visibility', 'hidden');

            var $this     = $(this),
                strRegion = $this.attr('rel'),
                $li       = $this.closest('li');

            // Fade out all the region lists.
            $('ul.district-ul').fadeOut();
            if ($li.find('ul.district-ul').length > 0)
            {
                $li.find('ul.district-ul').fadeIn();
                $('ul#country-ul').css('visibility', 'visible');
            }
            else
            {
                self.$m_selectedItem.removeClass('item-selected');
                self.$m_selectedItem = $li;
                self.$m_selectedItem.addClass('item-selected');

                $.ajax(
                {
                    url: '../laravel5.3/public/api/v1/districts/' + strRegion,
                    dataType: 'json',
                    success: function(data)
                    {
                        var rgobjDistrict = data.districts,
                            cDistrict     = rgobjDistrict.length,
                            objDistrict   = null,
                            html          = '<ul class="district-ul">';

                        for (var i = 0; i < cDistrict; ++i)
                        {
                            objDistrict = rgobjDistrict[i];
                            var strDistrict = objDistrict.district;
                            if (strDistrict)
                            {
                                html += 
                                    '<li>' +
                                        '<a href="#" rel="{0}" class="district-link">{1}</a>'.format(strDistrict, objDistrict.district_jpn) +
                                    '</li>';
                            }
                        }

                        $this.closest('li').append(html + '</ul>');
                        $('ul#country-ul').css('visibility', 'visible');
                    },

                    error: function() {}
                });

                $.ajax(
                {
                    url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                    dataType: 'json',
                    data: { region: strRegion },
                    success: function(data)
                    {
                        self.m_searchResultTable.clearFilter();
                        self.m_searchResultTable.wines = data.wines;
                        self.m_searchResultTable.render();
                    },

                    error: function() {}
                });
            }

            return false;
        });

        this.$m_parentContainer.on('click', 'a.district-link', function(event)
        {
            event.stopPropagation();
            $('li').removeClass('item-selected');
            $('ul#country-ul').css('visibility', 'hidden');

            var $this       = $(this),
                strDistrict = $this.attr('rel'),
                $li         = $this.closest('li');

            // Fade out all the region lists.
            $('ul.village-ul').fadeOut();
            if ($li.find('ul.village-ul').length > 0)
            {
                $li.find('ul.village-ul').fadeIn();
                $('ul#country-ul').css('visibility', 'visible');
            }
            else
            {
                self.$m_selectedItem.removeClass('item-selected');
                self.$m_selectedItem = $li;
                self.$m_selectedItem.addClass('item-selected');

                $.ajax(
                {
                    url: '//anyway-grapes.jp/laravel5.3/public/api/v1/villages/{0}'.format(strDistrict),
                    dataType: 'json',
                    success: function(data)
                    {
                        var rgobjVillage  = data.villages,
                            cVillage      = rgobjVillage.length,
                            objVillage    = null,
                            html          = '<ul class="village-ul">';

                        for (var i = 0; i < cVillage; ++i)
                        {
                            objVillage = rgobjVillage[i];
                            var strVillage = objVillage.village;
                            if (strVillage)
                            {
                                html += 
                                    '<li>' +
                                        '<a href="#" rel="{0}" class="village-link">{1}</a>'.format(strVillage, objVillage.village_jpn) +
                                    '</li>';
                            }
                        }

                        $this.closest('li').append(html + '</ul>');
                        $('ul#country-ul').css('visibility', 'visible');
                    },

                    error: function() {}
                });

                $.ajax(
                {
                    url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                    dataType: 'json',
                    data: { district: strDistrict},
                    success: function(data)
                    {
                        self.m_searchResultTable.clearFilter();
                        self.m_searchResultTable.wines = data.wines;
                        self.m_searchResultTable.render();
                    },

                    error: function() {}
                });
            }

            return false;
        });

        this.$m_parentContainer.on('click', 'a.village-link', function(event)
        {
            event.stopPropagation();

            var $this      = $(this),
                strVillage = $this.attr('rel'),
                $li        = $this.closest('li');

            self.$m_selectedItem.removeClass('item-selected');
            self.$m_selectedItem = $li;
            self.$m_selectedItem.addClass('item-selected');

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                dataType: 'json',
                data: { village: strVillage },
                success: function(data)
                {
                    self.m_searchResultTable.clearFilter();
                    self.m_searchResultTable.wines         = data.wines;
                    self.m_searchResultTable.fProducerLink = true;
                    self.m_searchResultTable.render();
                },

                error: function() {}
            });

            return false;
        });

        this.$m_parentContainer.on('click', 'ul.price-range-ul li a', function(event)
        {
            var rgstrPrice = $(this).attr('rel').split(':', 2),
                intMin     = parseInt(rgstrPrice[0], 10),
                intMax     = parseInt(rgstrPrice[1], 10);

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                dataType: 'json',
                data:
                {
                    'min-price': intMin,
                    'max-price': intMax
                },
                success: function(data)
                {
                    self.m_searchResultTable.clearFilter();
                    self.m_searchResultTable.wines = data.wines;
                    self.m_searchResultTable.render();
                },

                error: function() {}
            });

            return false;
        });

        this.$m_parentContainer.on('click', 'ul.type-ul li a', function(event)
        {
            var strType = $(this).attr('rel');

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                dataType: 'json',
                data:
                {
                    type: strType,
                },
                success: function(data)
                {
                    self.m_searchResultTable.clearFilter();
                    self.m_searchResultTable.wines      = data.wines;
                    self.m_searchResultTable.typeFilter = strType;
                    self.m_searchResultTable.render();
                },

                error: function() {}
            });

            return false;
        });

        this.$m_parentContainer.on('click', 'ul.vintage-ul li a', function(event)
        {
            var intVintage = parseInt($(this).attr('rel'));

            $.ajax(
            {
                url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines',
                dataType: 'json',
                data:
                {
                    'year-range': intVintage
                },
                success: function(data)
                {
                    self.m_searchResultTable.clearFilter();
                    self.m_searchResultTable.wines = data.wines;
                    self.m_searchResultTable.render();
                },

                error: function() {}
            });

            return false;
        });
    }
}

