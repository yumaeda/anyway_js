//-------------------------------------------------------
//
// HorizontallyScrollable
//
//-------------------------------------------- YuMaeda --
class HorizontallyScrollable extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_rgobjItem = null;
        this.m_strLang   = UrlQuery.getValue('lang');
        if (this.m_strLang == '')
        {
            this.m_strLang = 'ja';
        }
    }

    _generateDetailPageUrl(objItem)
    {
        return './index.php?submenu=wine_detail&id={0}&lang={1}'.format(objItem.barcode_number, this.m_strLang);
    }

    _renderChildren(self)
    {
        if (self.m_rgobjItem)
        {
            var tableTag          = new TableTag(),
                tableRow          = new TableRow(),
                cItem             = self.m_rgobjItem.length,
                objItem           = null,
                intMaxTitleLength = 40,
                strTitle          = '';

            for (var i = 0; i < cItem; ++i)
            {
                objItem  = self.m_rgobjItem[i];
                strTitle = ((self.m_strLang == 'fr') || (self.m_strLang == 'en')) ?
                    '{0} {1} / {2}'.format(objItem.vintage, objItem.combined_name, objItem.producer) :
                    '{0} {1} / {2}'.format(objItem.vintage, objItem.combined_name_jpn, objItem.producer_jpn);

                if (strTitle.length > intMaxTitleLength)
                {
                    strTitle = strTitle.substr(0, intMaxTitleLength - 3) + '...';
                }

                var colHtml =
                    '<a href="{0}" target="wine_detail">'.format(self._generateDetailPageUrl(objItem)) +
                        HtmlUtility.generateImgHtml(objItem.barcode_number, 'wine-img') +
                        '<div>' + strTitle + '</div>' +
                    '</a>';

                tableRow.addColumn(new TableColumn(colHtml));
            }                        

            tableTag.body.addRow(tableRow);
            self.$m_parentContainer.html(tableTag.toHtml());
        }
    }

    set items(rgobjItem) { this.m_rgobjItem = rgobjItem; }

    renderChildren()
    {
        this._renderChildren(this);
    }
}

