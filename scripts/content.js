var portKey = "victoria";
var port = chrome.runtime.connect({name: "victoria"});
port.postMessage({name: portKey});

port.onMessage.addListener(function(msg) {
  //msg.question - recieve message
  //port.postMessage - send message
  let bootyCall = port.question;
  console.log(msg.damn);
});