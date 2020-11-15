import React from 'react'
import { Divider, Segment } from 'semantic-ui-react'

export default function Footer(){
  return (
    <Segment basic textAlign='center'>
      <Divider />
      <p>
        All content on this site is my own and doesn't reflect the views of my
        employer.
      </p>
    </Segment>
  )
}
