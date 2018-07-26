# JS
cat "../../extensions/build/extensions.js" >  "./build/index.js"
cat "../../../external_libs/notify.js"     >> "./build/index.js"
cat "./imports.js"                         >> "./build/index.js"
cat "../../base_classes/HtmlControl.js"    >> "./build/index.js"
cat "./js/CampaignPage.js"                 >> "./build/index.js"
cat "./js/index.js"                        >> "./build/index.js"

# CSS
cat "./css/index.css"                      > "./build/index.css"
