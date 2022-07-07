const core = require('@actions/core');
const github = require('@actions/github');

async function action() {
    
    //Grab inputs from action for auth token and whether or not this is a release candidate
    const myToken = core.getInput('token');
    const octokit = github.getOctokit(myToken);
    const releaseCandidate = core.getInput('release-candidate');

    //Grab all git tags for a specified repo
    const tags = await octokit.rest.repos.listTags({
        owner: github.context.payload.repository.owner.login,
        repo: github.context.payload.repository.name
    });

    //Variable for storing the most recent git tag
    const recentGitTag = tags.data[0].name;

    if(releaseCandidate == "true") {
        if(!recentGitTag.includes("-rc")) {
            //Grab patch number and increment by 1
            const oldPatchNum = recentGitTag.split('.').pop();
            const newPatchNum = Number(oldPatchNum)+1;
    
            //Add '-rc' to git tag
            const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
                owner: github.context.payload.repository.owner.login,
                repo: github.context.payload.repository.name,
                ref: `refs/tags/v1.0.${newPatchNum}-rc0`,
                sha: github.context.payload.head_commit.id
            });
            console.log(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`);
        }
    
        else {
            //Grab rc number and increment by 1
            const oldRCNum = recentGitTag.match(/\d+$/);
            const newRCNum = Number(oldRCNum)+1;
            const gitTagVersion = recentGitTag.split('-', 1);
    
            const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
                owner: github.context.payload.repository.owner.login,
                repo: github.context.payload.repository.name,
                ref: `refs/tags/${gitTagVersion}-rc${newRCNum}`,
                sha: github.context.payload.head_commit.id
            });
            // console.log(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`);
            core.notice(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`)
        }
    }

    else {
        //Take out '-rc' from git tag and push tag
        const gitTagVersion = recentGitTag.split('-', 1);
        const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            ref: `refs/tags/${gitTagVersion}`,
            sha: github.context.payload.head_commit.id
        });
        console.log(`Created tag ${createTag.data.ref} for commit ${createTag.data.object.sha}`);
    }
}

action();
