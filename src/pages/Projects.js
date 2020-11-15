import { Button, Card, Container, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { buildCards } from '../components/Cards';

import profilePic from '../assets/profilePic.png';

const projects = [
  {
    name: 'Magellan',
    description: 'A simple but powerful data catalog built using Flask + Elasticsearch.',
    url: 'https://github.com/zack-klein/magellan',
    buttonText: "Check it out",
  },
  {
    name: 'Health Checker',
    description: 'A simple utility to make sure websites are alive and well.',
    url: 'https://github.com/zack-klein/health-checker',
    buttonText: "Check it out",
  },
  {
    name: "Karen's Fantasy Outlook",
    description: 'An analytics platform for my Fantasy Football league.',
    url: 'https://karens-fantasy-outlook.com/',
    buttonText: "Check it out",
  },
  {
    name: 'Resumayday',
    description: 'A job searching tool that uses simple machine learning.',
    url: 'https://resumayday.zacharyjklein.com/',
    buttonText: "Check it out",
  },
  {
    name: 'Key Me',
    description: 'Use natural language processing to extract words from some text.',
    url: 'https://keyme.zacharyjklein.com/',
    buttonText: "Check it out",
  },
  {
    name: 'Sentimenter',
    description: 'See what how the world feels about a certain topic.',
    url: 'https://sentimenter.zacharyjklein.com/',
    buttonText: "Check it out",
  },
  {
    name: "Zack's To Do's",
    description: "The tried and true first project of every developer...",
    url: 'https://todo.zacharyjklein.com/',
    buttonText: "Check it out",
  },
  {
    name: 'zacharyjklein.com',
    description: 'This website! Written in React and statically hosted in S3.',
    url: 'https://github.com/zack-klein/zacharyjklein.com',
    buttonText: "Check it out",
  },
  {
    name: 'Algos',
    description: 'Algorithm and Data Structures practice.',
    url: 'https://github.com/zack-klein/algos',
    buttonText: "Check it out",
  },
]


export default function Projects() {
  var cards = buildCards(projects);
  return (
    <Container textAlign="center" text style={{ marginTop: '3em' }}>
      <Image centered src={ profilePic } size='medium' rounded />
      <h1 align="center">Some things I've built</h1>
      <Button align="center" as={ Link } to="/">
        <Button.Content visible><Icon name="arrow left" /></Button.Content>
      </Button>
      <Card.Group centered style={{ marginTop: '1em' }}>
        {cards}
      </Card.Group>
    </Container>
  )
}
