var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userName: '',
      isLoading: false,
      error: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ userName: e.nativeEvent.text });
  }

  handleSubmit(e){
    // update indicatorIOS spinner
    this.setState({
      isLoading: true
    });

    console.log('SUBMIT', this.state.userName);

    api.getBio(this.state.userName).
      then((bio) => {

        if(bio.message === 'Not Found'){

          console.log('OMG NOT FOUND');
          this.setState({
            error: "User not found",
            isLoading: false
          });

        }else{

          console.log('OMG FOUND!');
          this.props.navigator.push({
            title: bio.name || 'Select an Option',
            component: Dashboard,
            passProps: { userInfo: bio }
          });
          this.setState({
            isLoading: false,
            error: false,
            userName: ''
          });

        }
    });
  }

  render(){

    var showError = ( this.state.error ? <Text>Error!</Text> : <View></View> );;

    return (
      <View style={styles.mainContainer}>
      <Text style={styles.title}>Search for a GitHub user</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="white" >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large"
        />
        {showError}
      </View>
    );
  }
}

module.exports = Main;

