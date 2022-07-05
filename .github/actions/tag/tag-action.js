const core = require('@actions/core');
const github = require('@actions/github');

async function action() {
    
    // console.log(github.context);
    const myToken = core.getInput('token');
    const octokit = github.getOctokit(myToken);
    // const octokit = github.getOctokit('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');
    const releaseCandidate = core.getInput('release-candidate');

    const tags = await octokit.rest.repos.listTags({
        owner: "wai-calvin",
        repo: github.context.payload.repository.name
    });

    console.log(tags);
    const recentGitTag = tags.data[0].name;
    console.log("recent git tag: " + recentGitTag);


    if(releaseCandidate == "true") {
        if(!recentGitTag.includes("-rc")) {
            const oldPatchNum = recentGitTag.slice(-1);
            const newPatchNum = Number(oldPatchNum)+1;
            console.log(newPatchNum);
    
            const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
                owner: "wai-calvin",
                repo: github.context.payload.repository.name,
                ref: `refs/tags/v1.0.${newPatchNum}-rc0`,
                sha: github.context.payload.head_commit.id
            });
            console.log(createTag);
        }
    
        else {
            const oldRC = recentGitTag.slice(-1);
            const newRC = Number(oldRC)+1;
            console.log(newRC);
    
            const currentVersion = recentGitTag.split('-', 1);
            console.log(currentVersion);
    
            const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
                owner: 'wai-calvin',
                repo: github.context.payload.repository.name,
                ref: `refs/tags/${currentVersion}-rc${newRC}`,
                sha: github.context.payload.head_commit.id
            });
            console.log(createTag);
        }
    }

    else {
        const version = recentGitTag.split('-', 1);
        const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: 'wai-calvin',
            repo: github.context.payload.repository.name,
            ref: `refs/tags/${version}`,
            sha: github.context.payload.head_commit.id
        });
        console.log(createTag);
    } 
}

action();
