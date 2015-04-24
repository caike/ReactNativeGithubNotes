var React = require('react-native');
var Profile = require('./Profile');
var Repositories = require('./Repositories');
var api = require('../Utils/api');

var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component {

  goToProfile(){
    console.log("SOON");
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { userInfo: this.props.userInfo }
    });
  }

  goToRepos(){
    api.getRepos(this.props.userInfo.login).then((repos) => {
      console.log("REPOS ", repos);

      this.props.navigator.push({
        title: 'Repositories',
        component: Repositories,
        passProps: {
          userInfo: this.props.userInfo,
          repos: repos
        }
      });
    });
  }

  goToNotes(){
    console.log("SOON");
  }

  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={ {uri: this.props.userInfo.avatar_url} }
          style={styles.image}
        />

        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>Take Notes</Text>
        </TouchableHighlight>

        <Text> I am the Dashboard </Text>
      </View>
    );
  }
}

module.exports = Dashboard;
