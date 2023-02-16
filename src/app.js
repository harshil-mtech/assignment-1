const { Octokit } = require("octokit");
const Repository = require("../utils/classes/Repository");

const octokit = new Octokit({});

const fetch = async () => {
  try {
    const iterator = octokit.paginate.iterator(
      "GET /search/repositories?q=is:public",
      {
        q: "language:Python",
        q: "forks:>=200",
      }
    );

    // iterate through each response
    for await (const { data: repositories } of iterator) {
      for (const repository of repositories) {
        if (repository.stargazers_count > 2000) {
          const repObj = new Repository(
            repository.name,
            repository.description,
            repository.html_url,
            repository.watchers_count,
            repository.stargazers_count,
            repository.forks_count
          );
          repObj.saveAsCsv();
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};
fetch();
