import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
export default class SearchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
      searchBarFocused: false
    };
  }

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    // Change the URL to Store's URL
    return fetch('http://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
          inMemmory: responseJson.movies,
        })

      })
      .catch((error) => {
        alert(error)
      });

  }
  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })

  }
  keyboardDidHide = () => {
    this.setState({ searchBarFocused: false })

  }

  serachitem = value => {
    //Change "title" with the corresponding name in API
    const filteredItems = this.state.inMemmory.filter(item => {
      let itemLowerCase = (
        item.title).toLowerCase();
      let searchItemLowerCase = value.toLowerCase();

      return itemLowerCase.indexOf(searchItemLowerCase) > -1
    });
    this.setState({ dataSource: filteredItems });
  };

  renderItem = ({ item }) =>
    (

        //Change "title" with the corresponding name in API
      <View style={{ minHeight: 70, padding: 5 }}>
        <Text>
          {item.title}
        </Text>
      </View>
    )

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 50,
            backgroundColor: '#c45654',
            justifyContent: 'center',
            paddingHorizontal: 5
          }}>
          < Animatable.View animation="slideInRight" duration={500} style={{
            height: 50,
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center'
          }}>

            <Icon
              name={this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'}
              style={{ fontSize: 24 }}
            //onPress = {(value) => serachitem(value)}
            />
            <TextInput placeholder="Search for groceries"
              style={{
                fontSize: 24,
                marginLeft: 15,
                flex: 1

              }}

              onChangeText={value => this.serachitem(value)}

            />

          </ Animatable.View>




          <View>
            <FlatList
              style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white', margin: 20 }}
              data={this.state.dataSource}
              renderItem={this.renderItem}
              //{({ item }) => <Text style={{ padding: 20, fontSize: 20 }}>{item.title} </Text>}
              ListEmptyComponent={() => (
                <Text style={{ color: "red" }}>No Iten Found </Text>
              )}
              keyExtractor={(item, index) => index.toString()}

            />

          </View>
        </View>
      </View>
    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    
  }
});

