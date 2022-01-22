import React from 'react';
import { List, ListItem, Divider } from 'react95';

const AppBar = () => (
  <div>

      <List>
        <ListItem>🎤 Sing</ListItem>
        <ListItem>💃🏻 Dance</ListItem>
        <Divider />
        <ListItem disabled>😴 Sleep</ListItem>
      </List>
  </div>
);

export default AppBar;