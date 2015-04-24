var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('../Helpers/Separator');

var {
  View,
  StyleSheet,
  ScrollView,
  Text
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class Profile extends React.Component {
  getRowTitle(item){
    item = (item === 'public_repos' ? 'Public Repos' : item);
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  render(){
    var userInfo = this.props.userInfo;
    var topics = ['company', 'location', 'following', 'email', 'bio', 'public_repos'];
    var list = topics.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index} />
      }else{
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Separator />
          </View>
        );
      }
    });

    return (
      <ScrollView>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }
}

module.exports = Profile;
