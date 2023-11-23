var portKey = "victoria";
var port = chrome.runtime.connect({name: "victoria"});
port.postMessage({name: portKey});

port.onMessage.addListener(function(msg) {
  //msg.question - recieve message
  //port.postMessage - send message
  let bootyCall = port.question;
  main(msg.url);
});



// var initialStage = 1;
var score = 0;
let ipqualityscore_url = "https://www.ipqualityscore.com/api/json/url/";
let API_KEY = "Ig0bA7OqPLC3L4FQtihqc2xSPjiDcp9O" + '/'; 

function checkLongURL(url, len) {
  if (url.length > len) {
    score+=1;
    return true; // Changed to true
  }
  return false; // Changed to false
}

function checkShortURL(url) {
  const regex = new RegExp('bit\\.ly|goo\\.gl|shorte\\.st|go2l\\.ink|x\\.co|ow\\.ly|t\\.co|tinyurl|tr\\.im|is\\.gd|cli\\.gs|yfrog\\.com|migre\\.me|ff\\.im|tiny\\.cc|url4\\.eu|twit\\.ac|su\\.pr|twurl\\.nl|snipurl\\.com|short\\.to|BudURL\\.com|ping\\.fm|post\\.ly|Just\\.as|bkite\\.com|snipr\\.com|fic\\.kr|loopt\\.us|doiop\\.com|short\\.ie|kl\\.am|wp\\.me|rubyurl\\.com|om\\.ly|to\\.ly|bit\\.do|t\\.co|lnkd\\.in|db\\.tt|qr\\.ae|adf\\.ly|goo\\.gl|bitly\\.com|cur\\.lv|tinyurl\\.com|ow\\.ly|bit\\.ly|ity\\.im|q\\.gs|is\\.gd|po\\.st|bc\\.vc|twitthis\\.com|u\\.to|j\\.mp|buzurl\\.com|cutt\\.us|u\\.bb|yourls\\.org|x\\.co|prettylinkpro\\.com|scrnch\\.me|filoops\\.info|vzturl\\.com|qr\\.net|1url\\.com|tweez\\.me|v\\.gd|tr\\.im|link\\.zip\\.net');
  const boolValue = regex.test(url);
 if(boolValue){
   score+=1;
  }
  return boolValue; 

}

async function sendHTTPReq(url) {
  url = ipqualityscore_url + API_KEY + url;

  try {
    console.log('URL to be ipqualify: ' + url);
    let response = await fetch(url, { mode: 'no-cors' }); // http client 
    const data = await response.json();
    console.log("Body: " + data);
    return true;
  } catch (err) {
    console.log("Exception while sending the request: " + err);
    return false;
  }
}


// function setup() {
//   if (API_KEY === "") {
//     console.log("API key is missing. Please provide an API key.");
//     // show a popup window to store the API key of the user...
//     return false;
//   }
//   // Other setup logic...
//   return true;
// }

function checkIDN(url) {
    if(url.isascii())
        return false;
    score+=1;
    return true;
}

async function isRedirectingToAnotherDomain(url) {
    try {
      const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (response.redirected) {
        const originalDomain = new URL(url).hostname;
        const finalURL = response.url;
        const finalDomain = new URL(finalURL).hostname;
        score+=1;
        if(originalDomain !== finalDomain){
			    score+=1;
          return true;
        }
		return false;
      }
    } catch (error) {
      console.error('Error:', error);
    }
    return false;
  }
  

function main(url) {
  
	if(API_KEY !== '')
	{
    let tmp_url = url.split('/');
    let domain = tmp_url[2];
    let scheme = tmp_url[0].slice(0, -1)+'%3a%2f%2f';
    url = scheme+domain
		sendHTTPReq(url);
	}
}




