import React, { Component } from 'react';
import axios from 'axios';

import { username, repositoryName, prApiUrl } from './constants';
import { PrLink } from './components/PrLink';
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
          prs: data.filter( pr => pr.user.login === username )
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
    const maskedToken = hasToken ? this.state.token.replace(/.+([\w]{4})$/i, '$1') : '';
    return (
      <div className="App">
        {!hasToken && (
          <div>
            <input
              type="text"
              value={this.state.tokenInput}
              onChange={this.handleTokenInputChange}
            />
            <button onClick={this.saveToken}>Set token</button>
          </div>
        )}
        {hasToken && (
          <div>
            Using Token ending with ****{maskedToken}{' '}
            <button onClick={this.handleOpenChangeTokenForm} style={{backgroundColor:'red',color:'white'}}>Change token</button>
            <button onClick={this.fetchPrs}>Fetch PRs</button>
          </div>
        )}
        {hasToken && (
          <div>
            <hr />
            <div>
              <strong>{this.state.username}</strong> pull requests:
            </div>
            <ul>
              {this.state.prs.map(pr => (
                <PrLink
                  prNumber={pr.number}
                  createdAt={pr.created_at}
                  updatedAt={pr.updated_at}
                  key={pr.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default App;
