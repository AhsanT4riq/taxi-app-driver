import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
export default {
  links: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  alinks: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  iosAboutlink: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderTopColor: '#232232',
    borderBottomColor: 'transparent'
  },
  aAboutlink: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: 'transparent'
  },
  linkText: {
    paddingLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  ThumbnailText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6
  },
  Thumbnaillinks: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  Thumbnailalinks: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  logoutContainer: {
    padding: 30
  },
  logoutbtn: {
    paddingTop: 30,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#797979'
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  drawerContent: {
    paddingTop: 30,
    backgroundColor: '#0A3A55'
  },
  Bg: {
    backgroundColor: commonColor.brandPrimary,
    height: deviceHeight - (deviceHeight / 3 - 30)
  },
  adrawerContent: {
    paddingTop: 20,
    backgroundColor: '#0A3A55'
  },
  aProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginLeft: 15,
    fontSize: 25
  },
  iosProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 5,
    fontSize: 25
  },
  aSidebarIcons: {
    marginLeft: 30,
    fontWeight: '600',
    color: '#fff',
    fontSize: 25,
    opacity: 0.8,
    width: 25
  },
  iosSidebarIcons: {
    color: '#fff',
    marginLeft: 30,
    fontWeight: '600',
    marginTop: 2,
    fontSize: 25,
    opacity: 0.8,
    width: 25
  },
  aSidebarThumbnail: {
    color: 'red',
    marginLeft: 27,
    fontWeight: '600',
    fontSize: 16,
    width: 40
  },
  iosSidebarThumbnail: {
    color: 'red',
    marginLeft: 27,
    fontWeight: 'Bold',
    marginTop: 2,
    fontSize: 16,
    width: 40
  },
  profile: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingTop: 10,
    paddingBottom: 10
  },
  slogan: {
    color: '#000',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  Sloganlinks: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    borderBottomWidth: 0,
    borderBottomColor: '#ec1f92',
    fontWeight: '800'
  }
};
