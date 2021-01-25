const fs = require('fs');
let data = '';
const path = process.argv[2]

const filename = path.split('.')[1].slice(1);

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

let csvArray = data.split('\r\n')

let prepForJson = csvArray.map(item => {
    return item.split(',');
})

let keys = prepForJson.shift();
keys = keys.map(key => key.trim())

prepForJson.pop();

let json = prepForJson.map(item => {
    let obj = {}
    item.forEach((value, index) => {
        if (isNaN(value)) {
            obj[keys[index]] = value;
        } else {
            obj[keys[index]] = parseFloat(value);
        }
    })
    return obj;
})

let toFile = JSON.stringify(json);

try {
    fs.writeFileSync(`./output/${filename}.json`, toFile);
} catch (error) {
    console.error(error)
}

