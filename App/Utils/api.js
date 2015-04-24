var baseUrl = 'https://api.github.com/users/';

var api = {
  getBio(userName){
    var url = `${baseUrl}${userName}`;
    return fetch(url).then((res) => res.json());
  },
  getRepos(userName){
    var url = `${baseUrl}${userName}/repos?sort=pushed`;
    console.log("URL: ", url);
    return fetch(url).then((res) => res.json());
  }
}

module.exports = api;
