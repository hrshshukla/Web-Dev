// It works with the any of the first resolve value 
// If you take internet from [WiFi] [MobileData] [Ethernet] then the one who gives internet first will get accepted rest will get rejected 

let WiFi = new Promise((resolve, reject) => {
    let wifiConnected = false;
    wifiConnected ? resolve("📶 Connected to WiFi") : reject("❌ WiFi not available");
});

let MobileData = new Promise((resolve, reject) => {
    let dataConnected = true;
    dataConnected ? resolve("📡 Connected to Mobile Data") : reject("❌ No Mobile Data");
});

let Ethernet = new Promise((resolve, reject) => {
    let ethernetConnected = false;
    ethernetConnected ? resolve("🔌 Connected via Ethernet") : reject("❌ No Ethernet Connection");
});

let InternetConnection = Promise.any([WiFi, MobileData, Ethernet])

InternetConnection.then((finalConnection)=>{
    console.log(finalConnection); // Output : 📡 Connected to Mobile Data others Ignored
})

// If [wifiConnected = false]    [dataConnected = false]   [ethernetConnected = false] And all Promises return [reject] means
//     WiFi --> reject()         MobileData --> reject()      Ethernet --> reject()  
// Then this will return array or all reject() values which is called [AggregteError]

// Ouptut: 
// [AggregateError: All promises were rejected] {
//     [errors]: [
//       '❌ WiFi not available',
//       '❌ No Mobile Data',
//       '❌ No Ethernet Connection'
//     ]
//   }