# AME 220 - Spring 2025

This repository houses my assignment submissions and in-progress work for AME 220. It will be privated and renamed at the end of the semester.

Quick note: Unfortunately I had to get a bit "creative" when deploying my site thanks to NPM. The built code is available on the "gh-pages" branch, while the source is in the src subdirectory on this branch.

### Deployment Process (workaround)

Checkout origin/main
From the root of the repo, run "npm run build"
Copy the "./dist" directory out of the repo.
Checkout origin/gh-pages
Copy the contents of dist back into the repo. (There's likely a way to do this faster, but Git was being difficult.)
Commit & push. Github will run its deployment scripts automagically.