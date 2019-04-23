import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router,hashHistory,Route} from 'react-router'
import workReducer from './reducers/work'

import ScreenTask from './screens/Task/ScreenTask'
import ScreenWork from './screens/Work/ScreenWork'
import ScreenAdmin from './screens/Admin/ScreenAdmin'
const store =createStore(workReducer)
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={ScreenAdmin}/>
			<Route path="/task" component={ScreenTask}/>
			<Route path="/work" component={ScreenWork}/>
		</Router>
    </Provider>,
	document.getElementById('root')
)
document.title = "华西标注系统"
export default store
