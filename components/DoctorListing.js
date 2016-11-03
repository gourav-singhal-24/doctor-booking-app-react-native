'use strict';
import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  ActivityIndicatorIOS,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import React, { Component, PropTypes } from 'react';
import RefreshableListView from 'react-native-refreshable-listview';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchDoctorList } from  '../actions/doctorsList.js';
var arrayData = new Array();
var  page = 0;
export default class DoctorListing extends Component{
  constructor(props){
    super(props);
    this.state = {
      reload:false,
      refreshing: false,
      arrayData: new Array,
      loaded: 0
    };
  }
  
  componentDidMount(){
      this.props.fetchResults(this.props.category);
  }
  pressRow(uid,name){
    return(
      <Text>
        name
      </Text>
    );
 
  }
  
//    refreshList(){
//       console.log('refresh');
//         this.setState({refreshing: true});
//       page = page+1;
//       this.setState({
//           reload: true,
//         });
//       FetchServices.getDoctors(this.props.category,null,page)
//       .then(response => response.json())
//       .then(jsonData => {
//           console.log(jsonData);
//           arrayData =  arrayData.concat(jsonData);
//           console.log(arrayData);
//       //   this.list.hideHeader();
//         this.setState({
//           reload: false,
//           refreshing: false,
//           dataSource: this.state.dataSource.cloneWithRows(arrayData)
//         });
//       })
//       .catch(error => console.log(error));
//     }
  
   renderLoadingMessage() {
      return (
        <View style={styles.containerCenter}>
          <View style={styles.loaderView}>
          <ActivityIndicatorIOS
              animating={this.state.isLoading}
              style={[styles.centering, {height: 80}]}
              size="large"
              />
        </View>
        </View>
      );
     }
  
      footerIndicator(){
      return (
           <ActivityIndicatorIOS
              animating={this.state.reload}
              style={styles.centering}
              size="small"
              />
      );
    }
  
//     _onRefresh() {
//       this.setState({isRefreshing: true}); setTimeout(() => {
//   const rowData = Array.from(new Array(10))
//    .map((val, i) => ({
//       text: 'Loaded row ' + (+this.state.loaded + i),
//       clicks: 0, }))
//        .concat(this.state.rowData);
//        this.setState({ loaded: this.state.loaded + 10,
//          isRefreshing: false,
//          rowData: rowData, });
//        },
//          5000); 
//     }
    renderResults() {
      return (
          <ListView
             dataSource={this.props.dataSource}
             renderRow={this.renderBook.bind(this)}
             style={styles.listView}
             renderFooter={this.footerIndicator.bind(this)}
           >
           </ListView>
         );
    }
  
      renderBook(doctor) {
           return (
            <TouchableOpacity onPress={() => this.pressRow(doctor.Uid,doctor.name)}>
              <View style={styles.bodyBg}>
                <View style={styles.docList}>
                  <View style={styles.docPic}>
                    <Image style={styles.docPicmain} source={{uri: doctor['Profile Image']}}></Image>
                  </View>
                  <View style={styles.descpWrap}>
                    <View style={styles.descp}>
                      <Text style={styles.drName}>{doctor.name}</Text>
                      <Text style={styles.workPlace}>Max Hospital, {doctor.Branch}</Text>
                      <Text style={styles.textDescp}>Experience - {doctor['year of experience']}</Text>
                      <Text style={styles.textDescp}>Consultation Fee - {doctor['Consultation fee'].value}</Text>
                      <Text style={styles.textDescpLight}>{doctor.Qualification}</Text>
                    </View>
                    <View style={styles.btnAction}>
                      <TouchableOpacity style={styles.iconSchdul} onPress={() => this.pressRowSecond(doctor)}>
                        <Image style={styles.iconSchdul} source={{uri: 'http://screenshot.net/29mho29.jpg'}}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
   render() {
          if (this.props.isLoading) {
              return this.renderLoadingMessage();
          } else {
              return this.renderResults(); }
          }
}

DoctorListing.propTypes = {
  dataSource: PropTypes.object,
};
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

function mapStateToProps(state){
  return {
    dataSource: dataSource.cloneWithRows(state.doctorsList.data),
    isLoading: state.doctorsList.isLoading
  };
}
function mapDispatchToProps(dispatch){
  return {
    fetchResults : bindActionCreators(fetchDoctorList, dispatch)
  };
}
        
 var styles = StyleSheet.create({
          root: {
            alignItems: 'center',
            backgroundColor: '#05A5D1',
            padding: 20
          },
          containerCenter: {
               flexDirection: 'row',
               flex: 1,
               justifyContent: 'center'
              },
              loaderView: {
                alignSelf: 'center',
              },

          text: {
            color: '#fff'
          },
          bodyBg: {
            backgroundColor: '#eef1ed',
            flex: 1
          },
          docList: {
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 15,
            paddingTop: 15,
          },
          docPic: {
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: 'hidden',
            marginRight:15,
          },
          docPicmain: {
            width:100,
            height:100
          },
          descpWrap: {
            flex: 1,
            flexDirection: 'row',
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor : '#777876',
          },
          descp: {
            flex: 1
          },
          drName: {
            color: '#06588a',
            fontSize: 18,
            marginBottom: 5
          },
          workPlace: {
            fontSize: 16,
            color: '#515251',
            marginBottom: 5
          },
          textDescp: {
            color: '#6b6d6b',
            marginBottom: 5,
            fontSize: 14
          },
          textDescpLight: {
            color: '#838583',
            fontSize: 14
          },
          btnAction: {
            paddingRight: 15,
            alignSelf: 'center'
          },
          iconSchdul: {
            width: 40,
            height: 40
          },
        });
 
export default connect(mapStateToProps,mapDispatchToProps)(DoctorListing);