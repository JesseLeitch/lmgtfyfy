var generatedUrl, 
    enteredstring,
    shorten, 
    urlencoded;
var baseUrl = 'http://lmgtfy.com/?q=';

function generateUrl(lucky){
    enteredstring = document.getElementById('url-to-use').value;
    shorten = document.getElementById('shorten').checked;
    if(enteredstring != ''){
        urlencoded = encodeURIComponent(enteredstring);
        generatedUrl = baseUrl + urlencoded;
        if(lucky){
            generatedUrl += '&l=1';   
        }
        if(shorten){
            shortenUrl(generatedUrl);
        }else{
            document.getElementById('final-url').value = generatedUrl;
        }
    }else{
        alert('You must enter a URL');
    }
}

function shortenUrl(longUrl){
    var api_url = 'https://api-ssl.bitly.com/v3/shorten';

    var data = {
        domain:'bit.ly',
        format:'json',
        access_token: bitly,
        longUrl: longUrl
    }

    jQuery.ajax({
        type: "GET", //or GET
        url: api_url,
        data: data,
        dataType:'JSON',
        crossDomain:true,
        cache:false,
        async:false,
        success: function(msg){
            generatedUrl = msg['data']['url'];
            document.getElementById('final-url').value = generatedUrl;
        },
        error: function(jxhr){
            console.log(jxhr);
            //alert('Error creating shortened URL');
            document.getElementById('final-url').value = generatedUrl;
        }
    });
}

function copyUrl(){
    document.getElementById('final-url').select();
    document.execCommand('copy');
}

// After loading
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search').addEventListener('click', function(){ generateUrl(false); });
    document.getElementById('lucky').addEventListener('click', function(){ generateUrl(true); });
    document.getElementById('copy-url').addEventListener('click', copyUrl);
});