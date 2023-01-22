
# Option Chain (InvestingDaddy)

It is a tool which shows Option Chain in colorful format. It works on InvestingDaddy's theory of support and resistance.


## Features

- Updates data every minute
- Color format for support and resistance
- Option Chain can be updated automatically.


## 🛠 Skills
Javascript, HTML, CSS...


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/RushikeshKha/InvestingDaddyClone/master/ss/1.png?token=GHSAT0AAAAAAB5YOEIHJZBCFCLSYTW64TNAY6MZWBA)

The red colored part is the strongest resistance in the underlying stock and the green part is strongest support in the underlying stock. The yellow part represents the next support and resistance.


## Usage/Examples

```javascript
const client = new MongoClient("mongodb://127.0.0.1:27017");
var nifty_cll = "Collection"
var result = []
console.log('Connecting to database....')
async function run() {
    try {
        await client.connect();
        const db = client.db("Database")
        const cll = db.collection(nifty_cll)
        result = await cll.find().sort({ timestamp: 1 }).toArray()
        console.log('Connected')
    } catch (e) {
        console.log("Error related to database");
    } finally {
        await client.close();
    }
} run().catch(console.dir);
```
The collection name and the database name should be assigned to these ``nifty_cll``and ``client.db(Database)``

## Tech Stack

**Client:** HTML, JavaScript, Css

**Server:** Node, Express

**Database:** MongoDB
## Authors

- [@rushikeshkha](https://www.github.com/rushikeshkha)

