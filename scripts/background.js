var portKey = "victoria";

chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        url = tab.url;
        chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name === portKey);
        port.onMessage.addListener(function(msg) {
            // console.log(url);

          port.postMessage({damn:url}); // change the damn with url
        });
  });       
        // console.log(y);
        // send the URL to the content.js file 
        
    })
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        console.log("you are here: "+change.url);
         
    }
});
