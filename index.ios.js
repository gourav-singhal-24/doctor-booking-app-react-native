/**
 * Sample React Native App
 */
 
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';
import SplashScreen from './components/SplashScreen.js';
import DoctorListing from './components/DoctorListing.js';
import GridSpeciality from './components/GridSpeciality.js';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const logger = createLogger();
const store = compose(applyMiddleware(logger, promise, thunk), autoRehydrate())(createStore)(rootReducer);
 

var obj = persistStore(store, {storage: AsyncStorage}, () => {
  console.log('restored');
});



var ROUTES = {
    splashscreen : SplashScreen,
    doctorlisting : DoctorListing,
    gridspeciality : GridSpeciality 
}
class Project extends Component {
  constructor(props){
    super(props);
  
  }
   renderScene(route, navigator) {
     var Component = ROUTES[route.name];
         return <Component route={ route } navigator={ navigator }  {...route.passProps}/>;
    }

  render() {
    return (
         <Provider store={store}>
                    <Navigator
                        style={ styles.container }
                        initialRoute={{name : 'splashscreen'}}
                        renderScene={ this.renderScene }
                        configureScene={(route) => ({
                                        ...Navigator.SceneConfigs.HorizontalSwipeJump,
                                        gestures: false
                                        })}
                     />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } 
});

AppRegistry.registerComponent('Project', () => Project);
