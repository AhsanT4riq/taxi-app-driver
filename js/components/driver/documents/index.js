import React, { Component } from 'react';
import { View, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Title,
  Left,
  Right,
  Body
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

class Documents extends Component {
  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }
  documentTypes = [
    {
      name: "Driver's Photograph (headshot with white background)",
      key: 'photograph'
    },
    {
      name: 'Drivers License-Front',
      key: 'licence'
    },
    {
      name: 'Drivers License-Back',
      key: 'license-back'
    },
    {
      name: 'Driver Accreditation Document',
      key: 'permit'
    },
    {
      name: 'Car Insurance Certificate',
      key: 'insurance'
    },
    {
      name: 'Certificate of Car Registration',
      key: 'registration'
    },
    {
      name:
        'SheSafe National Child Safety Policy (only upload page 7 signed and dated)',
      key: 'child-safety'
    },
    {
      name: 'Car Photo (license plate clearly visible)',
      key: 'car-photo'
    },
    {
      name: 'Passenger Transport License Code (NSW)',
      key: 'passenger-license-code'
    },
    {
      name: 'Booked Hire Service License (QLD only)',
      key: 'hire-service'
    },
    {
      name: 'Working with Children Check (QLD exempt)',
      key: 'work-with-child'
    },
    {
      name: 'Hire Car License (VIC & ACT)',
      key: 'passenger-license'
    },
    {
      name: 'Omnibus Charter Vehicle License (Perth only)',
      key: 'charter-license'
    },
    {
      name: 'Misc Area 3',
      key: 'misc3'
    }
  ];
  renderArrow() {
    return (
      <Icon
        name="ios-arrow-forward"
        style={{
          ...styles.textColor,
          color: '#aaa',
          fontWeight: 'bold',
          fontSize: 22
        }}
      />
    );
  }
  renderCheck() {
    return (
      <Icon
        name="checkmark"
        style={{
          ...styles.textColor,
          color: commonColor.brandPrimary,
          fontWeight: 'bold',
          fontSize: 22
        }}
      />
    );
  }

  renderIcon(key) {
    if (key === 'licence') {
      return this.props.userDetails.licenceUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'photograph') {
      return this.props.userDetails.photographUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'insurance') {
      return this.props.userDetails.insuranceUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'permit') {
      return this.props.userDetails.vechilePaperUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'registration') {
      return this.props.userDetails.rcBookUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'license-back') {
      return this.props.userDetails.licenseBackUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'child-safety') {
      return this.props.userDetails.childSafetyUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'hire-service') {
      return this.props.userDetails.hireServiceUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'work-with-child') {
      return this.props.userDetails.workWithChildUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'passenger-license') {
      return this.props.userDetails.passengerLicenseUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'charter-license') {
      return this.props.userDetails.charterLicenseUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'car-photo') {
      return this.props.userDetails.carPhotoUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === 'passenger-license-code') {
      return this.props.userDetails.passengerLicenseCodeUrl
        ? this.renderCheck()
        : this.renderArrow();
    }
  }
  renderRow = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.navigate(item.key, item.name)}
      >
        <View style={styles.listContainer}>
          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
          </View>

          <View style={styles.rightText}>{this.renderIcon(item.key)}</View>
        </View>
      </ListItem>
    );
  };
  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          iosBarStyle="dark-content"
          style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
        >
          <Left />
          <Body>
            <Title
              style={
                Platform.OS === 'ios'
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Documents
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: '#f2f4f6' }}>
          <Text style={styles.headerTitle}>Please upload your documents </Text>
          <FlatList
            data={this.documentTypes}
            renderItem={this.renderRow}
            style={{ borderTopWidth: 2, borderTopColor: '#ddd' }}
          />
        </Content>
        <Button
          full
          disabled={
            !(
              this.props.userDetails.photographUrl &&
              this.props.userDetails.licenceUrl &&
              this.props.userDetails.licenseBackUrl &&
              this.props.userDetails.insuranceUrl &&
              this.props.userDetails.vechilePaperUrl &&
              this.props.userDetails.rcBookUrl &&
              this.props.userDetails.childSafetyUrl &&
              this.props.userDetails.carPhotoUrl
            )
          }
          style={styles.buttonContinue}
          onPress={() => Actions.licenceDetails()}
        >
          <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
            Continue
          </Text>
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}

export default connect(mapStateToProps, null)(Documents);
