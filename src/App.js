import React, { Component } from 'react';
import axios from 'axios';

import { username, repositoryName, prApiUrl } from './constants';
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
    this.handleTokenInputChange = this.handleTokenInputChange.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.fetchPrs = this.fetchPrs.bind(this);
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
          prs: data.filter(event => event.type === 'PullRequestEvent' && event.payload.pull_request.state === 'open')
        });
      })
      .catch(err => console.log('oh no!', err));
  }
  handleTokenInputChange(event) {
    const tokenInput = event.target.value;
    this.setState({ tokenInput });
  }
  fetchPrs() {
    const { username, repositoryName } = this.state;
    const token = this.getToken.call(this);
    const url = prApiUrl({ username, repositoryName });
    this.fetchApi({ url, token });
  }
  saveToken() {
    if (this.state.tokenInput === '') {
      return;
    }
    const { tokenInput } = this.state;
    this.setState({ token: tokenInput, tokenInput: '' });
  }
  getToken() {
    return this.state.token || localStorage.getItem('token');
  }
  componentDidMount() {
    const token = this.getToken.call(this);
    this.setState({ token });
    console.log('token', token);
    token && this.fetchPrs();
  }
  componentDidUpdate(prevProps, prevState) {
    // update token if it was changed
    if (prevState.token !== this.state.token) {
      localStorage.setItem('token', this.state.token);
    }
  }
  render() {
    const hasToken = this.state.token !== null;
    return (
      <div className="App">
        {!hasToken && (
          <div>
            <input
              type="text"
              value={this.state.tokenInput}
              onChange={this.handleTokenInputChange}
            />
            <button onClick={this.saveToken}>set token</button>
          </div>
        )}
        <div>
          <button onClick={this.fetchPrs}>fetch PRs</button>
        </div>
        <div>
          <strong>{this.state.username}</strong> pull requests:
        </div>
        {this.state.prs.map(pr => <p key={pr.id}>{pr.number}</p>)}
      </div>
    );
  }
}

export default App;
