# Simple static website with S3 and React

It's unbelievably easy to host a static website in AWS S3 these days. In this quick post, I'll walk through a nice setup to host a static website written in React in S3.

This guide assumes you have a basic understanding of:
  - AWS S3
  - React

I'll build the AWS infrastructure as code in [Terraform](https://www.terraform.io/), but it's not a requirement for understanding what's happening in this tutorial.

In this guide, we'll set up three things:
- A React app
- An S3 bucket configured to host a static site

## Write a quick React app

First off, make sure you have `node` installed. You can find instructions to install it [here](https://nodejs.org/en/download/package-manager/).

Once you have `node` installed, you'll get access to `yarn` - which we will use to manage our React app.

Let's create a new app by running:
```bash
npx create-react-app my-app
```

And start it by running:
```bash
cd ./my-app/
yarn start
```

Head to [http://localhost:3000/](http://localhost:3000/) and you should see the create-react-app splash screen:
![React Splash Screen](https://static.javatpoint.com/tutorial/reactjs/images/react-create-react-app5.png)

Our minimalist React app is good to go! Let's make a production build that we'll deploy to S3:

```bash
yarn build
```

You'll notice a new directory called `./build/` has been created. We'll come back to this later.

## Spin up an S3 Bucket

**WARNING:** We are going to make a public bucket. This is intentional, since we want to expose our React site to the internet. **Don't use this bucket to store private data. It's available to the public internet.** [There](https://www.theregister.co.uk/2017/07/12/14m_verizon_customers_details_out/) [are](https://www.theregister.co.uk/2017/08/17/chicago_voter_leak/) [lots](https://www.theregister.co.uk/2017/09/05/twc_loses_4m_customer_records/) [of](https://www.theregister.co.uk/2017/07/18/dow_jones_index_of_customers_not_prices_leaks_from_aws_repo/) [examples](https://www.theregister.co.uk/2017/08/22/open_aws_s3_bucket_leaked_hotel_booking_service_data_says_kromtech/) of data breaches because of public S3 buckets. Don't be the next one.

See the below terraform to create the bucket. You'll configure the website with the `website` block. The `index_document` variable tells S3 to look for a file named `index.html` to serve as the main page of the website.

*NOTE:* Replace `my-app` with a unique name for your bucket.

```terraform
resource "aws_s3_bucket" "b" {
  bucket = "my-app"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
```

## Deploy

We are ready to go! Let's deploy our production build to the bucket we just created:

*NOTE:* Replace `my-app` with the name of your bucket.
```aws
aws s3 sync ./build/ s3://my-app/ --acl public-read
```

Your deployment is complete! Your S3 website URL will be: `http://<your-bucket-name>.com.s3-website-us-east-1.amazonaws.com/`. Head there in your browser to see your app!

## Next up...

While this site is simple and elegant, it's not very functional. We're missing some basic components like:
  - Routing
  - A nice UI
  - A custom domain name
  - HTTPS

All that and more will be available in the next tutorial!
