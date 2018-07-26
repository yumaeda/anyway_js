//-------------------------------------------------------
//
// WineSetDetail
//
//-------------------------------------------- YuMaeda --
class WineSetDetail extends HtmlControl
{
    _getSetPrice(objWineSet, fTaxIncluded)
    {
        var intSetPrice = parseInt(objWineSet.set_price, 10);

        return fTaxIncluded ?
            Math.floor(1.08 * intSetPrice) :
            Math.floor(intSetPrice);
    }

    _renderHeader(objWineSet)
    {
        console.dir(objWineSet);

        var tableTag      = new TableTag(),
            imgUrl        = '//anyway-grapes.jp/images/wine_sets/{0}.png'.format(objWineSet.id),
            defaultImgUrl = '//anyway-grapes.jp/images/wine_sets/no_wine_set_image.png',
            imgHtml       = '<img src="{0}" onerror="this.src=\'{1}\';" />'.format(imgUrl, defaultImgUrl),
            breadCrumHtml = (objWineSet.type == 0) ?
            '<a href="./index.php?pc_view=1&submenu=wine_set">送料無料セット</a>&nbsp;&nbsp;>>&nbsp;&nbsp;{0}'.format(objWineSet.name) :
            '<a href="./index.php?pc_view=1&submenu=limited_set">限定セット</a>&nbsp;&nbsp;>>&nbsp;&nbsp;{0}'.format(objWineSet.name);

        var imgRow  = new TableRow(),
            noteRow = new TableRow(),
            imgCol  = new TableColumn(imgHtml),
            noteCol = new TableColumn(objWineSet.comment);
        imgCol.addAttr('colspan', '2');
        noteCol.addAttr('colspan', '2');
        imgRow.addColumn(imgCol);
        noteRow.addColumn(noteCol);

        tableTag.head.addRow(imgRow);
        tableTag.head.addRow(noteRow);

        this.$m_header.html(breadCrumHtml + tableTag.toHtml());
    }

    _renderBody(objWineSet)
    {
        var objThis = this;

        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/set-wines/{0}'.format(objWineSet.id),
            dataType: "json",
            async: false,
            success: function(data)
            {
                var rgobjSetWine = data.wines,
                    listTag      = new ListTag(false),
                    objSetWine   = null,
                    cSetWine     = rgobjSetWine.length,
                    codeHash     = [];

                for (var i = 0; i < cSetWine; ++i)
                {
                    objSetWine = rgobjSetWine[i];

                    if (codeHash[objSetWine.barcode_number] != 1)
                    {
                        codeHash[objSetWine.barcode_number] = 1;

                        $.ajax(
                        {
                            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wines/{0}'.format(objSetWine.barcode_number),
                            async: false,
                            dataType: 'json',
                            success: function(data)
                            {
                                var rgobjWine = data.wines;
                                if (rgobjWine && rgobjWine.length == 1)
                                {
                                    var objWine       = rgobjWine[0],
                                        wineInfoTable = new WineInfoTable(objWine, false);

                                    listTag.addItem(new ListItemTag(wineInfoTable.toHtml()));
                                }
                            },

                            error: function(){}
                        });
                    }
                }

                objThis.$m_body.html(listTag.toHtml());
            },

            error: function() {}
        });
    }

    _renderFooter(objWineSet)
    {
        var html                    = '',
            intPrice                = parseInt(objWineSet.price, 10),
            intPriceWithTax         = Math.floor(intPrice * 1.08),
            intDiscountPrice        = this._getSetPrice(objWineSet, false),
            intDiscountPriceWithTax = this._getSetPrice(objWineSet, true),
            intStockMax             = objWineSet.stock,
            priceHtml               = '';

        if (intStockMax > 0)
        {
            if (intDiscountPrice >= intPrice)
            {
                priceHtml =
                    'セット価格:&nbsp;<span>{0} yen</span>&nbsp;<span>[税込&nbsp;{1} yen]</span>'.format(
                        intPrice.format(),
                        intPriceWithTax.format());
            }
            else
            {
                priceHtml =
                    '<span style="text-decoration:line-through;">通常価格:&nbsp;{0} yen</span>&nbsp;&nbsp;➡︎&nbsp;&nbsp;'.format(intPrice.format()) +
                    'セット特価:&nbsp;<span>{0} yen</span>&nbsp;<span>[税込&nbsp;{1} yen]</span>'.format(
                        intDiscountPrice.format(),
                        intDiscountPriceWithTax.format());
            }

            html =
                '<p>' +
                    priceHtml +
                '</p>' +
                '<section>' +
                    '数量:&nbsp;<input type="number" min="1" max="{0}" value="1" />'.format(intStockMax) +
                    '<img class="add-to-cart-img" src="../campaign/add_to_cart.png" title="買い物かごに入れる" />' +
                '</section>';
        }
        else
        {
            html =
                '<section>' +
                    '<span class="emphasis-span">完売しました。</span>' +
                '</section>';
        }

        this.$m_footer.html(html);
    }

    constructor(intId)
    {
        super($('div#page-contents'));

        this.m_intId   = intId;
        this.$m_header = $('<div id="wine-set-header"></div>');
        this.$m_body   = $('<div id="wine-set-body"></div>');
        this.$m_footer = $('<div id="wine-set-footer"></div>');
    }

    renderChildren()
    {
        this.$m_header.appendTo(this.$m_parentContainer);
        this.$m_body.appendTo(this.$m_parentContainer);
        this.$m_footer.appendTo(this.$m_parentContainer);

        var objThis = this;

        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wine-sets/{0}'.format(objThis.m_intId),
            dataType: 'json',
            success: function(data)
            {
                var rgobjWineSet = data.wines;
                if (rgobjWineSet && (rgobjWineSet.length == 1))
                {
                    var objWineSet = rgobjWineSet[0];

                    objThis._renderHeader(objWineSet);
                    objThis._renderBody(objWineSet);
                    objThis._renderFooter(objWineSet);
                }
            },

            error: function() {}
        });
    }

    postRender()
    {
        this.$m_footer.off('click', 'img.add-to-cart-img');
        this.$m_footer.on('click', 'img.add-to-cart-img', function()
        {
            var intFirstSetCode = 50000,
                intId           = UrlQuery.getValue('id'),
                intQty          = $(this).siblings('input').val();

            $.ajax(
            {
                url:  '../cart.php',
                type: 'POST',
                data:
                {
                    action: 'add',
                    pid:    parseInt(intId, 10) + intFirstSetCode,
                    qty:    intQty
                },

                success: function(strResponse)
                {
                    var returnUrl = encodeURIComponent(location.href);
                    location.href = '../cart.php?returnUrl={0}'.format(returnUrl);
                },

                error: function()
                {
                    console.error(barcode + ' cannot be added to the cart.');
                }
            });
        });
    }
}

