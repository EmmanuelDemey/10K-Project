const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');
const fs = require('fs');

request("https://developer.mozilla.org/fr/docs/Web/HTML/Element", function(error, response, body) {
   let $ = cheerio.load(body);
   
   if(error) {
     console.log("Error: " + error);
   }
   
   const urlLinks = $('#wikiArticle a[href^="/fr/docs/Web/HTML/Element/"]');

   let elements = new Set();
   urlLinks.each((index, elt) => {
       elements.add($(elt).attr('href').replace('/fr/docs/Web/HTML/Element/', ''));
   });
   elements = [...elements];
   
   console.log(elements)

   elements.forEach((elementName) => {
       
       request(`https://developer.mozilla.org/fr/docs/Web/HTML/Element/${elementName}`, function(error, response, body) {
           let attributes = new Set();
           attributes.add('accesskey');
           attributes.add('class');
           attributes.add('contenteditable');
           attributes.add('contextmenu');
           attributes.add('dir');
           attributes.add('draggable');
           attributes.add('dropzone');
           attributes.add('hidden');
           attributes.add('id');
           attributes.add('lang');
           attributes.add('spellcheck');
           attributes.add('style');
           attributes.add('tabindex');
           attributes.add('title');
           attributes.add('translate');

           let $ = cheerio.load(body);
           $('#wikiArticle dl strong[id^=attr] code').each((index, elt) => {
              attributes.add($(elt).text());
           });

           fs.writeFile(`./api/${elementName}.json`, JSON.stringify({attributes:[...attributes]}), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
       });
        
    })
});