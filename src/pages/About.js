import { Button, Container, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import profilePic from '../assets/profilePic.png';

export default function About() {
  return (
    <div>
    <Container text style={{ marginTop: '3em' }}>
    <Image centered src={ profilePic } size='medium' rounded />
    <h1 align="center">About Me</h1>
    <div align="center">
      <Button as={ Link } to="/">
        <Button.Content visible><Icon name="arrow left" /></Button.Content>
      </Button>
      <FadeIn delay={50}>
        <p align="left" style={{ marginTop: '1em' }}>
          It's really hard to build stuff well. It takes creativity, teamwork,
          boldness, humility, and (most of all) patience. But when we get it
          right, we learn we can achieve much more than we think. I’m deeply
          inspired by obsessive builders - people who do whatever it takes
          to build things the right way. And I like to think I wear that
          passion and excitement for building stuff on my sleeve every day.
        </p>
      </FadeIn>
    </div>
    </Container>
    </div>
  )
}
