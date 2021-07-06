# NextJS Website

## Installation
1. Clone this repsitory
2. cd into the new folder
3. `yarn`
4. `yarn prepare` builds first content cache and sets up precommit functionality
4. `yarn dev` to develop
5. `yarn build` to test building

When editing content locally, the site cache will be out of sync the the content directory. You can run `yarn cache-posts` to rebuild your content cache manually in the dev environment.

## Environment Variables

If hosted on Vercel, setup your environment variables there. Otherwise you can use .evn.local to store your development environment variables.

Have fun!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/matt-antone/nextjs-website-template.git)