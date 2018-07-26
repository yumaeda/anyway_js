//-------------------------------------------------------
//
// CampaignPage
//
//-------------------------------------------- YuMaeda --
class CampaignPage extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_intCurPage  = 1;
        this.m_cMaxItem    = 3;
        this.m_rgobjWine   = null;
        this.m_strProducer = decodeURIComponent(UrlQuery.getValue('producer'));
    }

    _generatePriceHtml(objWine)
    {
        var html             = '',
            strTaxExcluded   = '税抜',
            strRetailPrice   = '{0} yen'.format(objWine.price.format()),
            strMemberPrice   = '{0} yen'.format(objWine.member_price.format());

        if (objWine.price <= objWine.member_price)
        {
            html = '{0}&nbsp;({1})'.format(
                strMemberPrice,
                strTaxExcluded);
        }
        else
        {
            html = '<span class="textDeleted">{0}</span><span class="colorDarkRed textSmallMedium">{1}{2}<span class="textSmall"> ({3})</span></span>'.format(
                strRetailPrice,
                ' → ',
                strMemberPrice,
                strTaxExcluded);
        }

        return html;
    }

    _generatePaginationHtml()
    {
        var strPrevPage = '&lt; Prev',
            strNextPage = 'Next &gt;',
            iLastPage   = Math.ceil(this.m_rgobjWine.length / this.m_cMaxItem),
            html        = '';

        html += (this.m_intCurPage > 1) ?
            '<a id="prevLnk">' + strPrevPage + '</a>' :
            '<span id="prevText">' + strPrevPage + '</span>';

        html += 'Page&nbsp;<span id="currentPageSpan">' + this.m_intCurPage + '</span>&nbsp;of&nbsp;' + iLastPage;

        html += (this.m_intCurPage < iLastPage) ?
            '<a id="nextLnk">' + strNextPage + '</a>' :
            '<span id="nextText">' + strNextPage + '</span>';

        return html;
    }

    _generateTableColHtml(objWine)
    {
        var remainingBottlesHtml = '',
            addToCartHtml        = '',
            divClass             = 'wineInfo';

        if (CartUtility.isPurchasable(objWine))
        {
            remainingBottlesHtml =
                (objWine.stock < 10) ? '<span class="stockSpan jpnText">残り' + objWine.stock + '本</span>' : '';

            addToCartHtml =
                '<img id="' + objWine.barcode_number + '" src="./add_to_cart.png" class="addToCartBtn" title="カートに追加する" />';

            if (objWine.etc == 'Happy-Box')
            {
                addToCartHtml += 
                    '<img src="//anyway-grapes.jp/images/happy_box_icon.png" class="happyBoxIcon clickableImg" />';
            }

            addToCartHtml +=
                '<br />' +
                '<span class="jpnText">数量:&nbsp;&nbsp;</span><input type="number" class="qtyInput" value="1" ' + 'min="0" max="' + objWine.stock + '" />' +
                remainingBottlesHtml;
        }
        else
        {
            divClass = divClass + ' soldOut'; 
        }

        var html =
            '<td>' +
                '<div class="' + divClass + '">' +
                    '<span class="vintageSpan">' + objWine.type + '&nbsp;[&nbsp;' + objWine.vintage+ '&nbsp;]</span>' +
                    HtmlUtility.generateImgHtml(objWine.barcode_number, 'wineImg') +
                    '<br />' +
                    '<br />' +
                    '<span class="jpnText producerSpan">' + objWine.producer_jpn + '</span>' +
                    '<br />' +
                    '<a target="_parent" href="//anyway-grapes.jp/store/index.php?submenu=wine_detail&id=' + objWine.barcode_number + '" class="wineDetailLnk" id="' + objWine.barcode_number + '"><span class="jpnText">' + objWine.combined_name_jpn + '</span></a>' +
                    '<br />' +
                    '<br />' +
                    '<span class="priceSpan"></span>' +
                    addToCartHtml;

        if (CartUtility.isComingSoon(objWine))
        {
            html += 
                '<br /><br />' +
                '<span class="jpnText" style="font-size:14px;color:red;">' +
                    '{0}入荷予定。入荷日の翌日以降の発送となります。'.format(objWine.etc) +
                '</span>';
        }

        html +=
                '</div>' +
            '</td>';


        return html;
    }

    _renderWines(self)
    {
        if (self.m_rgobjWine !== null)
        {
            var innerHtml  = '',
                cWine      = self.m_rgobjWine.length,
                cCol       = 3,
                iFirstWine = (self.m_intCurPage -1) * self.m_cMaxItem,
                iLastWine  = iFirstWine + self.m_cMaxItem;

            for (var i = iFirstWine; ((i < cWine) && (i < iLastWine)); ++i)
            {
                if ((i % cCol) === 0)
                {
                    innerHtml += '<tr>';
                }

                innerHtml += self._generateTableColHtml(self.m_rgobjWine[i]);

                if ((i % cCol) === (cCol - 1))
                {
                    innerHtml += '</tr>';
                }
            }

            $(function()
            {
                self.$m_parentContainer.fadeOut(700, function()
                {
                    self.$m_parentContainer.html(innerHtml).fadeIn(700);

                    // Renders the member price.
                    $.ajax(
                    {
                        url:  '//anyway-grapes.jp/is_authenticated.php',
                        type: 'GET',
                        data: {},

                        success: function(strResponse)
                        {
                            var fAuthenticated = (strResponse == 'TRUE');

                            self.$m_parentContainer.find('span.priceSpan').each(function(i)
                            {
                                var html             = '',
                                    objWine          = self.m_rgobjWine[iFirstWine + i],
                                    strMemberPrice   = '{0} yen'.format(objWine.member_price.format());

                                if (fAuthenticated && (objWine.member_price > 0))
                                {
                                    html = '<span class="colorRed textSmallMedium">{0}&nbsp;[会員価格]</span>'.format(strMemberPrice);
                                }
                                else
                                {
                                    html = self._generatePriceHtml(objWine);
                                }

                                $(this).html(html);
                           });
                        },

                        error: function() {}
                    });
                });
            });
        }
    }

    renderChildren()
    {
        document.title = this.m_strProducer;

        var self = this;

        $.ajax(
        {
            url : "//anyway-grapes.jp/laravel5.3/public/api/v1/wines",
            data:
            {
                producer: self.m_strProducer
            },

            dataType: "json",
            success: function(data)
            {
                self.m_rgobjWine = data.wines;
                self._renderWines(self);

                $('div#paginationPane').html(self._generatePaginationHtml());
            },

            error: function() {}
        });
    }

    postRender()
    {
        var self            = this,
            $paginationPane = $('div#paginationPane');

        self.$m_parentContainer.on('click', 'img.addToCartBtn', function()
        {
            var $this    = $(this),
                wineName = $this.closest('div').find('a > span').html(),
                barcode  = $this.attr('id'),
                quantity = $this.closest('div').find('input.qtyInput').val();

            $.ajax(
            {
                url:  '//anyway-grapes.jp/cart.php',
                type: 'POST',
                data:
                {
                    action: 'add',
                    pid:    barcode,
                    qty:    quantity
                },

                success: function(strResponse)
                {
                    $this.notify('買い物かごに、{0}本追加されました。'.format(quantity),
                    {
                        autoHideDelay: 2500,
                        arrowSize: 6,
                        className: 'success'
                    });
                },

                error: function()
                {
                    console.error(barcode + ' cannot be added to the cart.');
                }
            });
        });

        self.$m_parentContainer.on('click', 'img.happyBoxIcon', function()
        {
            var $this    = $(this),
                barcode  = $this.siblings('.addToCartBtn').attr('id'),
                quantity = $this.closest('div').find('input.qtyInput').val();

            $.ajax(
            {
                url:  '//anyway-grapes.jp/cart.php',
                type: 'POST',
                data:
                {
                    action:    'add',
                    cart_type: 1,
                    pid:       barcode,
                    qty:       quantity
                },

                success: function(strResponse)
                {
                    $this.notify('福箱に、{0}本追加されました。'.format(quantity),
                    {
                        autoHideDelay: 2500,
                        arrowSize: 6,
                        className: 'success'
                    });
                },

                error: function()
                {
                    console.error(barcode + ' cannot be added to the happy box.');
                }
            });
        });

        $paginationPane.on('click', 'a#prevLnk', function()
        {
            self.m_intCurPage -= 1;
            self._renderWines(self);

            $paginationPane.html(self._generatePaginationHtml());
        });

        $paginationPane.on('click', 'a#nextLnk', function()
        {
            self.m_intCurPage += 1;
            self._renderWines(self);

            $paginationPane.html(self._generatePaginationHtml());
        });
    }
}

