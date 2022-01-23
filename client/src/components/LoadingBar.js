import { Component } from "react";
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { LoadingIndicator } from 'react95';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';

export default class LoadingBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Loading...</p>
        <LoadingIndicator isLoading />
      </div>
    );
  }
}