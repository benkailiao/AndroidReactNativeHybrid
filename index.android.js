'use strict';

import React from 'react';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class HelloRn extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount() {
    fetch(urlForData())
    .then(d=>d.json())
    .then(d=>{
      this.setState({
        weatherData:d
      })
    })
  }

  render() {
    if (!this.state.weatherData) 
      return(
          <View style={styles.container}>
            <Text style={styles.hello}>loading</Text>
          </View>
        )

    var allData = this.state.weatherData;
    var data = allData[Object.keys(allData)[0]];
    var result = [];
    

    for (var property in data) {
        if (data.hasOwnProperty(property)) {
          // var tmp =  property + "/" + data[property];
          // result += tmp;
          result.push([property,data[property]]);
        }
    }

    const tableHead = ['name', 'value'];
    const tableData = result;
  
    return (
      <View>
        <Table>
          <Row data={tableHead} style={styles.table_head} textStyle={styles.table_text}/>
          <Rows data={tableData} style={styles.table_row} textStyle={styles.table_text}/>
        </Table>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  table_head: { height: 40, backgroundColor: '#f1f8ff' },
  table_text: { marginLeft: 5 },
  table_row: { height: 30 }

});
const urlForData = ()=>{
  //brisbane woeid":1100661
  //2017/8/7/

  var date = new Date();
  date.setDate(date.getDate()-1);
  var yesterday = date.getFullYear()+ '/' +(date.getMonth()+1) + '/' + date.getDate() ;
  var url = "https://www.metaweather.com/api/location/1100661/" + yesterday;
  return url;
}

AppRegistry.registerComponent('HelloRn', () => HelloRn);