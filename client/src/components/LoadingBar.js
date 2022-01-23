import { Component } from "react";
import { LoadingIndicator } from 'react95';

export default class LoadingBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <p style={{ textAlign: 'center' }}>Loading...</p>
        <LoadingIndicator isLoading />
      </div>
    );
  }
}