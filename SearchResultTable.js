//-------------------------------------------------------
//
// SearchResultTable
//
//-------------------------------------------- YuMaeda --
class SearchResultTable extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_rgobjWine           = null;
        this.m_rgobjFilteredWine   = null;
        this.m_cItemPerPage        = 15;
        this.m_iPage               = 0;
        this.m_strTypeFilter       = '';
        this.m_strPriceRangeFilter = '';
        this.m_fProducerLink       = true;
    }

    _generatePaginationHtml(cPage)
    {
        var html = '';

        if (cPage > 1)
        {
            var iBeginPage = 0,
                strPage    = '';

            if (this.m_iPage > 0)
            {
                html += '<a href="#" class="pagination-lnk" rel="' + (this.m_iPage - 1) + '">&lt;</a>';
            }

            if ((cPage > 10) && (this.m_iPage > 5))
            {
                iBeginPage = (this.m_iPage - 5);
            }

            for (var i = iBeginPage; ((i < cPage) && (i < (iBeginPage + 10))); ++i)
            {
                strPage = i + 1;

                if (i == this.m_iPage)
                {
                    html += '<span class="selected-label">' + (this.m_iPage + 1) + '</span>';
                }
                else
                {
                    html += '<a href="#" class="pagination-lnk" rel="' + i + '">' + strPage + '</a>';
                }
            }

            if ((this.m_iPage + 1) < cPage)
            {
                html += '<a href="#" class="pagination-lnk" rel="' + (this.m_iPage + 1) + '">&gt;</a>';
            }
        }

        return ('<div class="pagination-pane">' + html + '</div>');
    }

    _generateTypeSelectHtml(selectedType)
    {
        var strLang    = UrlQuery.getValue('lang'),
            html       = '',
            selectTag  = new SelectTag(),
            iOption    = 1,
            optionText = '';

        selectTag.addAttr('id', 'type-select');
        selectTag.addClass('filter-select');
        selectTag.addOption('指定なし', -1);

        for (var key in WineInfo.wineTypeHash)
        {
            if ((selectedType != '') && (key == selectedType))
            {
                selectTag.setSelectedIndex(iOption);
            }

            optionText = ((strLang == 'fr') || (strLang == 'en')) ? key : WineInfo.getJpnType(key);
            selectTag.addOption(optionText, key);

            ++iOption;
        }

        return selectTag.toHtml();
    }

    _generatePriceRangeSelectHtml(selectedRange)
    {
        var html       = '',
            selectTag  = new SelectTag(),
            optionText = '',
            rgstrPriceRange =
            [
                '1,000〜1,999円',
                '2,000〜2,999円',
                '3,000〜3,999円',
                '4,000〜4,999円',
                '5,000〜5,999円',
                '6,000〜6,999円',
                '7,000〜7,999円',
                '8,000〜8,999円',
                '9,000〜9,999円',
                '10,000円〜'
            ];

        selectTag.addAttr('id', 'price-select');
        selectTag.addClass('filter-select');
        selectTag.addOption('指定なし', -1);

        for (var i = 0; i < rgstrPriceRange.length; ++i)
        {
            optionText = rgstrPriceRange[i];
            if ((selectedRange != '') && (i == selectedRange))
            {
                selectTag.setSelectedIndex(i + 1);
            }

            selectTag.addOption(optionText, i);
        }

        return selectTag.toHtml();
    }

    clearFilter()
    {
        this.m_rgobjFilteredWine   = null;
        this.m_strTypeFilter       = '';
        this.m_strPriceRangeFilter = '';
    }

    set wines(value) { this.m_rgobjWine = value; }
    set typeFilter(value) { this.m_strTypeFilter = value; }
    set fProducerLink(value) { this.m_fProducerLink = value; }

    renderChildren()
    {
        this.m_iPage = 0;
        this.$m_parentContainer.html(this.toHtml());
    }

    postRender()
    {
        var self = this;

        this.$m_parentContainer.off('click', 'div.pagination-pane a.pagination-lnk');
        this.$m_parentContainer.on('click', 'div.pagination-pane a.pagination-lnk', function()
        {
            self.m_iPage = parseInt($(this).attr('rel'), 10);
            self.$m_parentContainer.html(self.toHtml());
            ProducerLinkUpdater.update(self.$m_parentContainer);

            return false;
        });

        this.$m_parentContainer.off('change', 'select.filter-select');
        this.$m_parentContainer.on('change', 'select.filter-select', function()
        {
            var filterValue = $(this).val();
            if (filterValue == -1)
            {
                self.clearFilter();
            }
            else
            {
                var selectorId = $(this).attr('id'),
                    filterBy   = 'type',
                    cWine      = self.m_rgobjWine.length,
                    objWine    = null;

                if (selectorId == 'type-select')
                {
                    self.m_strTypeFilter = filterValue;
                }
                if (selectorId == 'price-select')
                {
                    self.m_strPriceRangeFilter = filterValue;
                }

                self.m_rgobjFilteredWine = [];
                for (var i = 0; i < cWine; ++i)
                {
                    objWine = self.m_rgobjWine[i];

                    if ((self.m_strTypeFilter == '') && (self.m_strPriceRangeFilter == ''))
                    {
                        self.m_rgobjFilteredWine.push(objWine);
                    }
                    else
                    {
                        var fTypeMatch =
                            ((self.m_strTypeFilter == '') || (self.m_strTypeFilter == objWine['type']));

                        var fPriceMatch = (self.m_strPriceRangeFilter == ''),
                            intPrice    = objWine['price'];

                        if (!fPriceMatch)
                        {
                            switch (self.m_strPriceRangeFilter)
                            {
                            case '0':
                                fPriceMatch = ((intPrice >= 1000) && (intPrice < 1999));
                                break;
                            case '1':
                                fPriceMatch = ((intPrice >= 2000) && (intPrice < 2999));
                                break;
                            case '2':
                                fPriceMatch = ((intPrice >= 3000) && (intPrice < 3999));
                                break;
                            case '3':
                                fPriceMatch = ((intPrice >= 4000) && (intPrice < 4999));
                                break;
                            case '4':
                                fPriceMatch = ((intPrice >= 5000) && (intPrice < 5999));
                                break;
                            case '5':
                                fPriceMatch = ((intPrice >= 6000) && (intPrice < 6999));
                                break;
                            case '6':
                                fPriceMatch = ((intPrice >= 7000) && (intPrice < 7999));
                                break;
                            case '7':
                                fPriceMatch = ((intPrice >= 8000) && (intPrice < 8999));
                                break;
                            case '8':
                                fPriceMatch = ((intPrice >= 9000) && (intPrice < 9999));
                                break;
                            case '9':
                                fPriceMatch = (intPrice >= 10000);
                                break;
                            }
                        }
                    }

                    if (fTypeMatch && fPriceMatch)
                    {
                        self.m_rgobjFilteredWine.push(objWine);
                    }
                }
            }

            self.renderChildren();
            ProducerLinkUpdater.update(self.$m_parentContainer);
        });

        var addToCart = new AddToCartControl();
        addToCart.registerEventHandler(this.$m_parentContainer);

        if (this.m_fProducerLink)
        {
            ProducerLinkUpdater.update(this.$m_parentContainer);
        }
    }

    toHtml()
    {
        var rgobjWine = (this.m_rgobjFilteredWine == null) ?
            this.m_rgobjWine :
            this.m_rgobjFilteredWine;

        var cWine   = rgobjWine.length,
            objWine = null,
            cPage   = Math.floor(cWine / this.m_cItemPerPage);

        if ((cWine % this.m_cItemPerPage) > 0)
        {
            ++cPage;
        }

        var iFirstWine = this.m_iPage * this.m_cItemPerPage + 1,
            iLastWine  = iFirstWine + this.m_cItemPerPage - 1;
        if (iLastWine > cWine)
        {
            iLastWine = cWine;
        }

        var filterHtml =
            this._generateTypeSelectHtml(this.m_strTypeFilter) +
            '&nbsp;&nbsp;&nbsp;' +
            this._generatePriceRangeSelectHtml(this.m_strPriceRangeFilter),
            wineCountHtml = '<span>{0}&nbsp;件中&nbsp;{1}〜{2}&nbsp;件を表示</span>'.format(cWine.format(), iFirstWine, iLastWine);

        var tableTag      = new TableTag(),
            paginationRow = new TableRow(),
            paginationCol = new TableColumn(this._generatePaginationHtml(cPage));
        paginationCol.addAttr('colspan', 3);
        paginationCol.addClass('pagination-td');
        paginationRow.addColumn(new TableColumn(wineCountHtml));
        paginationRow.addColumn(paginationCol);

        var filterRow = new TableRow(),
            filterCol = new TableColumn(filterHtml);
        filterCol.addAttr('colspan', '4');
        filterRow.addColumn(filterCol);

        var blankRow = new TableRow(),
            blankCol = new TableColumn('&nbsp;');
        blankCol.addAttr('colspan', '4');
        blankRow.addColumn(blankCol);

        tableTag.body.addRow(paginationRow);
        tableTag.body.addRow(filterRow);
        tableTag.body.addRow(blankRow);

        var iStart  = this.m_iPage * this.m_cItemPerPage,
            iEnd    = iStart + this.m_cItemPerPage,
            listTag = new ListTag(false);

        listTag.addClass('searched-wine-list');

        for (var i = iStart; ((i < iEnd) && (i < cWine)); ++i)
        {
            objWine = rgobjWine[i];

            var detailUrl     = './index.php?submenu=wine_detail&id={0}&lang=ja'.format(objWine.barcode_number),
                strVintage    = (objWine.vintage == 'N.V.') ? objWine.vintage : '{0}年'.format(objWine.vintage),
                wineInfoTable = new WineInfoTable(objWine, true),
                colHtml       = wineInfoTable.toHtml();

            listTag.addItem(new ListItemTag(colHtml));
        }

        var strNavigationTable = tableTag.toHtml();
        return (strNavigationTable + listTag.toHtml() + strNavigationTable);
    }
}

