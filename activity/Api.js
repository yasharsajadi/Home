console.log("To Run:")
console.log(">>npm init -y")
console.log(">>npm i axios")
console.log(">>npm i fs")
console.log(">>npm i moment")
console.log(">>node Api.js") // to Make JSON Data File



// const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const moment = require('moment');

const owner = 'yasharsajadi';
const apiUrl = `https://api.github.com/users/${owner}/repos?sort=pushed`;
const accessToken = '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';


axios.get(apiUrl, {headers: {'Authorization': `token ${accessToken}`}})
  .then(response => {
    const repoList = [];
    for (let i = 0; i < 3 && i < response.data.length; i++) 
    {
      repoList.push(response.data[i].name);
    }
    const promises = repoList.map(
      repo => axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {params: {per_page: 1}, headers: {'Authorization': `token ${accessToken}`}})
        .then(response => {
          const contributorLogin = response.data[0].author.login;
          const commitMessage = response.data[0].commit.message;
          const lastPushed = moment(response.data[0].commit.author.date).format('YYYY-MMM-DD');
          const repos = repo;
          const link = `https://github.com/${owner}/${repo}`;
          return { repos, commitMessage, lastPushed, contributorLogin, link };
        })
        .catch(error => {console.log(`No commit found for repository ${repo}`);})
    );

  Promise.all(promises).then(data => 
    {
      // Save data to json
      fs.writeFile(__dirname + '\\data.json', JSON.stringify(data), err => {
        if (err) {
          console.error(err)
          return
        }
        console.log('Data has been written to data.json')
      })




      // Show data
      for (let i = 0; i < data.length; i++) 
      {
        console.log(`Repository: ${data[i].repos}`);
        console.log(`Commit: ${data[i].commitMessage}`);
        console.log(`Last pushed: ${data[i].lastPushed}`);
        console.log(`Pushed by: ${data[i].contributorLogin}`);
        console.log(`Link: ${data[i].link}`)
        console.log("============================");
      } // End Show


      // Here We can change HTML Parameters







    }); 
  })
  .catch(error => {console.log(error);});













///////////////////////////// Changes HTML

// const postInfoElements = document.querySelectorAll('.post-info');

// for (let i = 0; i < postInfoElements.length; i++) {
//   const commitElement = postInfoElements[i].querySelector('p');
//   commitElement.textContent = `Commit: hello${i}`;
//   const reposElement = postInfoElements[i].querySelector('h4');
//   reposElement.textContent = `Repo: Header${i}`;
//   const ulElement = postInfoElements[i].querySelector('ul');
//   const liElements = ulElement.querySelectorAll('li');
//   for (let j = 0; j < liElements.length; j++) {
//     if (j == 0) {
//       liElements[j].textContent = `push:yasharsajadi${i},`;
//     } else if (j == 1) {
//       liElements[j].textContent = `2023-12-${i},`;
//     } else if (j == 2) {
//       const linkElement = liElements[j].querySelector('a');
//       linkElement.href = `http://example${i}.com`;
//     }
//   }
// }

// const postTumbElements = document.querySelectorAll('.post-thumb');

// for (let i = 0; i < postTumbElements.length; i++) {
//   const dateElement = postTumbElements[i].querySelector('.date span');
//   dateElement.textContent = `${i}6 - Aug`;
// }