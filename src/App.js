import React from 'react';
import './App.css';
import { Profile } from './components/Profile';
import { Directory } from './components/Directory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: null,
    };
    this.handleChoose = this.handleChoose.bind(this);
    this.handleReturnToDirectoryClick = this.handleReturnToDirectoryClick.bind(
      this
    );
  }

  handleChoose(newUsername) {
    this.setState({ currentUsername: newUsername });
  }

  handleReturnToDirectoryClick() {
    this.setState({ currentUsername: null });
  }

  render() {
    let body;
    if (this.state.currentUsername) {
      body = (
        <Profile
          username={this.state.currentUsername}
          onChoose={this.handleChoose}
        />
      );
    } else {
      body = <Directory onChoose={this.handleChoose} />;
    }

    return (
      <div className="App">
        <header>
          <h1>PetBook</h1>

          <nav>
            {this.state.currentUsername && (
              <button onClick={this.handleReturnToDirectoryClick}>
                Return to directory
              </button>
            )}
          </nav>
        </header>

        <main>{body}</main>
      </div>
    );
  }
}


export default App;
