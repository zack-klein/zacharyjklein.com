import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import { useRouteMatch, Link } from 'react-router-dom';
import { Button, Container, Icon, Image, Label, Loader } from 'semantic-ui-react';
import FadeIn from 'react-fade-in';

import profilePic from '../assets/profilePic.png';

// This is a little hacky...
function getThisPost(url, posts){
  var post;
  for (var i=0; i < posts.length; i++){
    var postConfig = posts[i]
    if (postConfig.url === url){
      post = postConfig;
    }
  }
  return post
};

const gfm = require('remark-gfm')

export default function Post(props) {
  const [post, setPost] = useState(<Loader active inline='centered' />);

  let thisPostUrl = useRouteMatch().url;
  let thisPost = getThisPost(thisPostUrl, props.postConfigs);

  useEffect(() => {
    fetch(thisPost.s3Uri)
      .then((res) => {
        if (res.ok) {
          return res.text()
        } else {
          throw Error(res.statusText)
        }
      }).then((resText) => {
        setPost(
          <React.Fragment>
            <ReactMarkdown plugins={[gfm]} children={resText} />
            <p style={{ marginTop: '3em' }}>
              <i>Published on {thisPost.date}</i>
            </p>
          </React.Fragment>
        );
      }).catch((error) => {
        console.log(error);
        setPost(<Label color="red"><Icon name='warning sign' />Couldn't get that post!</Label>)
      })
  });

  return (
    <Container textAlign="center" text style={{ marginTop: '3em' }}>
      <Image centered src={ profilePic } size='medium' rounded />
      <h1 align="center">Some things I've written</h1>
      <Button align="center" as={ Link } to="/blog">
        <Button.Content visible><Icon name="arrow left" /></Button.Content>
      </Button>
      <div align="left" style={{ marginTop: '1em' }}>
        <FadeIn delay={300}>
          {post}
        </FadeIn>
      </div>
    </Container>
  )
};
