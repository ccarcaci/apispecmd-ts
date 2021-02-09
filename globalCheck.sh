set -e

npm run ncuUpdateMinor

printf '\nMajor Updates...\n\n'
npm run ncuVerifyUpdateMajor
git add package.json package-lock.json

printf '\nLinting...\n\n'
npm run linter

printf '\nTesting...\n\n'
npm test

printf '\nBuilding...\n\n'
npm run build

printf '\nDone\n\n'
