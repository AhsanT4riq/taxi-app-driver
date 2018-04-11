import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker } from 'expo';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import SettingsForm from './form';
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync
} from '../../../actions/driver/settings';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
const image = require('../../../../assets/images/taxi2.jpg');
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    photographUrl: state.driver.user.photographUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null
    };
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let userData = Object.assign(this.props.userDetails, {
        localUrl: result.uri
      });
      this.props.updateUserProfilePicAsync(userData, 'profile');
    } else {
      this.setState({ image: this.props.profileUrl });
    }
  };
  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: '#fff' }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === 'ios'
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Settings
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card
            style={{
              marginTop: 0,
              marginRight: 0,
              paddingTop: 20,
              paddingBottom: 20,
              marginLeft: 0
            }}
          >
            <CardItem style={{ padding: 0 }}>
              <Left>
                <Item
                  // onPress={this._pickImage}
                  style={{ paddingRight: 20, borderBottomWidth: 0 }}
                >
                  {this.props.profileUpdating ? (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#eee'
                      }}
                    >
                      <Spinner />
                    </View>
                  ) : (
                    this.props.photographUrl && (
                      <Thumbnail
                        source={{ uri: this.props.photographUrl }}
                        style={{ width: 70, height: 70, borderRadius: 35 }}
                      />
                    )
                  )}
                </Item>
                <Body>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: '400',
                      color: '#0F517F'
                    }}
                  >
                    {this.props.fname} {this.props.lname}
                  </Text>
                  <Text note style={{ color: '#6895B0' }}>
                    {this.props.email}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <SettingsForm />
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails =>
      dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: (userData, type) =>
      dispatch(updateUserProfilePicAsync(userData, type))
  };
}

export default connect(mapStateToProps, bindActions)(Settings);
