const fs = require('fs'); // Used for reading and writing to files
const { csvParse } = require('csv-string').parse; // Used to parse to an array
const dir = fs.opendirSync('./messages');

let dirent = null; 

while ((dirent = dir.readSync()) !== null) {
  if (dirent.name === "index.json") break; // index.json is TYPICALLY the final file in this folder, it is also not a folder.
  fs.readFile(`./messages/${dirent.name}/messages.csv`, 'utf8', function (err,data) { // Read the csv file
    let data2;
    if (err) console.log(err); // You know the drill, if it errors, tell the user
    data.replace('"', '“'); // Used to prevent errors in the JSON in relation to quotation characters
    data2 = csvParse(data); // Parse to an array
    data2 = data2.map(array => array.filter((_, index) => (index + 1) % 3 === 0)); // Removes dates, and message ids, remove if you wish to keep

    fs.writeFile('information.json', JSON.stringify(data2), function (err) { // Write the csv file contents to the JSON file
       if (err) console.log(err); // Ditto...
    });
  });
}
dir.closeSync();

console.log("Completed, check information.json.") // Tell the user the script is complete
