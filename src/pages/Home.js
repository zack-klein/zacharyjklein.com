import { Button, Container, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

import profilePic from "../assets/profilePic.jpeg";
import Footer from "../components/Footer";

const linkedinUrl = "https://linkedin.com/in/zacharyjklein/";
const githubUrl = "https://github.com/zack-klein/";

export default function Home() {
  return (
    <Container text style={{ marginTop: "3em" }}>
      <Image centered src={profilePic} size="medium" rounded />
      <FadeIn delay={125}>
        <h1 align="center" style={{ marginTop: "1em" }}>
          Zack Klein
        </h1>
        <div align="center" style={{ marginTop: "1em" }}>
          <p>
            I'm a data engineer in New York City currently working for{" "}
            <a href="https://blackstone.com/">Blackstone</a>. This website is
            where I publish random blog posts and projects that I work on in my
            free time. Enjoy!
          </p>
        </div>
        <div align="center" style={{ marginTop: "1em" }}>
          <Button animated="fade" as={Link} to="/about">
            <Button.Content visible>About Me</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
          <Button animated="fade" as={Link} to="/projects">
            <Button.Content visible>Projects</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
          <Button animated="fade" as={Link} to="/blog">
            <Button.Content visible>Blog</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
        <div align="center" style={{ marginTop: "1em" }}>
          <Button
            circular
            color="linkedin"
            icon="linkedin"
            href={linkedinUrl}
          />
          <Button circular color="black" icon="github" href={githubUrl} />
        </div>
        <div>
          <Footer />
        </div>
      </FadeIn>
    </Container>
  );
}
