const express = require('express')
const axios = require('axios').default;
const app = express();
const { MongoClient } = require("mongodb");
const port = 4000;
var cors = require('cors')
app.use(cors())
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");
var nifty_cll = "01jan23"
var result = []
console.log('Connecting to database....')
async function run() {
    try {
        await client.connect();
        const db = client.db("NiftyOptionsIO")
        const cll = db.collection(nifty_cll)
        //const result = await cll.find().sort({ _id: -1 }).limit(1).toArray()
        result = await cll.find().sort({ timestamp: 1 }).toArray()
        console.log('Connected')
    } catch (e) {
        console.log("Error related to database");
    } finally {
        await client.close();
    }
} run().catch(console.dir);


app.post('/', (req, res) => {
    var time = req.body.time
    NiftyMostPeOI(res, time)
})

app.post('/history', (req, res) => {
    var time = req.body.time
    NiftyHistory(res, time, result)
})


var NiftyHistory = (res, time, result) => {
    let oip = 0
    let oic = 0
    let oipc = 0
    let oicc = 0
    let volp = 0
    let volc = 0
    let high_oi_p = []
    let high_oi_pc = []
    let high_volp = []
    let high_oi_c = []
    let high_oi_cc = []
    let high_volc = []
    let ohigh_oi_p = []
    let strike = 0
    var data = []

    try{
    for (i = 0; i < result[time]['data']['data'].length; i++) {
        try{
        strike = (result[time]['data']['data'][i]['strikePrice'])

        oip = (result[time]['data']['data'][i]['PE']['openInterest'])
        high_oi_p.push(oip)
        oic = (result[time]['data']['data'][i]['CE']['openInterest'])    
        high_oi_c.push(oic)
        oicc = (result[time]['data']['data'][i]['CE']['changeinOpenInterest'])
        high_oi_cc.push(oicc)
        oipc = (result[time]['data']['data'][i]['PE']['changeinOpenInterest'])
        high_oi_pc.push(oipc)
        volc = (result[time]['data']['data'][i]['CE']['totalTradedVolume'])
        high_volc.push(volc)
        volp = (result[time]['data']['data'][i]['PE']['totalTradedVolume'])
        high_volp.push(volp)
        data.push({ strike: strike, oipe: oip, oice: oic, oicec: oicc, oipec: oipc, volc: volc, volp: volp })
        }catch(e){
            console.log(e)
        }
        
    }
    }catch(error){
        console.log(error)
    }
    high_oi_p.sort(function (a, b) { return b - a })
    high_oi_pc.sort(function (a, b) { return b - a })
    high_volp.sort(function (a, b) { return b - a })
    high_oi_c.sort(function (a, b) { return b - a })
    high_oi_cc.sort(function (a, b) { return b - a })
    high_volc.sort(function (a, b) { return b - a })
    
    res.send({
        time: result[time]['time'],
        data: data, 
        high_oi_p: [high_oi_p[0], high_oi_p[1]], 
        high_oi_pc: [high_oi_pc[0], high_oi_pc[1]], 
        high_volp: [high_volp[0], high_volp[1]],
        high_oi_cc: [high_oi_cc[0], high_oi_cc[1]], 
        high_volc: [high_volc[0], high_volc[1]], 
        high_oi_c: [high_oi_c[0], high_oi_c[1]],
        ohigh_oi_p:ohigh_oi_p[0],
        underlying:result[time]['data']['data'][0]['PE']['underlyingValue']
    })

}




var NiftyMostPeOI = (res, time) => {
    let oip = 0
    let oic = 0
    let oipc = 0
    let oicc = 0
    let volp = 0
    let volc = 0
    let high_oi_p = []
    let high_oi_pc = []
    let high_volp = []
    let high_oi_c = []
    let high_oi_cc = []
    let high_volc = []
    let strike = 0
    var data = []

    async function run() {
        try {
            await client.connect();
            const db = client.db("NiftyOptionsIO")
            const cll = db.collection(nifty_cll)
            const result = await cll.find().sort({ _id: -1 }).limit(2).toArray()// removed limit(2) and have set limit(1)
            console.log(typeof(time))
            for (i = 0; i < result[time]['data']['data'].length; i++) {

                try{
                    strike = (result[time]['data']['data'][i]['strikePrice'])
                    oip = (result[time]['data']['data'][i]['PE']['openInterest'])
                    high_oi_p.push(oip)
                    oic = (result[time]['data']['data'][i]['CE']['openInterest'])
                    high_oi_c.push(oic)
                    oicc = (result[time]['data']['data'][i]['CE']['changeinOpenInterest'])
                    high_oi_cc.push(oicc)
                    oipc = (result[time]['data']['data'][i]['PE']['changeinOpenInterest'])
                    high_oi_pc.push(oipc)
                    volc = (result[time]['data']['data'][i]['CE']['totalTradedVolume'])
                    high_volc.push(volc)
                    volp = (result[time]['data']['data'][i]['PE']['totalTradedVolume'])
                    high_volp.push(volp)
                    data.push({ strike: strike, oipe: oip, oice: oic, oicec: oicc, oipec: oipc, volc: volc, volp: volp })
                }catch(error){
                    console.log(error)
                }
                
            }
            high_oi_p.sort(function (a, b) { return b - a })
            high_oi_pc.sort(function (a, b) { return b - a })
            high_volp.sort(function (a, b) { return b - a })
            high_oi_c.sort(function (a, b) { return b - a })
            high_oi_cc.sort(function (a, b) { return b - a })
            high_volc.sort(function (a, b) { return b - a })
            res.send({
                time: result[time]['time'],
                data: data,
                high_oi_p: [high_oi_p[0], 
                high_oi_p[1]], high_oi_pc: [high_oi_pc[0], high_oi_pc[1]], 
                high_volp: [high_volp[0], high_volp[1]],
                high_oi_cc: [high_oi_cc[0], high_oi_cc[1]], 
                high_volc: [high_volc[0], high_volc[1]], 
                high_oi_c: [high_oi_c[0], high_oi_c[1]]
            })

        } catch (e) {
            console.log("Error", e);
        } finally {
            await client.close();
        }
    } run().catch(console.dir);
    //await client.connect();
    //const db = client.db("NiftyOptionsIO")
    //const cll = db.collection(nifty_cll)
    //const result = await cll.find().sort({ _id: -1 }).limit(1).toArray()
    //const result = await cll.find().sort({ timestamp: 1 }).toArray()

    //console.log(time,oi)
    //res.send({time:time,oi:oi})
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})