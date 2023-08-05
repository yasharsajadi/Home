$(document).ready(function(){
    $.ajax({
        url: "activity/data.json",
        dataType: "json",
        success: function(data){
            for (let i = 0; i < data.length; i++) {
                const postInfoElement = document.querySelectorAll('.post-info')[i];
                const commitElement = postInfoElement.querySelector('p');
                commitElement.textContent = `Commit: ${data[i].commitMessage}`;
                const reposElement = postInfoElement.querySelector('h4');
                reposElement.textContent = `Repo: ${data[i].repos}`;
                const ulElement = postInfoElement.querySelector('ul');
                const liElements = ulElement.querySelectorAll('li');
                for (let j = 0; j < liElements.length; j++) {
                    if (j == 0) {
                        liElements[j].textContent = `push: ${data[i].contributorLogin},`;
                    } else if (j == 1) {
                        liElements[j].textContent = `${data[i].lastPushed},`;
                    } else if (j == 2) {
                        const linkElement = liElements[j].querySelector('a');
                        linkElement.href = data[i].link;
                    }
                }
                const postTumbElements = document.querySelectorAll('.post-thumb');
                const dateElement = postTumbElements[i].querySelector('.date span');
                const lastPushedDate = new Date(data[i].lastPushed);
                const options = { month: 'short', day: 'numeric' };
                dateElement.textContent = lastPushedDate.toLocaleDateString('en-US', options);
            }
        }
    });
});