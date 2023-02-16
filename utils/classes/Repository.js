const fs = require("fs");
const path = require("path");
const { stringify } = require("csv-stringify");

class Repository {
  constructor(
    name = "",
    description = "",
    html_url = "",
    watchers_count = "",
    stargazers_count = "",
    forks_count = ""
  ) {
    this.name = name;
    this.description = description;
    this.html_url = html_url;
    this.watchers_count = watchers_count;
    this.stargazers_count = stargazers_count;
    this.forks_count = forks_count;
  }

  saveAsCsv() {
    const csv = [
      this.name,
      this.description,
      this.html_url,
      this.watchers_count,
      this.stargazers_count,
      this.forks_count,
    ];

    stringify([csv], (err, output) => {
      if (err) return console.log("An error occured");

      const pathToOutputFile = path.join(
        __dirname,
        "../outputFiles/result.csv"
      );

      try {
        fs.appendFileSync(pathToOutputFile, output);
      } catch (e) {
        console.log(e);
      }
    });
  }
}

module.exports = Repository;
