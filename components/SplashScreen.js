import React, { Component } from 'react';

import { 
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

class SplashScreen extends Component{
      
    componentWillMount()
    {
        setTimeout( () => {
             this.props.navigator.push({ name : 'gridspeciality'})
            }, 3000 
        );  
    }
    
    render()
    {
        return(
          <View style={ styles.container }>
                <Image source={ require('../HealthApp_splash.jpg') } style={ styles.splash }></Image>
          </View>  
        );
    }
}

var styles = StyleSheet.create({
    container : {
        flex : 1
    },
    splash : {
        width : width,
        height : height
    }
});

/** export this component */
export default SplashScreen;