const fs = require('fs');
const dir = fs.opendirSync('./messages');
const csvParse = require('csv-string').parse;

let dirent; 
let dirent2;

while ((dirent = dir.readSync()) !== null) {

  if (dirent.name === "index.json") break; 
  let dir2 = fs.opendirSync(`./messages/${dirent.name}`);

  while ((dirent2 = dir2.readSync()) !== null) {
    if (dirent2.name === "messages.csv") {
      fs.readFile(`./messages/${dirent.name}/messages.csv`, 'utf8', function (err,data) {

        if (err) console.log(err);
        data.replace('"', '“'); // used to prevent errors in the JSON 
        let data2 = csvParse(data);
        data2 = data2.map(array => array.filter((_, index) => (index + 1) % 3 === 0)); //removes dates, and message ids, remove if you wish to keep

        fs.writeFile('information.json', JSON.stringify(data2), function (err) {
          if (err) console.log(err);
        });
      });
    }
  }
  dir2.closeSync();

}
dir.closeSync();
console.log("Completed, check information.json.")
