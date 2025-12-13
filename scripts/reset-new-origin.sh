#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# Safety: ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Please commit or stash changes before running this script." >&2
  git status --porcelain
  exit 1
fi

# Fetch all remotes
echo "Fetching all remotes..."
git fetch --all --prune

echo "Updating/creating local branch 'new-origin' from 'origin/new-origin' (if remote exists)"
# If origin/new-origin exists, create/update local branch new-origin from it, else create from HEAD
if git show-ref --verify --quiet refs/remotes/origin/new-origin; then
  git checkout -B new-origin origin/new-origin
else
  echo "Remote branch 'origin/new-origin' not found — creating local 'new-origin' from current HEAD"
  git checkout -B new-origin
fi

# Create backup branch of current new-origin
BACKUP_BRANCH="backup-before-92a7703"
if git show-ref --verify --quiet refs/heads/$BACKUP_BRANCH; then
  echo "Backup branch $BACKUP_BRANCH already exists locally; creating a new name with timestamp"
  BACKUP_BRANCH="$BACKUP_BRANCH-$(date +%Y%m%d%H%M%S)"
fi

echo "Creating backup branch '$BACKUP_BRANCH' pointing at current 'new-origin'"
git branch "$BACKUP_BRANCH"

echo "Pushing backup branch to origin"
git push -u origin "$BACKUP_BRANCH"

TARGET_COMMIT="92a7703"
# Verify target commit present locally, try to fetch if not
if ! git rev-parse --verify --quiet "$TARGET_COMMIT"; then
  echo "Commit $TARGET_COMMIT not found locally; attempting to fetch from origin..."
  git fetch origin "$TARGET_COMMIT" || true
fi

if ! git rev-parse --verify --quiet "$TARGET_COMMIT"; then
  echo "ERROR: Commit $TARGET_COMMIT could not be found locally or on origin." >&2
  echo "You must provide access to that commit (it must exist on a remote or locally)." >&2
  exit 2
fi

# Perform hard reset
echo "Checking out 'new-origin'"
git checkout new-origin

echo "Hard resetting 'new-origin' to commit $TARGET_COMMIT"
git reset --hard "$TARGET_COMMIT"

# Force-push to origin
read -p "About to force-push 'new-origin' to origin (this will overwrite origin/new-origin). Proceed? [y/N] " CONFIRM
CONFIRM=${CONFIRM:-N}
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
  echo "Force-pushing new-origin to origin..."
  git push --force origin new-origin
  echo "Force-push complete. Verify with git log or via your remote provider (Vercel)."
else
  echo "Aborting push. Local branch 'new-origin' reset to $TARGET_COMMIT and backup saved as $BACKUP_BRANCH."
  echo "If you want to push, run: git push --force origin new-origin"
fi

# Print summary
echo "Summary:"
echo "- Backup branch: $BACKUP_BRANCH"
echo "- Local 'new-origin' now at: $(git rev-parse --short HEAD)"
if git show-ref --verify --quiet refs/remotes/origin/new-origin; then
  echo "- Remote 'origin/new-origin' points at: $(git ls-remote origin refs/heads/new-origin | awk '{print $1}' || true)"
fi

echo "Script finished."
