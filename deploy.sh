# Ensure current version of master is pulled
git checkout master
git pull --ff-only

# Show preview of changes
./preview.sh

# Prompt whether to apply changes
echo
echo "Review above preview of changes."
read -p "Proceed with applying changes? (y/n) " apply

echo
case $apply in
  [Yy]*) # Push up changes
         pulumi up -s dev
         ;;
  *) echo "Changes not applied"
     ;;
esac

# Bump the minor version
npm version minor

# Push code changes
git push --no-verify
