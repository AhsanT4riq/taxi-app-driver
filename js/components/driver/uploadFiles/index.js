import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, Modal } from "react-native";
import { ImagePicker, DocumentPicker } from "expo";
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
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { updateUserProfilePicAsync } from "../../../actions/driver/settings";
import commonColor from "../../../../native-base-theme/variables/commonColor";
class uploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      image: null,
      doc: null
    };
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });

    this.setState({ modalVisible: false });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let userData = Object.assign(this.props.userDetails, {
        localUrl: result.uri
      });
      this.props.updateUserProfilePicAsync(userData, this.props.keys);
    }
  };
  _pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.setState({ doc: result.uri });
      let userData = Object.assign(this.props.userDetails, {
        localUrl: result.uri
      });
      this.props.updateUserProfilePicAsync(userData, this.props.keys);
    }
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          {this.props.profileUpdating ? (
            <Left />
          ) : (
              <Left>
                <Button transparent onPress={() => Actions.pop()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: commonColor.brandPrimary }}
                  />
                </Button>
              </Left>
            )}
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Upload
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#f2f4f6" }}>
          <View style={{ padding: 5, marginTop: 20 }}>
            <Text style={styles.textUp}>Take a photo of your</Text>
            <Text style={styles.textMiddle}>{this.props.Filename}</Text>
            <Text style={styles.textBottom}>
              Please make sure we can easily read all the details.
            </Text>
            <Card style={styles.cardDocument}>
              {this.state.image ? (
                <Thumbnail
                  style={styles.thumbnail}
                  square
                  source={{ uri: this.state.image }}
                />
              ) : (
                  <CardItem>
                    <Icon
                      name="md-images"
                      style={{
                        fontSize: Platform.OS === "ios" ? 200 : 170,
                        width: null,
                        color: "#C5D6E4"
                      }}
                    />
                  </CardItem>
                )}
            </Card>
            {this.props.profileUpdating ? (
              <Item style={styles.tapButton}>
                <Text style={styles.tapText}>Uploading File</Text>
              </Item>
            ) : (
                <Item
                  style={styles.tapButton}
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}
                >
                  <Icon
                    name="ios-camera-outline"
                    style={{ fontSize: 30, width: null, color: "#3B75A2" }}
                  />
                  <Text style={styles.tapText}>TAP TO ADD</Text>
                </Item>
              )}
            {this.props.profileUpdating ? <Spinner /> : null}
          </View>
        </Content>
        <Modal
          animationType={"slide"}
          transparent={true}
          backdropOpacity={0.5}
          tapToClose={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <Item
              style={{
                flexDirection: "row",
                borderBottomWidth: 0,
                marginBottom: 15
              }}
              onPress={this._pickImage}
            >
              <Icon
                name="ios-camera-outline"
                style={{ fontSize: 30, width: null, color: "#3B75A2" }}
              />
              <Text style={{ fontWeight: "400" }}>Take a pic</Text>
            </Item>
            <Text style={styles.orText}>
              {"("}OR{")"}
            </Text>
            <Item
              style={{ flexDirection: "row", borderBottomWidth: 0 }}
              onPress={this._pickDocument}
            >
              <Icon
                name="ios-folder"
                style={{ fontSize: 30, width: null, color: "#3B75A2" }}
              />
              <Text style={{ fontWeight: "400" }}>upload a file</Text>
            </Item>
            <Button
              block
              style={styles.cancelButton}
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Text style={{ fontWeight: "400" }}>Cancel</Text>
            </Button>
          </View>
        </Modal>
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
function bindActions(dispatch) {
  return {
    updateUserProfilePicAsync: (document, type) =>
      dispatch(updateUserProfilePicAsync(document, type))
  };
}

export default connect(mapStateToProps, bindActions)(uploadFiles);
