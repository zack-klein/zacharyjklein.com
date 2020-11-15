import { Button, Container, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import profilePic from '../assets/profilePic.png';

const linkedinUrl = 'https://linkedin.com/in/zacharyjklein/'
const githubUrl = 'https://github.com/zack-klein/'

export default function Home() {
  return (
    <Container text style={{ marginTop: '3em' }}>
      <Image centered src={ profilePic } size='medium' rounded />
      <FadeIn delay={150}>
        <h1 align="center" style={{ marginTop: '1em' }}>Zack Klein</h1>
        <div align="center" style={{ marginTop: '1em' }}>
          <Button animated='fade' as={ Link } to='/about'>
            <Button.Content visible>About Me</Button.Content>
            <Button.Content hidden><Icon name="arrow right" /></Button.Content>
          </Button>
          <Button animated='fade' as={ Link } to='/projects'>
            <Button.Content visible>Projects</Button.Content>
            <Button.Content hidden><Icon name="arrow right" /></Button.Content>
          </Button>
        </div>
        <div align="center" style={{ marginTop: '1em' }}>
        <Button circular color='linkedin' icon='linkedin' href={linkedinUrl} />
        <Button circular color='black' icon='github' href={githubUrl} />
        </div>
      </FadeIn>
    </Container>
  )
}