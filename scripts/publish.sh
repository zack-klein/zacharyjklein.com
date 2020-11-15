#!/bin/bash

set -e

echo "Setting up aws cli and yarn..."
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn -y

echo "Installing Terraform..."
cd ./terraform/
wget https://releases.hashicorp.com/terraform/0.12.29/terraform_0.12.29_linux_amd64.zip
unzip terraform_0.12.29_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm terraform_0.12.29_linux_amd64.zip

echo "Building infrastructure..."
terraform init
terraform apply -auto-approve
cd ../

echo "Building website..."
yarn install --check-files
yarn build

echo "Deploying website to S3..."
aws s3 sync build/ s3://zacharyjklein.com

echo "Done!"
