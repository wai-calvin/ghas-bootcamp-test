const core = require('@actions/core');
const github = require('@actions/github');

async function action() {
    
    const myToken = core.getInput('token');
    const octokit = github.getOctokit(myToken);
    const releaseCandidate = core.getInput('release-candidate');

    const tags = await octokit.rest.repos.listTags({
        owner: "wai-calvin",
        repo: github.context.payload.repository.name
    });

    const recentGitTag = tags.data[0].name;

    if(releaseCandidate == "true") {
        if(!recentGitTag.includes("-rc")) {
            const oldPatchNum = recentGitTag.split('.').pop();
            const newPatchNum = Number(oldPatchNum)+1;
    
            const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
                owner: "wai-calvin",
                repo: github.context.payload.repository.name,
                ref: `refs/tags/v1.0.${newPatchNum}-rc0`,
                sha: github.context.payload.head_commit.id
            });
            console.log(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`);
        }
    
        else {
            const oldRCNum = recentGitTag.slice(-1);
            const newRCNum = Number(oldRCNum)+1;
            const gitTagVersion = recentGitTag.split('-', 1);
    
            const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
                owner: 'wai-calvin',
                repo: github.context.payload.repository.name,
                ref: `refs/tags/${gitTagVersion}-rc${newRCNum}`,
                sha: github.context.payload.head_commit.id
            });
            console.log(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`);
        }
    }

    else {
        const gitTagVersion = recentGitTag.split('-', 1);
        const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: 'wai-calvin',
            repo: github.context.payload.repository.name,
            ref: `refs/tags/${gitTagVersion}`,
            sha: github.context.payload.head_commit.id
        });
        console.log(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`);
    } 
}

action();
