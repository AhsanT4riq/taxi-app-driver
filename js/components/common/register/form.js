import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, Picker as NativePicker } from 'react-native';
import {
  Item,
  Input,
  Button,
  Grid,
  Col,
  View,
  ListItem,
  CheckBox,
  Body,
  Form,
  Picker,
  Icon
} from 'native-base';
const PickerItem = Picker.Item;
import CountryPicker from 'react-native-country-picker-modal';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { registerAsync } from '../../../actions/common/register';
import Spinner from '../../loaders/Spinner';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import styles from './styles';

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = 'First name is Required';
  } else if (!/^[a-zA-Z]*$/.test(values.fname)) {
    errors.fname = 'Invalid first name';
  } else if (!values.lname) {
    errors.lname = 'Last name is Required';
  } else if (!/^[a-zA-Z]*$/.test(values.lname)) {
    errors.lname = 'Invalid last name';
  } else if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  } else if (!values.phoneNo) {
    errors.phoneNo = 'Phone number is Required';
  } else if (!values.phoneNo.match(/^\d{10}$/)) {
    errors.phoneNo = 'Invalid phone number';
  } else if (!values.password) {
    errors.password = 'Password is Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Entered passwords doesn't match";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View style={{ flex: 1, width: null }}>
      <Item
        style={{
          borderBottomWidth: input.name === 'phoneNo' ? 0 : 0.5
        }}
      >
        <Input {...input} {...props} />
      </Item>

      {meta.touched &&
        meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: 'AU',
      callingCode: '61',
      name: 'AU',
      female: false,
      tc: false,
      boosterSeat: false,
      boosterSeatNum: '0',
      selectedState: '0'
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    isFetching: PropTypes.bool
  };
  submit(values) {
    const { boosterSeat, boosterSeatNum, selectedState } = this.state;
    const updatedValues = Object.assign({}, values, {
      boosterSeat,
      boosterSeatNum,
      selectedState
    });
    this.props.dispatch(
      registerAsync({ ...updatedValues, callingCode: this.state.callingCode })
    );
  }
  setBoosterSeat = val => {
    const { boosterSeatNum } = this.state;
    this.setState({
      boosterSeatNum: val
    });
  };
  render() {
    const {
      female,
      tc,
      boosterSeat,
      boosterSeatNum,
      selectedState
    } = this.state;
    return (
      <View>
        <Grid>
          <Col style={{ padding: 10 }}>
            <Field
              component={input}
              name="fname"
              placeholder="First Name"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </Col>
          <Col style={{ padding: 10 }}>
            <Field
              component={input}
              name="lname"
              placeholder="Last Name"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </Col>
        </Grid>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            type="email"
            name="email"
            placeholder="Email"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderBottomWidth: 0.5,
            marginLeft: 15
          }}
        >
          <CountryPicker
            cca2={this.state.cca2}
            onChange={value =>
              this.setState({
                cca2: value.cca2,
                callingCode: value.callingCode
              })
            }
          />
          <Field
            component={input}
            name="phoneNo"
            placeholder="Mobile Number"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            keyboardType="numeric"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="street"
            placeholder="Street"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="suburb"
            placeholder="Suburb"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            display: 'flex',
            borderBottomWidth: 0.5,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <Picker
            mode="dropdown"
            placeholder="Select Number of Booster Seats"
            selectedValue={selectedState}
            onValueChange={selectedState => {
              this.setState({ selectedState });
            }}
            textStyle={{
              color: commonColor.lightThemePlaceholder,
              fontSize: 17
            }}
          >
            <PickerItem label="Select State" value="0" />
            <PickerItem label="NSW" value="1" />
            <PickerItem label="QLD" value="2" />
            <PickerItem label="SA" value="3" />
            <PickerItem label="TAS" value="4" />
            <PickerItem label="VIC" value="5" />
            <PickerItem label="WA" value="6" />
            <PickerItem label="ACT" value="7" />
            <PickerItem label="NT" value="8" />
          </Picker>
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="zipCode"
            placeholder="Zip Code"
            secureTextEntry
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="password"
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="confirmPassword"
            placeholder="Confirm password"
            secureTextEntry
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        {this.props.error && (
          <Text style={{ color: 'red' }}>{this.props.error}</Text>
        )}
        <ListItem>
          <CheckBox
            checked={boosterSeat}
            color={commonColor.brandPrimary}
            onPress={() => {
              this.setState({ boosterSeat: !boosterSeat, boosterSeatNum: '0' });
            }}
          />
          <Body>
            <Text> Booster Seat (age 2-7)</Text>
          </Body>
        </ListItem>
        {boosterSeat && (
          <Form>
            <Picker
              mode="dropdown"
              placeholder="Select Number of Booster Seats"
              selectedValue={boosterSeatNum}
              onValueChange={boosterSeatNum => {
                this.setState({ boosterSeatNum });
              }}
            >
              <PickerItem label="1 Booster Seat" value="1" />
              <PickerItem label="2 Booster Seats" value="2" />
            </Picker>
          </Form>
        )}
        <ListItem>
          <CheckBox
            checked={female}
            color={commonColor.brandPrimary}
            onPress={() => {
              this.setState({ female: !female });
            }}
          />
          <Body>
            <Text> I am a Female</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox
            checked={tc}
            color={commonColor.brandPrimary}
            onPress={() => {
              this.setState({ tc: !tc });
            }}
          />
          <Body>
            <Text>
              {' '}
              I have read and agrees to{'\n'} SheSafe Driver{' '}
              <Text
                style={{ color: commonColor.brandPrimary }}
                onPress={() => {
                  console.log('pressed');
                  Communications.web(
                    'http://shesafe.com.au/terms-conditions-driver/'
                  );
                }}
              >
                Terms and Conditions
              </Text>
            </Text>
          </Body>
        </ListItem>
        <View style={styles.regBtnContain}>
          <Button
            onPress={this.props.handleSubmit(this.submit.bind(this))}
            block
            style={!female || !tc ? styles.regBtnDisable : styles.regBtn}
            disabled={!female || !tc}
          >
            {this.props.isFetching ? (
              <Spinner />
            ) : (
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Register
              </Text>
            )}
          </Button>
          <Text
            style={{
              color: '#ed2891',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 20
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              color: '#ed2891',
              fontStyle: 'italic',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 20
            }}
          >
            "We care about the safety
          </Text>
          <Text
            style={{
              color: '#ed2891',
              fontStyle: 'italic',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 20
            }}
          >
            of you as a driver."{' '}
            <Icon
              name="md-heart"
              style={{
                color: '#ed2891',
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
      </View>
    );
  }
}
export default reduxForm({
  form: 'register', // a unique name for this form
  validate
})(RegisterForm);
