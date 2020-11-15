import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function MainMenu() {

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name='home'
          as={ Link }
          to='/'
        />
        <Menu.Item
          name='aboutMe'
          as={ Link }
          to='/about'
        />
        <Menu.Item
          name='projects'
          as={ Link }
          to='/projects'
        />
      </Menu>
    </div>
  )
}
