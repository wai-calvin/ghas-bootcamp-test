const core = require('@actions/core');
const github = require('@actions/github');

async function action() {
    
    console.log(github.context);
    // const myToken = core.getInput('myToken');
    const octokit = github.getOctokit("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");

    const tags = await octokit.rest.repos.listTags({
        owner: "wai-calvin",
        repo: "ghas-bootcamp-test",
    });

    console.log(tags);
    console.log(tags.data[0].name);
    const recentGitTag = tags.data[0].name;

    if(!recentGitTag.includes("-rc")) {
        const oldPatchNum = recentGitTag.slice(-1);
        const newPatchNum = Number(oldPatchNum)+1;
        console.log(newPatchNum);

        const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: 'wai-calvin',
            repo: 'ghas-bootcamp-test',
            ref: `refs/tags/v1.0.${newPatchNum}-rc0`,
            sha: '6c96128a2fcf5006210a7d4db238e95713de6abf'
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
            repo: 'ghas-bootcamp-test',
            ref: `refs/tags/${currentVersion}-rc${newRC}`,
            sha: '6c96128a2fcf5006210a7d4db238e95713de6abf'
        });
        console.log(createTag);

    }

    // console.log(createTag);

    // const tagObject = await octokit.rest.git.createTag({
    //     owner: "wai-calvin",
    //     repo: "ghas-bootcamp-test",
    //     tag: recentGitTag,
    //     message: "some message",
    //     object: "",
    //     type,
    //     tagger.name,
    //     tagger.email
    // })
    // if(!recentGitTag.includes("-rc")) {
        
    // }
    
}

action();
