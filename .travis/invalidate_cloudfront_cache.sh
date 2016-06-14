###############################################################################
###  Resets CloudFront cache with boto/cfadmin utility
###  Run: ./this_script  
###############################################################################

#
# Travis specific part - run this script only for production
#

# If this is fork - just exit
if [[ -n "${TRAVIS_PULL_REQUEST}" && "${TRAVIS_PULL_REQUEST}" != "false"  ]]; then
  echo -e "\nThis is a pull request...we don't deploy pull requests. (stopping.)\n"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
    echo -e "\nHey! Master branch. We've deployed by now, so let's invalidate the cache.\n"
else
    echo -e "\nThis is a non-production branch...we don't deploy non-production branches. (stopping.)\n"
    exit 0
fi

#
# Install boto
#
echo -e "\nInstalling boto...\n"
git clone git://github.com/boto/boto.git
cd boto
sudo python setup.py install
cd ../
sudo rm -rf boto

#
# Set up credentials for boto
#
echo -e "\nSetting up boto credentials...\n"
echo "[Credentials]" >> ~/.boto
echo "aws_access_key_id = $1" >> ~/.boto
echo "aws_secret_access_key = $2" >> ~/.boto

# $CLOUDFRONT_DISTID - distribution configured for the Web - in aws amazon cloudfront distributions.
#
CLOUDFRONT_DISTID=$3

echo -e "\nSending invalidation requests...\n"
for path in $(find dist/ -type f -not \( -path "dist/fonts/*" -o -path "dist/tests/*" \)); do
#Use the above fore a more efficient request - Use the below for a more complete request
#for path in $(find dist/ -type f); do
	echo ${path#dist};
        cfadmin invalidate $CLOUDFRONT_DISTID ${path#dist};
done;

echo -e "\nInvalidation is now in progress.\n"
echo -e "\nYou can check the status on the \"Invalidations\" tab in your AWS Console."
#
# Clean up
#
echo -e "\nDoing some clean up...\n"
rm ~/.boto
echo -e "\nDone. Cheers!\n"
