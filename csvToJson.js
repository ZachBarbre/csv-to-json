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

prepForJson.pop();

let json = prepForJson.map(item => {
    let obj = {}
    item.forEach((value, index) => {
        if (parseFloat(value) || parseFloat(value) === 0) {
            obj[keys[index]] = parseFloat(value);
        } else {
            obj[keys[index]] = value;
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

