import * as React from 'react';
import Schedule from './Schedule';


import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, List, ListItem, Divider, Bar, Hourglass, AppBar, Toolbar, TextField, Button, } from 'react95';
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

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      open: false
    }
    this.hideLoading = this.hideLoading.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  openMenu(open) {
    this.setState({ open: open });
  }

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
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Button
                      onClick={() => this.openMenu(!this.state.open)}
                      
                      style={{ fontWeight: 'bold' }}
                    >
                      <img
                        src={'./logo192.png'}
                        alt='Pixel Planner logo'
                        style={{ height: '20px', marginRight: 4 }}
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
                        onClick={() => this.openMenu(false)}
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
                </Toolbar>
              </AppBar>
              <Schedule style={{ marginTop: 20 }}></Schedule>
            </main>
          }
        </ThemeProvider>
      </div>
    );
  }
}
