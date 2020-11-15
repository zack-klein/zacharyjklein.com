import { Button, Card, Container, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import profilePic from '../assets/profilePic.png';

const projects = [
  {
    name: 'Magellan',
    description: 'A simple but powerful data catalog built using Flask + Elasticsearch.',
    url: 'https://github.com/zack-klein/magellan',
  },
  {
    name: 'Health Checker',
    description: 'A simple utility to make sure websites are alive and well.',
    url: 'https://github.com/zack-klein/health-checker',
  },
  {
    name: "Karen's Fantasy Outlook",
    description: 'An analytics platform for my Fantasy Football league.',
    url: 'https://karens-fantasy-outlook.com/',
  },
  {
    name: 'Resumayday',
    description: 'A job searching tool that uses simple machine learning.',
    url: 'https://resumayday.zacharyjklein.com/',
  },
  {
    name: 'Key Me',
    description: 'Use natural language processing to extract words from some text.',
    url: 'https://keyme.zacharyjklein.com/',
  },
  {
    name: 'Sentimenter',
    description: 'See what how the world feels about a certain topic.',
    url: 'https://sentimenter.zacharyjklein.com/',
  },
  {
    name: "Zack's To Do's",
    description: "The tried and true first project of every developer...",
    url: 'https://todo.zacharyjklein.com/',
  },
  {
    name: 'Algos',
    description: 'Algorithm and Data Structures practice.',
    url: 'https://github.com/zack-klein/algos',
  },
]

function buildCard(project, delay) {
  let card = (
    <FadeIn delay={delay}>
    <Card key={project.name} style={{ marginTop: '1em', marginLeft: '1em', }}>
      <Card.Content>
        <Card.Header>{project.name}</Card.Header>
        <Card.Description>
          {project.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui'>
          <Button color="blue" href={project.url}>
            Check it out
          </Button>
        </div>
      </Card.Content>
    </Card>
    </FadeIn>
  );
  return card;
}

function buildCards(cardObjs) {
  let cards = [];
  let firstDelay = 100;

  for (var i=0; i < cardObjs.length; i++){
    let card = buildCard(cardObjs[i], firstDelay);
    firstDelay += 50;
    cards.push(card);
  };
  return cards;
};


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
