#!/usr/bin/env bash
# Publish dist/ to the gh-pages branch of the microos-site repository.
# Nothing is pushed by the build itself; run this only when the site is ready.
#
#   DEPLOY_REPO=git@github.com:TurboSosiska304/microos-site.git ./deploy.sh
#
# The GitHub Pages URL is https://turbososiska304.github.io/microos-site/.
set -euo pipefail

REPO="${DEPLOY_REPO:-git@github.com:TurboSosiska304/microos-site.git}"
BRANCH="${DEPLOY_BRANCH:-gh-pages}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT"

echo "==> installing from the lockfile"
npm ci

echo "==> building the static site"
npm run build

if [ ! -f dist/index.html ]; then
    echo "deploy: dist/index.html is missing" >&2
    exit 1
fi

echo "==> publishing dist/ to $REPO ($BRANCH)"
cd dist
# A deploy leaves a repository in dist/ for the force push; a second build
# must not inherit its branch.
rm -rf .git
git init -q
git checkout -q -b "$BRANCH"
git add -A
git -c user.name="Micro OS" -c user.email="turbososiska304@users.noreply.github.com" \
    commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git remote add origin "$REPO"
git push --force origin "$BRANCH"

echo "==> done: https://turbososiska304.github.io/microos-site/"
