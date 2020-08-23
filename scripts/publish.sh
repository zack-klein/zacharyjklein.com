#!/bin/bash

set -e

echo "Setting up aws cli and node..."
pip install awscli
sudo apt-get update && sudo apt-get install nodejs -y


echo "Tagging repo..."
pip install chronos-cli
GIT_TAG=$(chronos infer)
git tag $GIT_TAG -a -m "[ci skip] Generated tag $GIT_TAG for build $TRAVIS_BUILD_NUMBER"
git push https://${GIT_TOKEN}@github.com/${GIT_ORG}/${GIT_REPO}.git --tags

echo "Installing Terraform..."
cd ./terraform/
wget https://releases.hashicorp.com/terraform/0.12.8/terraform_0.12.8_linux_amd64.zip
unzip terraform_0.12.8_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm terraform_0.12.8_linux_amd64.zip

echo "Building infrastructure..."
terraform init
terraform apply -auto-approve
cd ../

echo "Building website..."
npm i
npm run build

echo "Deploying website to S3..."
aws s3 sync build/ s3://template.zacharyjklein.com

echo "Done!"
