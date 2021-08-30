import React ,{ Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import store from './redux/store';
import {loadUser} from './redux/actions/authActions';
import { BrowserRouter as Router } from 'react-router-dom';
class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return ( 
      <Provider store={store}>
        <Router>
          <div className="App">
            <Main/>
          </div>
        </Router> 
        </Provider>
    );
  }
}

export default App;
