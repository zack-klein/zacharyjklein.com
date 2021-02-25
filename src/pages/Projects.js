import { Button, Card, Container, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { buildCards } from "../components/Cards";

import profilePic from "../assets/profilePic.jpeg";
import Footer from "../components/Footer";

const projects = [
  {
    name: "Comprendo",
    description: "A cool Machine Learning tool to scrape entites from Tweets.",
    url: "https://comprendo.zacharyjklein.com/",
    buttonText: "Check it out",
    tags: [
      { name: "Machine Learning", color: "teal" },
      { name: "React", color: "blue" },
      { name: "AWS Lambda", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "AWS CDK", color: "green" },
      { name: "Python", color: "orange" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "Erasmo",
    description: "A nifty online platform to simulate trading fake stocks.",
    url: "https://erasmo.zacharyjklein.com/",
    buttonText: "Check it out",
    tags: [
      { name: "Flask", color: "black" },
      { name: "React", color: "blue" },
      { name: "AWS", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "Python", color: "orange" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "SQLAlchemy Multitenancy",
    description: "A quick POC of how to build a SAAS with Flask & SQLAlchemy.",
    url: "https://github.com/zack-klein/multi-tenant-sqlalchemy/",
    buttonText: "Check it out",
    tags: [
      { name: "Flask", color: "black" },
      { name: "Python", color: "orange" },
    ],
  },
  {
    name: "Magellan",
    description:
      "A simple but powerful data catalog built using Flask + Elasticsearch.",
    url: "https://github.com/zack-klein/magellan",
    buttonText: "Check it out",
    tags: [
      { name: "Flask", color: "black" },
      { name: "Python", color: "orange" },
      { name: "Elasticsearch", color: "red" },
    ],
  },
  {
    name: "Health Checker",
    description: "A simple utility to make sure websites are alive and well.",
    url: "https://github.com/zack-klein/health-checker",
    buttonText: "Check it out",
    tags: [
      { name: "Django", color: "green" },
      { name: "Python", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "AWS", color: "orange" },
    ],
  },
  {
    name: "Karen's Fantasy Outlook",
    description: "An analytics platform for my Fantasy Football league.",
    url: "https://github.com/zack-klein/karen/",
    buttonText: "Check it out",
    tags: [
      { name: "Python", color: "orange" },
      { name: "Streamlit", color: "red" },
      { name: "Terraform", color: "purple" },
      { name: "AWS", color: "orange" },
    ],
  },
  {
    name: "Resumayday",
    description: "A job searching tool that uses simple machine learning.",
    url: "https://resumayday.zacharyjklein.com/",
    buttonText: "Check it out",
    tags: [
      { name: "React", color: "blue" },
      { name: "AWS", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "Python", color: "orange" },
      { name: "Machine Learning", color: "teal" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "Key Me",
    description:
      "Use natural language processing to extract words from some text.",
    url: "https://keyme.zacharyjklein.com/",
    buttonText: "Check it out",
    tags: [
      { name: "React", color: "blue" },
      { name: "AWS", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "Python", color: "orange" },
      { name: "Machine Learning", color: "teal" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "Sentimenter",
    description: "See what how the world feels about a certain topic.",
    url: "https://sentimenter.zacharyjklein.com/",
    buttonText: "Check it out",
    tags: [
      { name: "React", color: "blue" },
      { name: "AWS", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "Python", color: "orange" },
      { name: "Machine Learning", color: "teal" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "Zack's To Do's",
    description: "The tried and true first project of every developer...",
    url: "https://todo.zacharyjklein.com/",
    buttonText: "Check it out",
    tags: [
      { name: "React", color: "blue" },
      { name: "AWS", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "Docker", color: "blue" },
      { name: "Flask", color: "black" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "zacharyjklein.com",
    description: "This website! Written in React and statically hosted in S3.",
    url: "https://github.com/zack-klein/zacharyjklein.com",
    buttonText: "Check it out",
    tags: [
      { name: "React", color: "blue" },
      { name: "AWS", color: "orange" },
      { name: "Terraform", color: "purple" },
      { name: "JavaScript", color: "yellow" },
    ],
  },
  {
    name: "Algos",
    description: "Algorithm and Data Structures practice.",
    url: "https://github.com/zack-klein/algos",
    buttonText: "Check it out",
    tags: [
      { name: "Python", color: "orange" },
      { name: "JavaScript", color: "yellow" },
      { name: "SQL", color: "grey" },
    ],
  },
];

export default function Projects() {
  var cards = buildCards(projects);
  return (
    <Container textAlign="center" text style={{ marginTop: "3em" }}>
      <Image centered src={profilePic} size="medium" rounded />
      <h1 align="center">Some things I've built</h1>
      <Button align="center" as={Link} to="/">
        <Button.Content visible>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
      <Card.Group centered style={{ marginTop: "1em" }}>
        {cards}
      </Card.Group>
      <Footer />
    </Container>
  );
}
