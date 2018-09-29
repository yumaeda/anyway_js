//-------------------------------------------------------
//
// WineDetailTable
//
//-------------------------------------------- YuMaeda --
class WineDetailTable extends HtmlControl
{
    constructor(objWine, $parentContainer)
    {
        super($parentContainer);

        this.m_objWine = objWine;
    }

    _loadComment(strProducer, $container)
    {
        var self = this;

        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wine-details/{0}'.format(strProducer),
            dataType: 'json',
            success: function(data)
            {
                var barcodeNumber = UrlQuery.getValue('id'),
                    itemHtml      = '',
                    rgobjDetail   = data.details,
                    cItem         = rgobjDetail.length,
                    objDetail     = null,
                    fItemFound    = false;

                for (var i = 0; (!fItemFound && (i < cItem)); ++i)
                {
                    objDetail = rgobjDetail[i];

                    if (objDetail.barcode_number == barcodeNumber)
                    {
                        itemHtml = (objDetail.detail ? objDetail.detail.nl2br() : '');
                        fItemFound = true;
                    }
                }

                if (itemHtml && (itemHtml != 'null'))
                {
                    $container.html(itemHtml);
                }
            },

            error: function() {}
        });
    }

    _renderProducerDetail(strProducer, $container)
    {
        $.ajax(
        {
            url: '//anyway-grapes.jp/laravel5.3/public/api/v1/producer-details/{0}'.format(strProducer),
            dataType: 'json',
            success: function(data)
            {
                var rgobjDetail = data.details;
                if (rgobjDetail.length == 1)
                {
                    var html               = '',
                        objDetail          = rgobjDetail[0],
                        historyAndDetail   = objDetail.history_detail,
                        fieldDetail        = objDetail.field_detail,
                        fermentationDetail = objDetail.fermentation_detail,
                        originalContents   = objDetail.original_contents;

                    if (historyAndDetail)
                    {
                        html += '<h4>詳細・歴史について</h4>' + historyAndDetail.nl2br() + '<br />';
                    }

                    if (fieldDetail)
                    {
                        html += '<br /><h4>畑について</h4>' + fieldDetail.nl2br() + '<br />';
                    }

                    if (fermentationDetail)
                    {
                        html += '<br /><h4>醸造について</h4>' + fermentationDetail.nl2br();
                    }

                    $container.html(html);
                }
            },

            error: function() {}
        });
    }

    _generateCountryHtml()
    {
        var html = '';

        if (this.m_objWine.country)
        {
            html = '<a href="{0}" target="country_window">{1}</a>&nbsp;&gt;&nbsp;{2}</td>'.format(
                    AnywayUrlUtility.generateCountryPageUrl(this.m_objWine.country),
                    CountryInfo.getJpnName(this.m_objWine.country),
                    this.m_objWine.region_jpn);
        }

        return html;
    }

    renderChildren()
    {
        var innerTable = new TableTag();

        innerTable.addClass('wine-info-table');

        var typeRow     = new TableRow(),
            vintageRow  = new TableRow(),
            cepageRow   = new TableRow(),
            regionRow   = new TableRow(),
            capacityRow = new TableRow(),
            ratingRow   = new TableRow(),
            importerRow = new TableRow(),
            commentRow  = new TableRow();

        typeRow.addColumn(new TableColumn('タイプ'));
        typeRow.addColumn(new TableColumn(WineInfo.getJpnType(this.m_objWine.type)));

        vintageRow.addColumn(new TableColumn('生産年'));
        vintageRow.addColumn(new TableColumn(WineInfo.getVintageHtml(this.m_objWine)));

        cepageRow.addColumn(new TableColumn('品種'));
        cepageRow.addColumn(new TableColumn(this.m_objWine.cepage));

        regionRow.addColumn(new TableColumn('生産地'));
        regionRow.addColumn(new TableColumn(this._generateCountryHtml()));

        capacityRow.addColumn(new TableColumn('容量'));
        capacityRow.addColumn(new TableColumn('{0}ml'.format(this.m_objWine.capacity)));

        ratingRow.addColumn(new TableColumn('評価'));
        ratingRow.addColumn(new TableColumn(WineInfo.getRatingsHtml(this.m_objWine)));

        importerRow.addColumn(new TableColumn('輸入元'));
        importerRow.addColumn(new TableColumn(WineInfo.getImporterName(this.m_objWine)));

        commentRow.addColumn(new TableColumn('コメント'));
        var commentCol = new TableColumn('');
        commentCol.addClass('comment-td');
        commentRow.addColumn(commentCol);

        innerTable.body.addRow(typeRow);
        innerTable.body.addRow(vintageRow);
        innerTable.body.addRow(cepageRow);
        innerTable.body.addRow(regionRow);
        innerTable.body.addRow(capacityRow);
        innerTable.body.addRow(ratingRow);
        innerTable.body.addRow(importerRow);
        innerTable.body.addRow(commentRow);

        var addToCart = new AddToCartControl(),
            iframeUrl = '../campaign/index.html?producer={0}'.format(encodeURIComponent(this.m_objWine.producer)),
            html      =
            '<table>' +
                '<tbody>' +
                    '<tr>' +
                        '<td class="wine-detail-img-td">' + 
                            HtmlUtility.generateImgHtml(this.m_objWine.barcode_number, '') + '<br /><br />' +
                            '<span>画像は実際とは異なる場合があります。</span>' +
                        '</td>' +
                        '<td class="wine-detail-td">' +
                            '<span class="wine-title-label">{0}'.format(this.m_objWine.combined_name_jpn) +
                            '<br /><br />' +
                            'by&nbsp;<a href="{0}" class="producer-lnk" rel="{1}" target="producer_window">{2}</a>'.format('#', this.m_objWine.producer, this.m_objWine.producer_jpn) +
                            '<br /><br />' +
                            innerTable.toHtml() +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
                '<tfoot>' +
                    '<tr>' +
                        '<td>&nbsp;</td>' +
                        '<td style="text-align:center;padding:25px;">' +
                            addToCart.toHtml(this.m_objWine) +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="2" style="text-align:center;padding:25px;">' +
                            '<a href="javascript:window.top.close()"><img src="../images/buttons/back.gif" alt="戻る" class="back-img" /></a>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="2" class="producer-detail-td">' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="2">' +
                            '<iframe style="padding-top:50px;" src="{0}" width="100%" height="310" scrolling="no" frameborder="0"></iframe>'.format(iframeUrl) +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="2" style="text-align:center;padding:25px;">' +
                            '<a href="javascript:window.top.close()"><img src="../images/buttons/back.gif" alt="戻る" class="back-img" /></a>' +
                        '</td>' +
                    '</tr>' +
                '</tfoot>' +
            '</table>';

        this.$m_parentContainer.html(html);

        ProducerLinkUpdater.update(this.$m_parentContainer);
        addToCart.registerEventHandler(this.$m_parentContainer);
        this._loadComment(this.m_objWine.producer, $('td.comment-td'));
        this._renderProducerDetail(this.m_objWine.producer, $('td.producer-detail-td'));
    }
}

