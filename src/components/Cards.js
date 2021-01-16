import { Button, Card, Divider, Label } from "semantic-ui-react";
import FadeIn from "react-fade-in";

/**
 * buildCard - Build a nice looking card with cascading fade in.
 *
 * @param  {Obj} cardObj Expects to have attrs: name, description, buttonText,
 * and url.
 * @param  {Num} delay   FadeIn delay for each object.
 * @return {null}        None
 */
function buildCard(cardObj, delay) {
  let tags = [];

  if (cardObj.tags) {
    cardObj.tags.map((tag) => {
      tags.push(
        <Label tag size="small" color={tag.color} content={tag.name} />
      );
    });
  }

  let card = (
    <FadeIn delay={delay} key={cardObj.name}>
      <Card key={cardObj.name} style={{ marginTop: "1em", marginLeft: "1em" }}>
        <Card.Content>
          <Card.Header>{cardObj.name}</Card.Header>
          <Card.Description>{cardObj.description}</Card.Description>
          <Card.Meta>
            <span className="date">{cardObj.date}</span>
          </Card.Meta>
          <Divider />
          {tags}
        </Card.Content>
        <Card.Content>
          <div className="ui">
            <Button color="blue" href={cardObj.url}>
              {cardObj.buttonText}
            </Button>
          </div>
        </Card.Content>
      </Card>
    </FadeIn>
  );
  return card;
}

export function buildCards(cardObjs) {
  let cards = [];
  let firstDelay = 100;

  for (var i = 0; i < cardObjs.length; i++) {
    let card = buildCard(cardObjs[i], firstDelay);
    firstDelay += 50;
    cards.push(card);
  }
  return cards;
}
