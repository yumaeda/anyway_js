//-------------------------------------------------------
//
// AnywayUrlUtility
//
//-------------------------------------------- YuMaeda --
class AnywayUrlUtility
{
    constructor()
    {
        if (!AnywayUrlUtility.instance)
        {
            AnywayUrlUtility.instance = this;
        }

        return AnywayUrlUtility.instance;
    }

    _generateFolderName(str, strCountry)
    {
        // Call UrlUtility.urlify(srt, strCountry === 'France')
    }

    generateRegionPageUrl(strCountry, strRegion)
    {
        var url = this.generateCountryPageUrl(strCountry);

        if ((strRegion != '') && (strRegion != '------------'))
        {
            if ((strRegion == 'Languedoc') ||
                (strRegion == 'Roussillon'))
            {
                url += '/languedoc-et-roussillon';
            }
            else
            {
                var strRegionFolder =
                    (strRegion ? this._generateFolderName(strRegion, strCountry) : '');

                url += '/' + strRegionFolder;
            }
        }

        return url;
    }

    // Copied from seiya.producers-0.1.js
    generateCountryPageUrl(strCountry)
    {
        var strUrl           = '//anyway-grapes.jp/producers',
            strCountryFolder = strCountry ? this._generateFolderName(strCountry, strCountry) : '';
        if (strCountryFolder != '')
        {
            strUrl += '/' + strCountryFolder;
        }

        return strUrl;
    }

    // Copied from seiya.producers-0.1.js
    generateProducerPageUrl(objProducer)
    {
        var strCountry  = objProducer.country,
            strRegion   = objProducer.region   ? this._generateFolderName(objProducer.region, strCountry)   : '',
            strDistrict = objProducer.district ? this._generateFolderName(objProducer.district, strCountry) : '',
            strVillage  = objProducer.village  ? this._generateFolderName(objProducer.village, strCountry)  : '',
            strUrl      = this.generateCountryPageUrl(strCountry);

        if (strRegion != '')
        {
            strUrl += '/' + strRegion;
        }

        if (strDistrict != '')
        {
            if (strCountry == 'France')
            {
                strUrl += '/' + strDistrict;
            }
        }

        if (strVillage != '')
        {
            strUrl += '/' + strVillage;
        }

        return strUrl + '/' + this._generateFolderName(objProducer.short_name, strCountry);
    }
}

const instance = new AnywayUrlUtility();
Object.freeze(instance);

export default instance;

