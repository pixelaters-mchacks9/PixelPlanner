import { Component } from "react";
import Schedule from './Schedule';
import Dropdown from './Dropdown';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, Hourglass, AppBar, Toolbar } from 'react95';
// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      open: false
    }
    this.hideLoading = this.hideLoading.bind(this);
  }

  //Hide the Hourglass
  hideLoading() {
    this.setState({ loading: false });
  }

  // Call method to change state appropriately
  componentDidMount() {
    this.hideLoading();
  }

  render() {
    return (
      <div >
        <GlobalStyles />
        <ThemeProvider theme={original}>
          {this.state.loading === true ?
            <div className="flex items-center justify-center">
              <Hourglass size={40} />
            </div>
            :
            <main style={{ background : "#181a1b"}}>
              <AppBar style={{ zIndex: 3, paddingBottom: 4, marginBottom: 4}}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                  <Dropdown 
                    open={this.state.open}
                    onMenuChange={this.onMenuChange}
                  />
                </Toolbar>
              </AppBar>
              <Schedule></Schedule>
            </main>
          }
        </ThemeProvider>
      </div>
    );
  }
}
