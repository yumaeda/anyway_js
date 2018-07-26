//-------------------------------------------------------
//
// WineInfoTable
//
//-------------------------------------------- YuMaeda --
class WineInfoTable
{
    constructor(objWine, fShowCartBtn)
    {
        this.m_objWine      = objWine;
        this.m_fShowCartBtn = fShowCartBtn;
    }

    toHtml()
    {
        var detailUrl  = '//anyway-grapes.jp/store/index.php?submenu=wine_detail&id={0}&lang=ja'.format(this.m_objWine.barcode_number),
            tableTag    = new TableTag(),
            tableRow    = new TableRow(),
            detailHtml  =
                '<span class="wine-title-label">{0}&nbsp;{1}</span>'.format(this.m_objWine.vintage, this.m_objWine.combined_name_jpn) +
                '<br /><br />' +
                'by&nbsp;<a href="javascript:void(0)" class="producer-lnk" rel="{0}" target="producer_window">{1}</a>'.format(this.m_objWine.producer, this.m_objWine.producer_jpn) +
                '<br /><br />' +
                '<table class="wine-info-table">' +
                    '<tr>' +
                        '<td>タイプ</td>' +
                        '<td>{0}</td>'.format(WineInfo.getJpnType(this.m_objWine.type)) +
                    '</tr>' +
                    '<tr>' +
                        '<td>生産地</td>' +
                        '<td>' +
                            '<a href="{0}" target="country_window">{1}</a>&nbsp;&gt;&nbsp;{2}'.format(
                            UrlUtility.generateCountryPageUrl(this.m_objWine.country),
                            CountryInfo.getJpnName(this.m_objWine.country),
                            this.m_objWine.region_jpn) +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>容量</td>' +
                        '<td>{0}ml</td>'.format(this.m_objWine.capacity) +
                    '</tr>' +
                '</table>';

        var detailLnkCol = new TableColumn('<a href="{0}" target="wine_detail">{1}</a>'.format(detailUrl, HtmlUtility.generateImgHtml(this.m_objWine.barcode_number, '')));
        detailLnkCol.addClass('wine-img-td');
        tableRow.addColumn(detailLnkCol);
        tableRow.addColumn(new TableColumn(detailHtml));

        if (this.m_fShowCartBtn)
        {
            var addToCart = new AddToCartControl(),
                actionCol = new TableColumn(addToCart.toHtml(this.m_objWine));

            actionCol.addClass('wine-action-td');
            tableRow.addColumn(actionCol);
        }

        tableTag.body.addRow(tableRow);
        return tableTag.toHtml();
    }
}

