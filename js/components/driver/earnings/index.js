import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Platform, Dimensions } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
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
import { fetchTripHistoryAsync } from '../../../actions/driver/history';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
const { width, height } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    trips: state.driver.history.trips,
    loadSpinner: state.driver.history.loadSpinner
  };
}

class Earnings extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    trips: PropTypes.array,
    fetchTripHistoryAsync: PropTypes.func,
    loadSpinner: PropTypes.bool
  };

  async componentDidMount() {
    await this.props.fetchTripHistoryAsync(this.props.jwtAccessToken);
  }

  timeDiff(time) {
    return moment().diff(time, 'days');
  }

  todayRevenue() {
    var total = 0;
    this.props.trips.map(function(trip) {
      if (moment().diff(trip.bookingTime, 'days') === 0) {
        total = total + trip.tripAmt;
      }
    });
    return total;
  }

  weekRevenue() {
    var total = 0;
    _.map(this.props.trips, trip => {
      if (moment().diff(trip.bookingTime, 'weeks') === 0) {
        total = total + trip.tripAmt;
      }
    });
    return total;
  }

  monthRevenue() {
    var total = 0;
    _.map(this.props.trips, trip => {
      if (moment().diff(trip.bookingTime, 'months') === 0) {
        total = total + trip.tripAmt;
      }
    });
    return total;
  }

  yearRevenue() {
    var total = 0;
    _.map(this.props.trips, trip => {
      if (moment().diff(trip.bookingTime, 'years') === 0) {
        total = total + trip.tripAmt;
      }
    });
    return total;
  }

  totalRevenue() {
    var total = 0;
    _.map(this.props.trips, trip => {
      total = total + trip.tripAmt;
    });
    return total;
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: commonColor.brandPrimary }}
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
              Earnings
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: '#f2f4f6' }}>
          <View style={{ backgroundColor: '#fff' }}>
            <View style={styles.Cardwrapper}>
              <Text style={{ fontWeight: 'bold' }}>Total Earnings</Text>
              <Text style={{ fontSize: 80, fontWeight: '100' }}>
                ${this.totalRevenue()}
              </Text>
            </View>
            <View>
              <Card style={styles.cardEarnings}>
                <CardItem style={styles.CardItemEarnings}>
                  <Text style={styles.textDay}>Today</Text>
                  <Text style={styles.textEarnings}>
                    ${this.todayRevenue()}
                  </Text>
                </CardItem>
                <CardItem
                  style={{
                    ...styles.CardItemEarnings,
                    borderLeftWidth: 0.5,
                    borderLeftColor: '#ddd'
                  }}
                >
                  <Text style={styles.textDay}>Week</Text>
                  <Text style={styles.textEarnings}>${this.weekRevenue()}</Text>
                </CardItem>
                <CardItem
                  style={{
                    ...styles.CardItemEarnings,
                    borderLeftWidth: 0.5,
                    borderLeftColor: '#ddd'
                  }}
                >
                  <Text style={styles.textDay}>Month</Text>
                  <Text style={styles.textEarnings}>
                    ${this.monthRevenue()}
                  </Text>
                </CardItem>

                <CardItem
                  style={{
                    ...styles.CardItemEarnings,
                    borderLeftWidth: 0.5,
                    borderLeftColor: '#ddd'
                  }}
                >
                  <Text style={styles.textDay}>Year</Text>
                  <Text style={styles.textEarnings}>${this.yearRevenue()}</Text>
                </CardItem>
              </Card>
            </View>
          </View>
          <View style={{ marginHorizontal: 5, marginTop: 20 }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#aaa',
                fontSize: 20,
                marginBottom: 10
              }}
            >
              TODAY
            </Text>
            {_.map(
              this.props.trips,
              (trip, index) =>
                this.timeDiff(trip.bookingTime) === 0 ? (
                  <Card key={index} style={styles.historyCard}>
                    <CardItem
                      style={{
                        ...styles.historyCardItem,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                        paddingLeft: 10,
                        paddingTop: 20,
                        paddingBottom: 20,
                        flex: 0.8,
                        backgroundColor: '#4783AF'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                        Received
                      </Text>
                      <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                        ${trip.tripAmt}
                      </Text>
                    </CardItem>
                    <CardItem style={{ ...styles.historyCardItem, flex: 1 }}>
                      <Text style={{ fontWeight: '600' }}>Received Via</Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {trip.paymentMode}
                      </Text>
                    </CardItem>
                    <CardItem style={styles.historyCardItem}>
                      <Text style={{ fontWeight: '600' }}>Distance</Text>
                      <Text style={{ fontWeight: 'bold' }}>23 KM</Text>
                    </CardItem>
                    <CardItem
                      style={{
                        ...styles.historyCardItem,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        flex: 0.6
                      }}
                    >
                      <Text style={{ fontWeight: '600' }}>Time</Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {moment(trip.bookingTime).format('h:mm a')}{' '}
                      </Text>
                    </CardItem>
                  </Card>
                ) : null
            )}

            <Text
              style={{
                fontWeight: 'bold',
                color: '#aaa',
                fontSize: 20,
                marginBottom: 10
              }}
            >
              YESTERDAY
            </Text>
            {_.map(
              this.props.trips,
              (trip, index) =>
                this.timeDiff(trip.bookingTime) === 1 ? (
                  <Card key={index} style={styles.historyCard}>
                    <CardItem
                      style={{
                        ...styles.historyCardItem,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                        paddingLeft: 10,
                        paddingTop: 20,
                        paddingBottom: 20,
                        flex: 0.8,
                        backgroundColor: '#4783AF'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                        Received
                      </Text>
                      <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                        ${trip.tripAmt}
                      </Text>
                    </CardItem>
                    <CardItem style={{ ...styles.historyCardItem, flex: 1 }}>
                      <Text style={{ fontWeight: '600' }}>Received Via</Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {trip.paymentMode}
                      </Text>
                    </CardItem>
                    <CardItem style={styles.historyCardItem}>
                      <Text style={{ fontWeight: '600' }}>Distance</Text>
                      <Text style={{ fontWeight: 'bold' }}>23 KM</Text>
                    </CardItem>
                    <CardItem
                      style={{
                        ...styles.historyCardItem,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        flex: 0.6
                      }}
                    >
                      <Text style={{ fontWeight: '600' }}>Time</Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {moment(trip.bookingTime).format('h:mm a')}{' '}
                      </Text>
                    </CardItem>
                  </Card>
                ) : null
            )}
          </View>
          <View>
            <Text
              style={{
                color: '#ff1495',
                fontStyle: 'italic',
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: 20
              }}
            >
              "We care about the safety{'\n'}
              {'       '}of you as a driver."{' '}
              <Icon
                name="md-heart"
                style={{
                  color: '#ff1495',
                  marginLeft: 30,
                  fontWeight: '600',
                  marginTop: 2,
                  fontSize: 25,
                  opacity: 0.8,
                  width: 25
                }}
              />
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

// export default Earnings;

function bindActions(dispatch) {
  return {
    fetchTripHistoryAsync: jwtAccessToken =>
      dispatch(fetchTripHistoryAsync(jwtAccessToken))
  };
}

export default connect(mapStateToProps, bindActions)(Earnings);
