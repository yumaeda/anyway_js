import { ImageTag } from '../../modules/build/html_tags';

//-------------------------------------------------------
//
// HtmlUtility (Requires jqueiry.js)
//
//-------------------------------------------- YuMaeda --
class HtmlUtility
{
    constructor()
    {
        if (!HtmlUtility.instance)
        {
            HtmlUtility.instance = this;
        }

        return HtmlUtility.instance;
    }

    renderPage($parentContainer, pageUrl)
    {
        var html =
            '<iframe src="{0}" width="100%" onload="iframeLoaded()" frameborder="0" class="content-height-iframe"></iframe>'.format(pageUrl);

        $parentContainer.html(html);
    }

    // Copied from seiya.wineutility-0.1.jp
    generateImgHtml(strBarcode, strClass)
    {
        var baseDirUrl  = '//anyway-grapes.jp/images/wines/400px',
            imgUrl      = '{0}/{1}.png'.format(baseDirUrl, strBarcode),
            emptyImgUrl = '{0}/no_wine_photo.png'.format(baseDirUrl),
            imgTag      = new ImageTag(imgUrl);

        imgTag.addAttr('alt', strBarcode);
        imgTag.addAttr('onerror', 'this.src=\'' + emptyImgUrl + '\';');
        imgTag.addClass(strClass);

        return imgTag.toHtml();
    }

    htmlEncode(strHtml)
    {
        return $('<div/>').text(strHtml).html().replace(/"/g, '&quot;');
    }

    htmlDecode(strHtml)
    {
        return $('<div/>').html(strHtml).text().replace('&quot;', '"', 'gi');
    }
}

const instance = new HtmlUtility();
Object.freeze(instance);

export default instance;

