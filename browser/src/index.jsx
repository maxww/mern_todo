import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import {Router, Route, Redirect, hashHistory} from 'react-router';

class NoMatch extends React.Component {
	render() {
		return (
			<h2>No match for the route</h2>
		)
	}
}

render((
	<Router history={hashHistory}>
		<Route path='/todos' component={App}/>
		<Redirect from='/' to='/todos'/>
		<Route path='*' component={NoMatch}/>
	</Router>
), document.getElementById('app'))
