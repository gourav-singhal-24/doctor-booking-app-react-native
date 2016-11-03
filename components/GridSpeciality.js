'use strict';
import React, { Component ,PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSpecialities } from '../actions/gridSpeciality.js';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ListView,
    ActivityIndicatorIOS,
    TouchableHighlight
} from 'react-native';
var windowSize = Dimensions.get('window');

class ResultsScreen extends Component {
   constructor(props){
     super(props);
     this._pressRow = this._pressRow.bind(this);
     this.renderBook = this.renderBook.bind(this);
     this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
     this.renderResults = this.renderResults.bind(this);
     
   } 

    componentDidMount() {
       this.props.fetchSpecialities();
  }
    _pressRow(termId,termName) {
    this.props.navigator.push({
      title: termName,
      name: 'doctorlisting',
      passProps: {'category': termId},
    });
  }
  componentWillReceiveProps (nextProps) {
 
    console.log(nextProps);
}
   
    renderLoadingMessage(){
    return (
      <View style={styles.containerCenter}>
          <View style={styles.loaderView}>
            <ActivityIndicatorIOS
              animating={!this.props.isFetching}
              style={[styles.centering, {height: 80}]}
              size="large"
              />
        </View>
        </View>
    );
  }
   
   
  renderResults() {
    return (
      <ListView
        dataSource={ this.props.dataSource }
        renderRow={this.renderBook.bind(this)}
        contentContainerStyle={styles.listView}
        />
    );
  } 
renderBook(book, sectionID: number, rowID: number) {
  if(rowID == 0 || rowID%2 == 0){
    return (
          <TouchableHighlight style={[styles.row,styles.borderLeft]} onPress={() => this._pressRow(this, book['Term ID'],book.name)}>
          <View>
            <Image style={styles.imgOpt} source={{uri: book['Speciality Picture']}}>
            <View style={styles.overlayOpt}>
              <Text style={styles.textOpt}>{book.name}</Text>
              </View>
            </Image>
          </View>
      </TouchableHighlight>
    );
  }else{
      return (
      <TouchableHighlight style={[styles.row,styles.borderRight]} onPress={ this._pressRow.bind(this, book['Term ID'],book.name)}>
          <View>
            <Image style={styles.imgOpt} source={{uri: book['Speciality Picture']}}>
              <View style={styles.overlayOpt}>
              <Text style={styles.textOpt}>{book.name}</Text>
              </View>
            </Image>
          </View>
      </TouchableHighlight>
    );
    }
  }
   render() {
    if (this.props.isFetching) {
        return this.renderLoadingMessage();
    } 
     else {
         return this.renderResults(); 
      }
    }
}
 
 
ResultsScreen.propTypes = {
  dataSource: PropTypes.object,
};
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

function mapDispatchToProps(dispatch){
   return{
    fetchSpecialities : bindActionCreators(fetchSpecialities,dispatch)
  };
}

function mapStateToProps(state, ownProps){
  return { 
    dataSource: dataSource.cloneWithRows(state.speciality.data),
    isFetching: state.speciality.isFetching
  };
}

  var styles = StyleSheet.create({
    row: {
      width: windowSize.width/2 ,
      justifyContent: 'center',
      alignItems: 'center',
      position:'relative',
      marginBottom: 1
      },
    containerCenter: {
         flexDirection: 'row',
         flex: 1,
         justifyContent: 'center'
        },
        loaderView: {
          alignSelf: 'center',
        },

    borderRight:{
      borderLeftWidth: 1,
      borderLeftColor: '#fff'
    },
    borderLeft:{
      borderRightWidth: 1,
      borderRightColor: '#fff'
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
          },
    root: {
      alignItems: "center",
      backgroundColor: '#05A5D1',
     },
    text: {
      color: '#fff'
    },
    mainContainer: {
      flex:1
    },
    header: {
      backgroundColor: '#06588a',
      paddingTop: 25
    },
    textHeader: {
      color: '#fff',
      alignSelf: 'center',
      fontSize: 18
    },
    navWrap: {
      flexDirection: 'row',
      marginTop: 25
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      paddingBottom:12,
    },
    iconNav: {
      alignSelf: 'center',
      width: 40,
      height: 40,
      marginBottom: 10
    },
    textNav: {
      color: '#FFF',
      fontSize: 14
    },
    wrapOptions: {
      flexWrap: 'nowrap'
    },
    blockOptions: {
      position: 'relative',
      paddingTop: 2,
      width: windowSize.width/2,
    },
    leftOptions: {
      paddingRight: 1
    },
    rightOptions: {
      paddingLeft: 1
    },
    imgOpt: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: windowSize.width/2,
      height: windowSize.width/2,
    },
    textOpt: {
      color: '#FFF',
      position: 'relative',
    },
    overlayOpt: {
      flex: 1,
        alignItems: 'center',
      justifyContent: 'center',
      width: windowSize.width/2,
      height: windowSize.width/2,
   backgroundColor: 'rgba(0,0,0,.3)'
    }
  });
export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen); 
