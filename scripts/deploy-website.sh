set -x

echo "Building website..."
yarn build

echo "Deploying website to S3..."
aws s3 sync build/ s3://zacharyjklein.com

echo "Done!"