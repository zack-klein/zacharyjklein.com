terraform {

  backend "s3" {
    bucket = "zacharyjklein-state"
    key    = "state/zacharyjklein.com.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region  = var.region
  version = "~> 2.60"
}

data "aws_acm_certificate" "web_cert" {
  domain      = "zacharyjklein.com"
  most_recent = true
}

module "website" {
  source      = "github.com/zack-klein/s3-website"
  bucket_name = "zacharyjklein.com"
  acm_arn     = data.aws_acm_certificate.web_cert.arn
}

data "aws_route53_zone" "zone" {
  name         = "zacharyjklein.com."
  private_zone = false
}

# Route 53

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "zacharyjklein.com"
  type    = "A"

  alias {
    name                   = module.website.cloudfront_distribution.domain_name
    evaluate_target_health = true
    zone_id                = module.website.cloudfront_distribution.hosted_zone_id
  }
}

# SES
resource "aws_ses_domain_identity" "email" {
  domain = "zacharyjklein.com"
}

resource "aws_route53_record" "example_amazonses_verification_record" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "_amazonses.example.com"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.email.verification_token]
}
