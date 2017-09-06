# Readable Project

This repo is the second deliverable for the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

The Readable app is an anonymous content and comment system. It showcases the use of react and redux in a close to real world environment

## Project Setup
* clone the Project - `git clone https://github.com/antoinema/reactnd-readable.git`
* install the dependencies - `npm install`
* start the project - `npm start`

## Development concepts
* [Normalized state](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) and [Updating normalized state](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html)
* [Separation of concerns](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) with containers
* [Asyncronous actions](redux.js.org/docs/advanced/AsyncActions.html) using Redux Thunk
* Small [API middleware to reduce boiler plate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html)
* [Use of selectors](https://github.com/reactjs/reselect) to compute derived data

## User interface
The user interface relies on [Bulma CSS framework](http://bulma.io/)


## Areas of improvement
* Update the UI before the API returns to get a more responsive UX
* Auto select category on new post creation (with the currently selected category)