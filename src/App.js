import React, { Component } from 'react';
import axios from 'axios';

import { username, repositoryName, prApiUrl } from './constants';
import { TokenForm } from './components/TokenForm';
import { PrsList } from './components/PrsList';
import { MaskedToken } from './components/MaskedToken';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username,
      repositoryName,
      token: null,
      tokenInput: '',
      prs: []
    };
  }

  fetchApi({ url, token }) {
    axios
      .get(url, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      .then(({ data }) => {
        console.log('data', data);

        this.setState({
          prs: data.filter(pr => pr.user.login === username)
        });
      })
      .catch(err => console.log('oh no!', err));
  }
  handleTokenInputChange = event => {
    const tokenInput = event.target.value;
    this.setState({ tokenInput });
  };
  handleOpenChangeTokenForm = event => {
    this.setState({ token: null });
  };
  fetchPrs = () => {
    const { repositoryName } = this.state;
    const token = this.getToken.call(this);
    const url = prApiUrl({ repositoryName });
    this.fetchApi({ url, token });
  };
  saveToken = () => {
    if (this.state.tokenInput === '') {
      return;
    }
    const { tokenInput } = this.state;
    this.setState({ token: tokenInput, tokenInput: '' }, this.fetchPrs);
  };
  getToken() {
    return this.state.token || localStorage.getItem('token');
  }
  componentDidMount() {
    const token = this.getToken.call(this);
    this.setState({ token });
    token && this.fetchPrs();
  }
  componentDidUpdate(prevProps, prevState) {
    // update token if it was changed
    if (prevState.token !== this.state.token) {
      if (this.state.token) {
        localStorage.setItem('token', this.state.token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }
  render() {
    const hasToken = this.state.token !== null;

    return (
      <div className="App">
        {!hasToken && (
          <TokenForm
            tokenInput={this.state.tokenInput}
            handleChange={this.handleTokenInputChange}
            save={this.saveToken}
          />
        )}
        {hasToken && (
          <div>
            Using Token ending with <MaskedToken token={this.state.token} />{' '}
            <button
              onClick={this.handleOpenChangeTokenForm}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Change token
            </button>
            <button onClick={this.fetchPrs}>Fetch PRs</button>
          </div>
        )}
        <hr />
        {hasToken && (
          <div>
            <p>
              <strong>{this.state.username}</strong> pull requests:
            </p>
            <PrsList prs={this.state.prs} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
