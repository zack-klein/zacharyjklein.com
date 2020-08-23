# Template S3 Website

![Tag](https://img.shields.io/github/v/tag/zack-klein/template-s3-website.svg) [![Build Status](https://travis-ci.com/zack-klein/template-s3-website.svg?branch=master)](https://travis-ci.com/zack-klein/template-s3-website) [![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/)

A template for static S3 websites written in React.

# Dependencies & Assumptions
- Docker/docker-compose for local development
- Assumes that there's an S3 bucket with the same name as the repo (it's fine to use without this as well, just change the name of the bucket in `scripts/publish.sh`)
