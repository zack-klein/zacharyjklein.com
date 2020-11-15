import { Button, Card, Container, Icon, Image } from 'semantic-ui-react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { buildCards } from '../components/Cards';
import Post from '../components/Post';

import profilePic from '../assets/profilePic.png';

const posts = [
  {
    name: 'Simple static website with S3 and React',
    description: 'Spin up a React app in AWS in a few minutes.',
    url: '/blog/posts/dead-simple-react-s3',
    date: "11/15/2020",
    buttonText: "Read",
    s3Uri: "https://zacharyjklein-blog.s3.amazonaws.com/deadSimpleReact.md",
  },
];

export default function Blog() {
  let match = useRouteMatch();
  var cards = buildCards(posts);
  return (
    <Switch>
      <Route path={`${match.path}/posts/:postName`}>
        <Post postConfigs={posts} />
      </Route>
      <Route path={match.path}>
        <Container textAlign="center" text style={{ marginTop: '3em' }}>
          <Image centered src={ profilePic } size='medium' rounded />
          <h1 align="center">Some things I've written</h1>
          <Button align="center" as={ Link } to="/">
            <Button.Content visible><Icon name="arrow left" /></Button.Content>
          </Button>
          <Card.Group centered style={{ marginTop: '1em' }}>
            {cards}
          </Card.Group>
        </Container>
      </Route>
    </Switch>
  )
}
