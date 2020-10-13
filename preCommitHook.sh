npm run ncuUpdate \
  && git add package.json package-lock.json \
  && npm run linter \
  && npm test \
  && npm run build  
