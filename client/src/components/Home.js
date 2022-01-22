import * as React from 'react';
import Schedule from './Schedule';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Schedule></Schedule>
    );
  }
}
