import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, ImageBackground } from 'react-native';
import {
  Text,
  Icon,
  Header,
  Button,
  Title,
  Grid,
  Col,
  Row,
  Left,
  Right,
  Body,
  Container
} from 'native-base';
import PropTypes from 'prop-types';
import { KeepAwake, Audio } from 'expo';
import { Actions, ActionConst } from 'react-native-router-flux';
import _ from 'lodash';
import { changePageStatus } from '../../../actions/driver/home';
import { responseByDriver } from '../../../actions/driver/rideRequest';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const image = require('../../../../assets/images/map-bg.png');
const tripSound = require('../../../../assets/sounds/tripSound.mp3');

function mapStateToProps(state) {
  return {
    tripRequest: state.driver.tripRequest,
    region: {
      latitude: state.driver.tripRequest.srcLoc[0],
      longitude: state.driver.tripRequest.srcLoc[1],
      latitudeDelta: state.driver.tripRequest.latitudeDelta,
      longitudeDelta: state.driver.tripRequest.longitudeDelta
    }
  };
}
class RideRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 10
    };
  }
  static propTypes = {
    responseByDriver: PropTypes.func,
    tripRequest: PropTypes.object
  };
  acceptRide() {
    this.stopTripSound();
    this.props.responseByDriver('accept');
  }
  rejectRide() {
    this.stopTripSound();
    this.props.responseByDriver('reject');
  }
  async playTripSound() {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(tripSound);
      {
        shouldPlay: true;
      }
      this.audioPlayer1 = soundObject;
      this.audioPlayer1.setIsLoopingAsync(true);
      this.audioPlayer1.playAsync();
      this.audioPlayer1.setVolumeAsync(0.8);
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }
  async stopTripSound() {
    try {
      await this.audioPlayer1.stopAsync();
    } catch (error) {}
  }
  componentDidMount() {
    this.playTripSound();
    let interValID = setInterval(() => {
      this.setState({
        sec: this.state.sec - 1
      });
      if (this.state.sec < 0) {
        this.setState({
          sec: 0
        });
      }
    }, 1000);
    this.setState({
      interValID
    });
  }
  componentWillUnmount() {
    this.setState({
      sec: 0
    });
    this.stopTripSound();
    clearInterval(this.state.interValID);
  }
  render() {
    const { boosterSeatNum } = this.props.tripRequest;
    return (
      <Container>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
          iosBarStyle="light-content"
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Title
              style={
                Platform.OS === 'ios'
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Rider Notification
            </Title>
          </View>
        </Header>
        <View style={{ flex: 1 }} pointerEvents="box-none">
          <KeepAwake />
          <ImageBackground source={image} style={styles.mapBg}>
            <View style={styles.detailsContainer}>
              <Text style={styles.time}>{this.state.sec} Seconds</Text>
              <Text style={styles.place}>
                {_.get(this.props.tripRequest, 'pickUpAddress', '')}
              </Text>
              {Number(boosterSeatNum) > 0 && (
                <Text style={styles.place}>
                  {Number(boosterSeatNum) == 1
                    ? '1 Booster Seat Required (age 2-7)'
                    : '2 Booster Seats Required (age 2-7)'}
                </Text>
              )}
              <Grid
                style={{
                  flex: 1,
                  flexDirection: 'row'
                  // margin: 5,
                }}
              >
                <Col>
                  <Button
                    block
                    style={{
                      paddingHorizontal: 15,
                      backgroundColor: '#04C2DA',
                      margin: 15
                    }}
                    onPress={() => this.acceptRide()}
                  >
                    <Text>Accept</Text>
                  </Button>
                </Col>
                <Col>
                  <Button
                    block
                    style={{
                      paddingHorizontal: 15,
                      backgroundColor: 'red',
                      margin: 15
                    }}
                    onPress={() => this.rejectRide()}
                  >
                    <Text>Reject</Text>
                  </Button>
                </Col>
              </Grid>
            </View>
          </ImageBackground>
        </View>
      </Container>
    );
  }
}
function bindActions(dispatch) {
  return {
    responseByDriver: response => dispatch(responseByDriver(response)),
    changePageStatus: newPage => dispatch(changePageStatus(newPage))
  };
}
export default connect(mapStateToProps, bindActions)(RideRequest);
