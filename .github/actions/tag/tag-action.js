const core = require('@actions/core');
const github = require('@actions/github');

async function action() {
    
    // console.log(github.context);
    const myToken = core.getInput('token');
    const octokit = github.getOctokit(myToken);
    const releaseCandidate = core.getInput('release-candidate');

    const tags = await octokit.rest.repos.listTags({
        owner: "wai-calvin",
        repo: github.context.payload.repository.name,
    });

    const version = recentGitTag.split('-', 1);
    console.log(version);

    // console.log(tags);
    // console.log(tags.data[0].name);
//     const recentGitTag = tags.data[0].name;

//     if(releaseCandidate == "true") {
//         if(!recentGitTag.includes("-rc")) {
//             const oldPatchNum = recentGitTag.slice(-1);
//             const newPatchNum = Number(oldPatchNum)+1;
//             console.log(newPatchNum);
    
//             const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
//                 owner: "wai-calvin",
//                 repo: github.context.payload.repository.name,
//                 ref: `refs/tags/v1.0.${newPatchNum}-rc0`,
//                 sha: github.context.payload.head_commit.id
//             });
//             console.log(createTag);
//         }
    
//         else {
//             const oldRC = recentGitTag.slice(-1);
//             const newRC = Number(oldRC)+1;
//             console.log(newRC);
    
//             const currentVersion = recentGitTag.split('-', 1);
//             console.log(currentVersion);
    
//             const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
//                 owner: 'wai-calvin',
//                 repo: github.context.payload.repository.name,
//                 ref: `refs/tags/${currentVersion}-rc${newRC}`,
//                 sha: github.context.payload.head_commit.id
//             });
//             console.log(createTag);
//         }
//     }

//     else {
//         const version = recentGitTag.split('-', 1);
//         const createTag = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
//             owner: 'wai-calvin',
//             repo: github.context.payload.repository.name,
//             ref: `refs/tags/${version}`,
//             sha: github.context.payload.head_commit.id
//         });
//         console.log(createTag);
//     }
//     // console.log(createTag);

//     // const tagObject = await octokit.rest.git.createTag({
//     //     owner: "wai-calvin",
//     //     repo: "ghas-bootcamp-test",
//     //     tag: recentGitTag,
//     //     message: "some message",
//     //     object: "",
//     //     type,
//     //     tagger.name,
//     //     tagger.email
//     // })
//     // if(!recentGitTag.includes("-rc")) {
        
//     // }
    
// }

action();
