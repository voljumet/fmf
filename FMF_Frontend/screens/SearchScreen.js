import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  Image


} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
class SearchScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
      searchBarFocused: false,
      qty: 0,
      ItemsAddedToCart:true
    };
  }


  componentDidMount = async () => {
    this.keyboardDidShow = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardDidHide = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    // Change the URL to Store's URL
    return fetch("https://bhunter.online/api/PostAPI/GetPostModels")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          inMemmory: responseJson,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };


  
  buttonISable=()=>{
    this.setState({ItemsAddedToCart: true})
  }
  buttonISdisable=()=>{
    this.setState({ItemsAddedToCart: false})
  }



  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true });
  };
  keyboardDidHide = () => {
    this.setState({ searchBarFocused: false });
  };

  serachitem = (value) => {
    //Change "title" with the corresponding name in API
    const filteredItems = this.state.inMemmory.filter((item) => {
      let itemLowerCase = item.productModel.productName.toLowerCase();
      let searchItemLowerCase = value.toLowerCase();

      return itemLowerCase.indexOf(searchItemLowerCase) > -1;
    });
    this.setState({ dataSource: filteredItems });
  };

  handlePress = (item) => {
    this.props.addItemToCart(item)

  };
  //items will be displayed
  renderItem = ({ item }) => (
    //Change "title" with the corresponding name in API
    <View style={{ backgroundColor: 'white', padding: 5, margin: 10, borderWidth: 2, borderColor: '#61dafb' }}>
      <View>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>{item.supplier}</Text>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{item.productModel.productName}</Text>
        <Text style={{ color: '#050', fontWeight: 'bold', fontSize: 20 }}>kr {item.price},-</Text>
        <Image
          source={{
            url: item.productModel.picture,
          }}
          style={{ width: 90, height: 90 }} />

        <TouchableOpacity style={styles.button}  onPress={(val) => this.handlePress(item)}>
          <Text style={styles.text} >Add to your cart</Text>
        </TouchableOpacity>

      </View>



    </View>
  );

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 50,
            backgroundColor: "#vf45",
            justifyContent: "center",
            paddingHorizontal: 5,
          }}
        >
          <Animatable.View
            animation="slideInRight"
            duration={500}
            style={{
              height: 50,
              backgroundColor: "white",
              flexDirection: "row",
              padding: 5,
              alignItems: "center",
            }}
          >
            <Icon
              name={
                this.state.searchBarFocused
                  ? "md-arrow-back"
                  : "ios-search"
              }
              style={{ fontSize: 24 }}
            //onPress = {(value) => serachitem(value)}
            />
            <TextInput
              placeholder="Search for groceries"
              style={{
                fontSize: 24,
                marginLeft: 15,
                flex: 1,
              }}
              onChangeText={(value) => this.serachitem(value)}
            />
          </Animatable.View>

          <View>
            <FlatList
              style={{
                backgroundColor: this.state.searchBarFocused
                  ? "rgba(0,0,0,0.3)"
                  : "white",
                margin: 20,
              }}
              data={this.state.dataSource}
              renderItem={this.renderItem}
              //{({ item }) => <Text style={{ padding: 20, fontSize: 20 }}>{item.title} </Text>}
              ListEmptyComponent={() => (
                <Text style={{ color: "red" }}>
                  No Item Found{" "}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payLoad: product }),
  }

}
const mapStateToProps = (state) => {
  return {
    cartItems: state
  }
}
export default connect(null, mapDispatchToProps)(SearchScreen)

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

  },
  buttoms: {
    paddingLeft: 30, paddingTop: 10, marginRight: 10
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {

  }, text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    width: 250,
    height: 50,
   backgroundColor: "#61dafb",
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15
  }
});

