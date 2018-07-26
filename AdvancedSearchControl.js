//-------------------------------------------------------
//
// AdvancedSearchControl
//
//-------------------------------------------- YuMaeda --
class AdvancedSearchControl extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);
    }

    renderChildren()
    {
        var html = 'Advanced Search!!';

        this.$m_parentContainer.html(html);
    }
}

/*
var WineSearchContents =
{
    strType: '',
    strSearchCondition: '',
    _$contentsDiv: null,
    _rgobjWine: null,
    _cMaxRender: 15,

    onInit: function($contentsDiv)
    {
        $('div.backLinkPane').fadeOut(500);

        WineSearchContents.strSearchCondition = '';
        WineSearchContents._$contentsDiv = $contentsDiv;
        WineSearchContents.createInputControls();
    },

    createInputControls: function()
    {
        var urlQuery = new UrlQuery(),
            strLang  = urlQuery.getValue('lang'),
            tableTag = new TableTag();

        tableTag.addClass('contentsWidth collapsedBorder');

        tableTag.addRowToHead(null, [ 'paddingTopLarge' ]);
        tableTag.addColToHead('&nbsp;', [{ key: 'colspan', value: '2' }], null);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('PRODUCER_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('<input type="text" id="producerFld" />', null, [ 'valueColumn' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('ITEM_NAME_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('<input type="text" id="itemNameFld" />', null, [ 'valueColumn' ]);

        var cultivationMethodSelectHtml =
            WineSearchContents._generateCultivationMethodSelectHtml();

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('WINE_TYPE_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('', null, [ 'valueColumn typeSelectCol' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('COUNTRY_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('', null, [ 'valueColumn countrySelectCol' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('REGION_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('', null, [ 'valueColumn regionSelectCol' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('CEPAGE_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol(generateCepageSelectHtml(strLang), null, [ 'textXSmall jpnFont valueColumn' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('CULTIVATION_METHOD_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol(cultivationMethodSelectHtml, null, [ 'valueColumn' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('IMPORTER_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('', null, [ 'valueColumn importerSelectCol' ]);

        var yearSymbol = Strings.getString('YEAR_SYMBOL');

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}:&nbsp;</label>'.format(Strings.getString('VINTAGE_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('{0}&nbsp;{1}&nbsp;{2}&nbsp;{3}'.format(
            '<input type="text" class="yearFld" id="vintageFrom" maxlength="4" value="" />',
            Constants['RANGE_SYMBOL'],
            '<input type="text" class="yearFld" id="vintageTo" maxlength="4" value="">',
            yearSymbol), null, [ 'textSmall valueColumn' ]);

        tableTag.addRow(null, [ 'searchInputRow' ]);
        tableTag.addCol('<label>{0}&nbsp;({1}):&nbsp;</label>'.format(Strings.getString('PRICE_STR'), Strings.getString('TAX_INCLUDED_STR')), null, [ 'labelColumn textSmall' ]);
        tableTag.addCol('{0}&nbsp;{1}&nbsp;{2}&nbsp;yen'.format(
            '<input type="text" class="priceFld" id="priceFrom" maxlength="7" value="">',
            Constants['RANGE_SYMBOL'],
            '<input type="text" class="priceFld" id="priceTo" maxlength="7" value="">'), null, [ 'engFont textSmall valueColumn' ]);

        tableTag.addRow(null, [ 'paddingTopLarge' ]);
        tableTag.addCol('<input type="button" id="searchButton" value="{0}" />'.format(Strings.getString('SEARCH_STR')),
            [{ key: 'colspan', value: '2' }],
            [ 'textCenter' ]);

        tableTag.addRow(null, [ 'paddingBottomMedium' ]);
        tableTag.addCol('&nbsp;', [{ key: 'colspan', value: '2' }], null);

        WineSearchContents._$contentsDiv.html(tableTag.toHtml());
        WineSearchContents._$contentsDiv.find('input#searchButton').click(WineSearchContents.onSearch);

        WineSearchContents.renderTypeSelectHtml(WineSearchContents._$contentsDiv.find('td.typeSelectCol'), false, '');
        WineSearchContents.renderCountrySelectHtml(WineSearchContents._$contentsDiv.find('td.countrySelectCol'), false, '');
        WineSearchContents.renderRegionSelectHtml(WineSearchContents._$contentsDiv.find('td.regionSelectCol'), '', '');
        WineSearchContents.renderImporterSelectHtml(WineSearchContents._$contentsDiv.find('td.importerSelectCol'), '');

        $('div.contents').on('change', 'select#typeSelect', function()
        {
            WineSearchContents.strType =
                ($(this).val() == -1) ? '' : $(this).val();

            WineSearchContents.renderCountrySelectHtml(WineSearchContents._$contentsDiv.find('td.countrySelectCol'), false, '');
            WineSearchContents.renderRegionSelectHtml(WineSearchContents._$contentsDiv.find('td.regionSelectCol'), '', '');
        });

        $('div.contents').on('change', 'select#countrySelect', function()
        {
            var strCountry = ($(this).val() == -1) ? '' : $(this).val();
            WineSearchContents.renderRegionSelectHtml(WineSearchContents._$contentsDiv.find('td.regionSelectCol'), strCountry, '');
        });
    },

    onSearch: function()
    {
	if ($('div.backLinkPane #sortOrderSelect').length == 0)
	{
	    $('div.newInfoPane').fadeOut(500);
	    $('div.backLinkPane').fadeIn(500);
	    WineSearchContents._renderSortOrderSelect();
	}

        var orderByColumn        = $('div.backLinkPane #sortOrderSelect').val(),
            strProducer          = WineSearchContents._$contentsDiv.find('input#producerFld').val(),
            strItemName          = WineSearchContents._$contentsDiv.find('input#itemNameFld').val(),
            vintageFrom          = WineSearchContents._$contentsDiv.find('input#vintageFrom').val(),
            vintageTo            = WineSearchContents._$contentsDiv.find('input#vintageTo').val(),
            priceFrom            = WineSearchContents._$contentsDiv.find('input#priceFrom').val(),
            priceTo              = WineSearchContents._$contentsDiv.find('input#priceTo').val(),
            strCountry           = WineSearchContents._$contentsDiv.find('select#countrySelect').val(),
            strRegion            = WineSearchContents._$contentsDiv.find('select#regionSelect').val(),
            strType              = WineSearchContents._$contentsDiv.find('select#typeSelect').val(),
            strCepage            = WineSearchContents._$contentsDiv.find('select#cepageSelect').val(),
            fMonoCepage          = WineSearchContents._$contentsDiv.find('input#mono_cepage').prop('checked'),
            strImporter          = WineSearchContents._$contentsDiv.find('select#importerSelect option:selected').text(),
            strCultivationMethod = WineSearchContents._$contentsDiv.find('select#cultivationMethodSelect').val();

        if (WineSearchContents.strSearchCondition === '')
        {
            var strCondition = '';

            strCondition = WineSearchContents._appendGeAndCondition(strCondition, 'barcode_number', 1001);
            //strCondition = WineSearchContents._appendGeAndCondition(strCondition, 'stock', 1);
            //strCondition = WineSearchContents._appendGeAndCondition(strCondition, 'price', 1); // Exclude 0 yen items.
            strCondition = WineSearchContents._appendGeAndCondition(strCondition, 'vintage', vintageFrom);
            strCondition = WineSearchContents._appendLeAndCondition(strCondition, 'vintage', vintageTo);
            strCondition = WineSearchContents._appendGeAndCondition(strCondition, 'price', priceFrom);
            strCondition = WineSearchContents._appendLeAndCondition(strCondition, 'price', priceTo);
            strCondition = WineSearchContents._appendNeqAndCondition(strCondition, 'type', 'Food');

            if (strCountry != -1)
            {
                strCondition = WineSearchContents._appendEqAndCondition(strCondition, 'country', strCountry);
            }

            if (strType != -1)
            {
                strCondition = WineSearchContents._appendEqAndCondition(strCondition, 'type', strType);
            }

            if (strProducer)
            {
                strProducer = strProducer.replace(/[-|　| |・]+/g, '_');
                strCondition =
                    WineSearchContents._appendContainsAndCondition(strCondition, 'producer', strProducer, true);
            }

            if (strItemName && strCondition)
            {
                // First replace all the full-width space to half-width space.
                strItemName = strItemName.replace(/[-|　| |・]+/g, '_');
                var nameCondition = '((village_jpn LIKE "%{0}%") OR (name_jpn LIKE "%{0}%") OR (village LIKE "%{0}%") OR (name LIKE "%{0}%"))'.format(strItemName);
                strCondition = '{0} AND {1}'.format(strCondition, nameCondition);
            }

            if (strRegion != '-1')
            {
                strCondition = WineSearchContents._appendEqAndCondition(strCondition, 'region', strRegion);
            }

            if (strCepage != '-1')
            {
                if (fMonoCepage)
                {
                    strCondition =
                        WineSearchContents._appendEqAndCondition(strCondition, 'cepage', '{0}100%'.format(strCepage));
                }
                else
                {
                    strCondition =
                        WineSearchContents._appendContainsAndCondition(strCondition, 'cepage', strCepage, false);
                }
            }

            if (strImporter != Strings.getString('NOT_SPECIFY_STR'))
            {
                strCondition =
                    WineSearchContents._appendEqAndCondition(strCondition, 'importer', strImporter);
            }

            if (strCultivationMethod != '-1')
            {
                strCondition =
                    WineSearchContents._appendEqAndCondition(strCondition, 'cultivation_method', strCultivationMethod, false);
            }

            WineSearchContents.strSearchCondition = strCondition;
        }

        WineSearchContents.renderSearchResult(WineSearchContents._$contentsDiv, WineSearchContents.strSearchCondition, orderByColumn);
    },

    _generateWineDescriptionHtml: function(objWine)
    {
        var html = '';

        if (objWine)
        {
            var urlQuery    = new UrlQuery(),
                strLang     = urlQuery.getValue('lang'),
                strType     = (((strLang == 'fr') || (strLang == 'en')) ? objWine.type : wineTypeHash[objWine.type].name),
                strProducer = (((strLang == 'fr') || (strLang == 'en')) ? WineUtility.getProducer(objWine): WineUtility.getJpnProducer(objWine)),
                strName     = (((strLang == 'fr') || (strLang == 'en')) ? objWine.combined_name : objWine.combined_name_jpn);

            html = '<span class="textXSmall textItalic">[{0}]&nbsp;&nbsp;{1}</span></span><br /><span>{2}&nbsp;&nbsp;{3}</span><br /><br />{4}:&nbsp;{5}'.format(
                strType,
                strProducer,
                objWine.vintage,
                strName,
                Strings.getString('CEPAGE_STR'),
                objWine.cepage);
        }

        return html;
    },

    _showMoreResults: function()
    {
        WineSearchContents._cMaxRender = $('tr.searchResultRow').length;

        $.ajax(
        {
            url:  '//anyway-grapes.jp/is_authenticated.php',
            type: 'GET',
            data: {},

            success: function(strResponse)
            {
                var cWine       = WineSearchContents._rgobjWine.length,
                    iStart      = WineSearchContents._cMaxRender,
                    objWine     = null,
                    html        = '';

                WineSearchContents._cMaxRender += 15;

                for (var i = iStart; (i < cWine) && (i < WineSearchContents._cMaxRender); ++i)
                {
                    objWine = WineSearchContents._rgobjWine[i];

                    html += '<tr class="paddingBottomMedium searchResultRow">' +
                                '<td class="wineSmallImgCol">' + WineUtility.generateImgHtml(objWine.barcode_number, '') + '</td>' +
                                '<td class="textXSmall wineDescription">';

                    html += WineSearchContents._generateWineDescriptionHtml(objWine);

                    html += '</td>';

                    if (WineUtility.isPurchasableItem(objWine))
                    {
                        var price       = objWine.price,
                            cartImgHtml = '<img id="{0}" class="addToCartBtn clickableImg" src="../campaign/add_to_cart.png" />'.format(objWine.barcode_number);

                        if (WineUtility.isHappyBoxItem(objWine))
                        {
                            cartImgHtml += 
                                '<img src="http://anyway-grapes.jp/images/happy_box_icon.png" class="happyBoxIcon clickableImg" />';
                        }

                        var fMember   = (strResponse == 'TRUE'),
                            priceHtml = generatePriceHtmlForSearchResult(objWine, fMember);

                        if (WineUtility.isComingSoonItem(objWine))
                        {
                            priceHtml =
                                priceHtml + '<br /><br /><span class="jpnText" style="font-size:14px;color:red;">{0}</span>'.format(Constants['COMING_SOON_MSG'].format(objWine.etc));
                        }

                        if ((price <= 0) || (objWine.stock <= 0))
                        {
                            cartImgHtml = '';
                        }

                        html +=
                                '<td class="priceColumn textNoWrap engFont textSmall textRight textMiddle">' +
                                    priceHtml +
                                '</td>' +
                                '<td class="textMiddle textCenter cartCol">' +
                                    cartImgHtml +
                                '</td>' +
                            '</tr>';
                    }
                    else
                    {
                        html +=
                                '<td colspan="2" class="textNoWrap engFont textRight textMiddle">' +
                                    '<span style="font-size:16px;color:red;">Sold Out</span>' +
                                '</td>' +
                            '</tr>';
                    }
                }

                if (cWine > WineSearchContents._cMaxRender)
                {
                    html += '<tr class="paddingBottomMedium">' +
                                '<td colspan="4" class="textCenter">' +
                                    '<a class="showMoreLnk" href="#"><img src="../images/buttons/show_more.gif" class="clickableImg" /></a>' +
                                '</td>' +
                            '</tr>';
                }

                console.log($('table.searchResultTable').length);
                $('table.searchResultTable').append(html);
            },

            error: function() {}
        });
    },

    registerAddToCartEvent: function($contentsDiv, intQty)
    {
        $contentsDiv.off('click', 'img.addToCartBtn');
        $contentsDiv.on('click', 'img.addToCartBtn', function(event)
        {
            event.stopPropagation();

            var strBarcode = this.id,
                $this      = $(this),
                quantity   = intQty ? intQty : ($this.closest('div.cartPane').find('input.qtyInput').val());

            $.ajax(
            {
                url:  '../cart.php',
                type: 'POST',
                data:
                {
                    action: 'add',
                    pid:    strBarcode,
                    qty:    quantity
                },

                success: function(strResponse)
                {
                    $this.notify(Strings.getString('ADDED_TO_CART_MSG').format(quantity),
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

        $contentsDiv.off('click', 'img.happyBoxIcon');
        $contentsDiv.on('click', 'img.happyBoxIcon', function(event)
        {
            event.stopPropagation();

            var $this      = $(this),
                strBarcode = $this.siblings('.addToCartBtn').attr('id'),
                quantity   = intQty ? intQty : ($this.siblings('input.qtyInput').val());

            $.ajax(
            {
                url:  '../cart.php',
                type: 'POST',
                data:
                {
                    action:    'add',
                    cart_type: 1,
                    pid:       strBarcode,
                    qty:       quantity
                },

                success: function(strResponse)
                {
                    $this.notify(Strings.getString('ADDED_TO_HAPPY_BOX_MSG').format(quantity),
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
    },

    renderSearchResult: function($contents, strSearchCondition, orderByColumn)
    {
	WineSearchContents._cMaxRender = 15;

        $.ajax(
        {
            url : "../wines/get_items.php",
            data:
            {
                dbTable: 'wines',
                condition: '(availability = "Online" AND apply <> "DP") AND {0}'.format(strSearchCondition),
                orderBy: orderByColumn
            },

            dataType: "json",
            success: function(rgobjWine)
            {
                WineSearchContents._rgobjWine = rgobjWine;

                var $contents = $('div.contents div.mainContents'),
                    cWine     = rgobjWine.length,
                    objWine   = null,
                    tableTag  = new TableTag();

                tableTag.addClass('contentsWidth collapsedBorder searchResultTable');

                tableTag.addRowToHead(null, [ 'paddingBottomMediumLarge paddingTopXLarge' ]);
                tableTag.addColToHead('{0}&nbsp;{1}:&nbsp;&nbsp;<span class="engFont">{2}</span>&nbsp;{3}&nbsp;{4}'.format(
                    Constants['LEFT_BRACKET'],
                    Strings.getString('NUMBER_OF_MACHED_WINES'),
                    cWine,
                    Strings.getString('TYPE_STR'),
                    Constants['RIGHT_BRACKET']), [{ key: 'colspan', value: '4' }], [ 'textSmall textCenter' ]);

                $.ajax(
                {
                    url:  '//anyway-grapes.jp/is_authenticated.php',
                    type: 'GET',
                    data: {},

                    success: function(strResponse)
                    {
                        var urlQuery    = new UrlQuery(),
                            strLang     = urlQuery.getValue('lang'),
                            cartImgHtml = '',
                            fMember     = (strResponse == 'TRUE');

                        for (var i = 0; (i < cWine) && (i < WineSearchContents._cMaxRender); ++i)
                        {
                            objWine = rgobjWine[i];

                            tableTag.addRow(null, [ 'paddingBottomMedium searchResultRow' ]);
                            tableTag.addCol(WineUtility.generateImgHtml(objWine.barcode_number, ''), null, [ 'wineSmallImgCol' ]);
                            tableTag.addCol(WineSearchContents._generateWineDescriptionHtml(objWine), null, [ 'textXSmall wineDescription']);

                            if (WineUtility.isPurchasableItem(objWine))
                            {
                                cartImgHtml = '<img id="{0}" class="addToCartBtn clickableImg" src="../campaign/add_to_cart.png" />'.format(objWine.barcode_number);
                                if (WineUtility.isHappyBoxItem(objWine))
                                {
                                    cartImgHtml += 
                                        '<img src="http://anyway-grapes.jp/images/happy_box_icon.png" class="happyBoxIcon clickableImg" />';
                                }
                         
                                var priceHtml = generatePriceHtmlForSearchResult(objWine, fMember);
                                if (WineUtility.isComingSoonItem(objWine))
                                {
                                    priceHtml =
                                        priceHtml + '<br /><br /><span class="jpnText" style="font-size:14px;color:red;">{0}</span>'.format(Constants['COMING_SOON_MSG'].format(objWine.etc));
                                }

                                tableTag.addCol(priceHtml, null, [ 'priceColumn textNoWrap engFont textSmall textRight textMiddle' ]);
                                tableTag.addCol(cartImgHtml, null, [ 'textMiddle textCenter cartCol' ] );
                            }
                            else
                            {
                                var soldOutHtml = '<span style="font-size:16px;color:red;">Sold Out</span>';
                                tableTag.addCol(
                                    soldOutHtml,
                                    [{ key: 'colspan', value: '2' }],
                                    [ 'textNoWrap engFont textRight textMiddle' ]);
                            }
                        }

                        if (cWine > WineSearchContents._cMaxRender)
                        {
                            tableTag.addRow(null, [ 'paddingBottomMedium' ]);
                            tableTag.addCol(
                                '<a class="showMoreLnk" href="#"><img src="../images/buttons/show_more.gif" class="clickableImg" /></a>',
                                [{ key: 'colspan', value: '4' }],
                                [ 'textCenter' ]);
                        }

                        $contents.html(tableTag.toHtml());

                        $contents.off('click', 'a.showMoreLnk');
                        $contents.on('click', 'a.showMoreLnk', function()
                        {
                            $(this).closest('tr').remove();
                            WineSearchContents._showMoreResults();

                            return false;
                        });

                        $contents.off('click', 'tr.searchResultRow', WineSearchContents.onDisplayWineDetail);
                        $contents.on('click', 'tr.searchResultRow', WineSearchContents.onDisplayWineDetail);

                        // Register event to zoom an image upon hover.
                        $contents.on('mouseenter', 'td.wineSmallImgCol img', function()
                        {
                            $(this).addClass('imgZoom');
                        });
                        $contents.on('mouseleave', 'td.wineSmallImgCol img', function()
                        {
                            $(this).removeClass('imgZoom');
                        });

                        $contents.on('click', 'td.wineSmallImgCol img', function()
                        {
                             $(this).removeClass('imgZoom');
                        });

                        WineSearchContents.registerAddToCartEvent($contents, 1);
                    },
                    
                    error: function(){}
                });
            },

            error: function()
            {
                console.error('WineSearchContents.onSearch: Ajax request failed.');
            }
        });
    },

    onDisplayWineDetail : function()
    {
        var strBarcode = $(this).find('img.addToCartBtn').attr('id');
        if (!strBarcode)
        {
            strBarcode = $(this).find('img').attr('alt');
        }

        var urlQuery = new UrlQuery(),
            strLang  = urlQuery.getValue('lang') ? urlQuery.getValue('lang') : 'ja',
            url      = './index.php?pc_view=1&lang={0}&submenu=wine_detail&id={1}'.format(strLang, strBarcode);

        window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes');
        return false;
    },

    renderTypeSelectHtml: function($container, fRenderLabel, selectedType)
    {
        var urlQuery   = new UrlQuery(),
            strLang    = urlQuery.getValue('lang'),
            html       = '',
            selectTag  = new SelectTag(),
            iOption    = 1,
            optionText = '';

        selectTag.addAttr('id', 'typeSelect');
        selectTag.addOption(Strings.getString('NOT_SPECIFY_STR'), -1);

        for (var key in wineTypeHash)
        {
            if (wineTypeHash[key].value < 10)
            {
                if ((selectedType != '') && (key == selectedType))
                {
                    selectTag.setSelectedIndex(iOption);
                }

                optionText = ((strLang == 'fr') || (strLang == 'en')) ? key : wineTypeHash[key].name;
                selectTag.addOption(optionText, key);
                ++iOption;
            }
        }

        html = selectTag.toHtml();

        if (fRenderLabel)
        {
            html = '<label class="textSmall">{0}:&nbsp;&nbsp;</label>'.format(Strings.getString('TYPE_STR')) + html;
        }

        $container.html(html);
    },

    renderCountrySelectHtml: function($container, fRenderLabel, selectedCountry)
    {
        var objParam = {};
        
        if (WineSearchContents.strType !== '')
        {
            objParam['type'] = WineSearchContents.strType;
        }

        $.ajax(
        {
            url : apiDirPath + 'get_countries.php',
            data: objParam,
            dataType: 'json',
            success: function(rgobjCountry)
            {
                rgobjCountry = rgobjCountry.sort(sortByCountry);

                var urlQuery  = new UrlQuery(),
                    strLang   = urlQuery.getValue('lang'),
                    selectTag = new SelectTag();

                selectTag.addAttr('id', 'countrySelect');
                selectTag.addOption(Strings.getString('NOT_SPECIFY_STR'), -1);

                var objCountry = null,
                    cCountry   = rgobjCountry.length,
                    strCountry = '',
                    optionText = '',
                    iSelected  = 0;

                for (var i = 0; i < cCountry; ++i)
                {
                    objCountry = rgobjCountry[i];
                    strCountry = objCountry['country'];
                    if (strCountry)
                    {
                        if ((selectedCountry != '') && (strCountry == selectedCountry))
                        {
                            iSelected = (i == 0) ? 1 : i;
                        }

                        optionText = ((strLang == 'fr') || (strLang == 'en')) ? strCountry : countryHash[strCountry];
                        selectTag.addOption(optionText, strCountry);
                    }
                }

                selectTag.setSelectedIndex(iSelected);

                var html = selectTag.toHtml();
                if (fRenderLabel)
                {
                    html = '<label class="textSmall">{0}:&nbsp;&nbsp;</label>'.format(Strings.getString('COUNTRY_STR')) + html;
                }

                $container.html(html);
            },

            error: function() {}
        });
    },

    renderRegionSelectHtml: function($parentContainer, strCountry, strRegion)
    {
        var objParam = {};
        
        if (WineSearchContents.strType !== '')
        {
            objParam['type'] = WineSearchContents.strType;
        }

        if (strCountry !== '')
        {
            objParam['country'] = strCountry;
        }

        $.ajax(
        {
            url : apiDirPath + 'get_regions.php',
            data: objParam,
            dataType: "json",
            success: function(rgobjRegion)
            {
                rgobjRegion = rgobjRegion.sort(sortByRegion);

                var urlQuery  = new UrlQuery(),
                    strLang   = urlQuery.getValue('lang'),
                    selectTag = new SelectTag();

                selectTag.addAttr('id', 'regionSelect');
                selectTag.addOption(Strings.getString('NOT_SPECIFY_STR'), -1);

                var objRegion  = null,
                    cRegion    = rgobjRegion.length,
                    optionText = '',
                    iSelected  = 0;

                for (var i = 0; i < cRegion; ++i)
                {
                    objRegion  = rgobjRegion[i];
                    optionText = ((strLang == 'fr') || (strLang == 'en')) ? objRegion['region'] : objRegion['region_jpn'];
                    selectTag.addOption(optionText, objRegion['region']);

                    if ((strRegion != '') && (objRegion['region'] == strRegion))
                    {
                        iSelected = (i + 1);
                    }
                }

                selectTag.setSelectedIndex(iSelected);
                $parentContainer.html(selectTag.toHtml());
            },

            error: function() {}
        });
    },

    renderImporterSelectHtml: function($parentContainer, strImporter)
    {
        $.ajax(
        {
            url : apiDirPath + 'get_importers.php',
            data: {},
            dataType: "json",
            success: function(rgobjImporter)
            {
                var selectTag = new SelectTag();
                selectTag.addAttr('id', 'importerSelect');
                selectTag.addOption(Strings.getString('NOT_SPECIFY_STR'), -1);

                var objImporter = null,
                    cImporter   = rgobjImporter.length,
                    iSelected   = 0;

                for (var i = 0; i < cImporter; ++i)
                {
                    objImporter = rgobjImporter[i];
                    selectTag.addOption(objImporter['importer'], i + 1);

                    if ((strImporter != '') &&
                        (objImporter['importer'] == strImporter))
                    {
                        iSelected = i;
                    }
                }

                selectTag.setSelectedIndex(iSelected);
                $parentContainer.html(selectTag.toHtml());
            },

            error: function() {}
        });
    },

    _generateCultivationMethodSelectHtml : function()
    {
        var urlQuery   = new UrlQuery(),
            strLang    = urlQuery.getValue('lang'),
            selectTag  = new SelectTag(),
            optionText = '';

        selectTag.addAttr('id', 'cultivationMethodSelect');
        selectTag.addOption(Strings.getString('NOT_SPECIFY_STR'), -1);
        selectTag.setSelectedIndex(0);

        for (var key in cultivationMethodHash)
        {
            optionText = ((strLang == 'fr') || (strLang == 'en')) ? key : cultivationMethodHash[key].name;
            selectTag.addOption(optionText, key);
        }

        return selectTag.toHtml();
    },

    _renderSortOrderSelect: function()
    {
        var $backLinkPane = $('div.backLinkPane');
        if ($backLinkPane.is(':visible'))
        {
            var selectTag = new SelectTag();
            selectTag.addAttr('id', 'sortOrderSelect');
            selectTag.setSelectedIndex(0);

            selectTag.addOption(Strings.getString('VINTAGE_STR'), 'vintage');
            selectTag.addOption(Strings.getString('ITEM_NAME_STR'), 'name_jpn');
            selectTag.addOption(Strings.getString('PRODUCER_STR'), 'producer_jpn');
            selectTag.addOption(Strings.getString('PRICE_STR'), 'price');

            $backLinkPane.fadeIn(500);
            $backLinkPane.html('<span class="textSmall">{0}:&nbsp;</span>{1}'.format(Strings.getString('SORT_ORDER_STR'), selectTag.toHtml()));
            $backLinkPane.find('#sortOrderSelect').on('change', function()
            {
                WineSearchContents.onSearch();
            });
        }
    },

    _appendEqAndCondition: function(strCondition, name, value)
    {
        if (name && value)
        {
            if (strCondition)
            {
                strCondition += ' AND ';
            }

            strCondition += ('(' + name + ' = "' + value + '")');
        }

        return strCondition;
    },

    _appendNeqAndCondition: function(strCondition, name, value)
    {
        if (name && value)
        {
            if (strCondition)
            {
                strCondition += ' AND ';
            }

            strCondition += ('(' + name + ' <> "' + value + '")');
        }

        return strCondition;
    },

    _appendContainsAndCondition: function(strCondition, name, value, fSearchJpnColumn)
    {
        if (name && value)
        {
            if (strCondition)
            {
                strCondition += ' AND ';
            }

            var engCondition = '({0} LIKE "%{1}%")'.format(name, value);
            if (!fSearchJpnColumn)
            {
                strCondition += engCondition;
            }
            else
            {
                var jpnCondition = '({0}_jpn LIKE "%{1}%")'.format(name, value);
                strCondition += '({0} OR {1})'.format(engCondition, jpnCondition);
            }
        }

        return strCondition;
    },

    _appendContainsOrCondition: function(strCondition, name, value, fSearchJpnColumn)
    {
        if (name && value)
        {
            if (strCondition)
            {
                strCondition += ' OR ';
            }

            var engCondition = '({0} LIKE "%{1}%")'.format(name, value);
            if (!fSearchJpnColumn)
            {
                strCondition += engCondition;
            }
            else
            {
                var jpnCondition = '({0}_jpn LIKE "%{1}%")'.format(name, value);
                strCondition += '({0} OR {1})'.format(engCondition, jpnCondition);
            }
        }

        return strCondition;
    },

    _appendLeAndCondition: function(strCondition, name, value)
    {
        if (name && value)
        {
            if (strCondition)
            {
                strCondition += ' AND ';
            }

            strCondition += ('(' + name + ' <= ' + value + ')');
        }

        return strCondition;
    },

    _appendGeAndCondition: function(strCondition, name, value)
    {
        if (name && value)
        {
            if (strCondition)
            {
                strCondition += ' AND ';
            }

            strCondition += ('(' + name + ' >= ' + value + ')');
        }

        return strCondition;
    }
}

function generatePriceHtmlForSearchResult(objWine, fMember)
{
    var price     = objWine.price,
        priceHtml = '';

    // Workaround code for Supporting Kumamoto campaign.
    var barcode     = objWine.barcode_number,
        strCssClass = 'engFont',
        discountPercent = Math.round(100 * (1 - (objWine.member_price / price)));
    if (fMember)
    {
        priceHtml = '<span class="jpnFont">{0}：<span class="engFont">{1}</span> ({2})</span><br />'.format(
            Strings.getString('RETAIL_PRICE_STR'),
            WineUtility.convertToJapanesePrice(price),
            Strings.getString('TAX_EXCLUDED_STR'));

        priceHtml += '<span class="colorRed"><span class="jpnFont">{0}：<span class="engFont textSmallMedium">{1}</span> ({2})</span></span>'.format(
            Strings.getString('MEMBER_PRICE_STR'),
            WineUtility.convertToJapanesePrice(WineUtility.getMemberPrice(objWine, false)),
            Strings.getString('TAX_EXCLUDED_STR'));

        strCssClass += ' colorRed textSmall';
    }
    else
    {
        priceHtml = '<span><span class="jpnFont">{0}：<span class="engFont textSmallMedium">{1}</span> ({2})</span></span><br />'.format(
            Strings.getString('RETAIL_PRICE_STR'),
            WineUtility.convertToJapanesePrice(price),
            Strings.getString('TAX_EXCLUDED_STR'));

        priceHtml += '<span class="jpnFont colorRed">{0}：<span class="engFont">{1}</span> ({2})</span>'.format(
            Strings.getString('MEMBER_PRICE_STR'),
            WineUtility.convertToJapanesePrice(WineUtility.getMemberPrice(objWine, false)),
            Strings.getString('TAX_EXCLUDED_STR'));

        strCssClass += ' textXSmall';
    }

    return priceHtml;
}

function sortByCountry(lhs, rhs)
{
    var countrySortTable =
        {
            'South Africa':   1,
            'France':         2,
            'Italy':          3,
            'Spain':          4,
            'Germany':        5,
            'Austria':        6,
            'Portugal':       7,
            'Bulgaria':       8,
            'United Kingdom': 9,
            'Hungary':       10,
            'Croatia':       11,
            'Switzerland':   12,
            'Ukraine':       13,
            'Lebanon':       14,
            'United States': 15,
            'Canada':        16,
            'Australia':     17,
            'New Zealand':   18,
            'Chile':         19,
            'Argentina':     20,
            'Jpapan':        21,
            'Taiwan':        22
        };

    var lhsValue = countrySortTable[lhs.country],
        rhsValue = countrySortTable[rhs.country];

    return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
}

function sortByRegion(lhs, rhs)
{
    var regionSortTable =
        {
            'Champagne':                                    1,
            'Larraine':                                     2,
            'Alsace':                                       3,
            'Vallée de la Loire':                           4,
            'Bordeaux':                                     5,
            'Sud-Ouest':                                    6,
            'Bourgogne':                                    7,
            'Franche-Comté':                                8,
            'Jura':                                         9,
            'Savoie':                                      10,
            'Vallée du Rhône':                             11,
            'Languedoc':                                   12,
            'Roussillon':                                  13,
            'Autres Vignobles de Languedoc et Roussillon': 14,
            'Provence':                                    15,
            'Corse':                                       16,

            'East Sussex': 100,
            'West Sussex': 101,

            'Mittelrhein':      200,
            'Mosel-Saar-Ruwer': 201,
            'Rheingau':         202,
            'Franken':          203,
            'Rheinhessen':      204,
            'Nahe':             205,
            'Pfalz':            206,
            'Württemberg':      207,
            'Baden':            208,

            'Niederösterreich': 300,
            'Burgenland':       301,
            'Steiermark':       302,

            'Pannonhalmas': 400,

            'Slavonia-Danube': 500,

            'Pazardzhik': 600,

            'Friuli-Venezia-Giulia': 700,
            'Trentino Alto-Adige':   701,
            'Veneto':                702,
            'Lombardia':             703,
            'Vallée d\'Aoste':       704,
            'Piemonte':              705,
            'Liguria':               706,
            'Toscana':               707,
            'Marche':                708,
            'Umbria':                709,
            'Abruzzo':               710,
            'Puglia':                711,
            'Campagna':              712,
            'Calabria':              713,
            'Sicilia':               714,

            'Galicia':         800,
            'Castilla Y León': 801,
            'Rioja':           802,
            'Cataluña':        803,
            'Valencia':        804,
            'Murcia':          805,
            'Alentejo':        806,
            'Vinho Verde':     807,

            'North Island': 900,
            'South Island': 901,

            'Western Australia': 1000,
            'Victoria':          1001,
            'South Australia':   1005,
            'New South Wales':   1010,
            'Tasmania':          1011,

            'Western Cape': 1100,

            'Mendoza': 1200,

            'Washington': 1300,
            'Oregon':     1301,
            'California': 1302,

            'Hokkaido':  1400,
            'Niigata':   1401,
            'Nagano':    1402,
            'Yamanashi': 1403
        };

    var lhsValue = regionSortTable[lhs.region] ? regionSortTable[lhs.region] : 0,
        rhsValue = regionSortTable[rhs.region] ? regionSortTable[rhs.region] : 0;

    return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
}



function sortByDistrict(lhs, rhs)
{
    var districtSortTable =
        {
            'Montagne de Reims':           1,
            'Valée de la Marne':           2,
            'Côte des Blancs':             3,
            'Petit et Grand-Mont':         4,
            'Côte des Bar':                5,
            'Côte de Champagne':           6,
            'Montagne de Reims':           7,
            'Valée de la Marne':           8,
            'Côte des Blancs':             9,
            'Petit et Grand-Mont':        10,
            'Champagne':                  11,

            'Pays Nantais':               100,
            'Anjou & Saumur':             101,
            'Touraine':                   102,
            'Centre':                     103,
            'Autres Vignobles de Loire':  104,

            'Médoc':                      200,
            'Graves':                     201,
            'Entre-Deux-Mers':            202,
            'Castillon Cote de Bordeaux': 203,
            'Saint-Émilion':              204,
            'Pomerol':                    205,
            'Rive Droit de la Dordogne':  206,
            'Sauternes':                  207,
            'AC Bordeaux':                208,

            'Tonnerrois':                 301,
            'Auxerrois':                  302,
            'Châtillonnais':              303,
            'Chablis':                    304,
            'Côte de Nuits':              305,
            'Côte de Beaune':             306,
            'Côte Chalonnaise':           307,
            'Beaujolais':                 308,
            'Mâconnais':                  309,

            'Vignoble Septentrional':     401,
            'Vignoble Méridional':        402,
            'Côtes du Rhône Villages':    403,
            'Côtes du Rhône':             404,
            'Autres Vignobles de Rhône':  405,

            'Kampala':                    501,
            'Kremstal':                   502,
            'Wagram':                     503,
            'Wien':                       504,
            'Thermenregion':              505,
            'Neusiedlersee':              506,
            'Mittelburgenland':           507,
            'Südsteiermark':              508,

            'Auckland':                   601,
            'Martinborough':              602,
            'Wipara':                     603,
            'Marlborough':                604,
            'Nelson':                     605,
            'Central Otago':              606,

            'Margaret River':             701,
            'Gippsland':                  702,
            'Yarra Valley':               703,
            'Mornington Peninsula':       704,
            'Macedon':                    705,
            'Clare Valley Polish Hill':   706,
            'Clare Valley ':              707,
            'Barossa Valley':             708,
            'Eden Valley':                709,
            'McLaren Vale':               710,
            'Lower Hunter Valley':        711,
            'Northern Tasmania':          712,

            'Columbia Valley':            801,
            'Willamette Valley':          802,
            'Sierra Foothills':           803,
            'Sonoma':                     804,
            'Carneros':                   805,
            'Napa Valley':                806,
            'Lodi':                       807,
            'Santa Barbara':              808 
        };

    var lhsValue = districtSortTable[lhs.district] ? districtSortTable[lhs.district] : 0,
        rhsValue = districtSortTable[rhs.district] ? districtSortTable[rhs.district] : 0;

    return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
}

function sortByProducer(lhs, rhs)
{
    return ((lhs.producer < rhs.producer) ? -1 : ((lhs.producer > rhs.producer) ? 1 : 0));
}



*/


