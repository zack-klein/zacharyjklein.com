terraform {

  backend "s3" {
    bucket = "zacharyjklein-state"
    key    = "state/template-s3-website.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region  = var.region
  version = "~> 2.60"
}


resource "aws_s3_bucket" "b" {
  bucket = var.bucket_name
  acl    = "public-read"
  policy = templatefile("policy.json", { bucket = var.bucket_name })

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
