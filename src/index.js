import React from 'react'
import { render } from 'react-dom'
import Routes from './routes'
import storeFactory from './store'
import { addError } from './actionCreators'
import { Provider } from 'react-redux'
import './stylesheets/index.scss'

const initialState = JSON.parse(localStorage.getItem('redux-store')) || {}
const store = storeFactory(initialState)

function saveState() {
	const state = JSON.stringify(store.getState())
	localStorage.setItem('redux-store', state)
}

function handleError(error) {
	store.dispatch(addError(error.message))
}

store.subscribe(saveState)

window.React = React
window.addEventListener("error", handleError)

render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('react-container')
)