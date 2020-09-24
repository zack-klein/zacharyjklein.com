#!/bin/bash

set -e

echo "Setting up aws cli and node..."
pip install -r requirements.txt

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
mkdir -p ./build/
STATIC_DIR=static/ python manage.py collectstatic --no-input
STATIC_DIR=static/ python manage.py distill-local build --force --skip-checks

echo "Deploying website to S3..."
aws s3 sync build/ s3://zacharyjklein.com

echo "Done!"
