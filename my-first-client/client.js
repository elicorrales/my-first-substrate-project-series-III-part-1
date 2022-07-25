// HTTP and WS endpoints for RPC connections.
//Default ports are:
//HTTP => 9933
//WS => 9944 
// "ws://blahblah...."  vs  "wss://blahblah"
const httpUrl = 'http://localhost:9933';
const wsUrl = 'ws://localhost:9944';
const { HttpProvider, WsProvider, ApiPromise } = require('@polkadot/api');
(async () => {
    /*
        let http = new HttpProvider(httpUrl);
        let hApi = await ApiPromise.create({ provider: http });
        //console.log(await hApi.consts);
        //console.log(await hApi.query);
        console.log(await hApi.tx);
    */
    let ws = new WsProvider(wsUrl);
    let wApi = await ApiPromise.create({ provider: ws });
    console.log(await wApi.consts);
    wApi.disconnect();
})();