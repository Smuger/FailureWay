# FailureWay
FailureWay is a downtime reporting platform built in MERN stack. Make better decisions using a data driven approach. 

## Table of contents
* [Introduction](#Introduction)
* [Action](#action)
* [Reducer](#reducer)
* [Use in component](#Use-in-component)

## Introduction
How to run this project?

First you will need to create your own **.env** file with following variables:
**NODE_ENV** = production
**PORT** = 5000
**MONGO_URI** = [here you will need to give your MongoDB Atlas url]
**JWT_SECRET** = [Some secret. This can be anything "abcde123" is just fine]

```
cd /frontend
```
```
npm install
```
This will install all dependencies for the React frontend.
```
cd ..
```
```
npm install
```
This will install all dependencies for ExpressJS backend.

[Optional]
If you have heroku setup: 
```
git push heroku master 
```

## Features
This are the already implemented features.

### Dashboard
![This gif shows how Dashboard works](Dashboard.gif)

### Report
![This gif shows how Report works](Report.gif)

### Messenger
![This gif shows how Messenger works](Messenger.gif)

### Create Service [Admin]
![This gif shows how Create Service works](Create_Service.gif)










## Action
Here you just describe WHAT are you storing.



### Actions
Describe what would you like to store
```
export const bugAdded = (description) => ({

   type: actions.BUG_ADDED,
   payload: {
     description,
   },
   
});
```

## Reducer
This is the place where you actually edit store state
```
import * as actions from "../actions/actionTypes";

export default function reducer(state = [], action) {

switch (action.type) {

   case actions.BUG_ADDED:
     return state; // Edited in some way
   case actions.BUG_REMOVED:
     return state; // Edited in some way
   case actions.BUG_RESOLVED:
     return state; // Edited in some way
   default:
     return state; // return clean state just in case
}
```

## Use in component
First import STORE and ACTIONS
```
import * as actions from "../actions/actions";
import store from "../store/store";

// Ask store to edit data
store.dispatch(actions.bugAdded(bugDescription));

// Ask store for current data
store.getState()
```

# Simple React JS Redux example
**Note: functional component + Redux**
