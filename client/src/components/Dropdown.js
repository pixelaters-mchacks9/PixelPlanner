import { Component } from "react";
import { List, ListItem, Divider, Button, } from 'react95';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.onMenuChange = this.onMenuChange.bind(this);
  }

  // Set the dropdown menu state
  onMenuChange(open) {
    this.setState({ open: open });
  }

  render() {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button
          onClick={() => this.onMenuChange(!this.state.open)}

          style={{ fontWeight: 'bold' }}
        >
          <img
            src={'./logo192.png'}
            alt='Pixel Planner logo'
            style={{ height: '24px', marginRight: 6 }}
          />
          Menu
        </Button>
        {this.state.open && (
          <List
            style={{
              position: 'absolute',
              left: '0',
              top: '100%'
            }}
            onClick={() => this.onMenuChange(false)}
          >
            <ListItem>
              <span role='img' aria-label='👨‍💻'>
                👨‍💻
              </span>
              Profile
            </ListItem>
            <ListItem>
              <span role='img' aria-label='🐦'>
                🐦
              </span>
              <a href="https://www.mchacks.ca/" target='_blank' rel="noreferrer">  McHacks </a>
            </ListItem>
            <Divider />
            <ListItem disabled>
              <span role='img' aria-label='🔙'>
                🔙
              </span>
              Logout
            </ListItem>
          </List>
        )}
      </div>
    );
  }
}