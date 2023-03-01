import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';

import Slider from '@react-native-community/slider';
import Video from 'react-native-video'; /// alreadyimported this
import Icon from 'react-native-vector-icons/FontAwesome5'; // and this
import Orientation from 'react-native-orientation';
import { bg2, logo } from '../../assets'
import {stylescss} from '../../Styless'
import { color } from 'react-native-reanimated';
import {apiserver, starturl, token,userid} from '../../Valiable'
const { width } = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
//const samplevideo = require('./sample.mp4');

const url = 'https://api.mktv.id/video-api-film/film/v1/stream/0884c59f-48a2-47d1-a103-5ddd07aae72a'

function handleErrors(response) {
  if (!response.ok && response.status == 401) {
      return response.json();
  } else if (!response.ok && response.status != 401)  {
      
  } else {
      return response.json();
  }
}

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0.1,
      paused: false,
      overlay: true,
      fullscreen: false,
      loading:false,
      isLoading: true,
      isFetchSuccess: false,
      dataku: [],
    };
  }


  starturl(){
    const { navigation,route } = this.props;
    fetch(apiserver+starturl+route.params.idmov, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+token,
            'X-User-Id': userid,
        },
    })
        .then(handleErrors)
        .then((obj) => {
            if (obj.status) {
                this.setState({

                })
                //console.log('tenggelam')
                //console.log(this.state.dataku)
            } else {
                
            }
        }).catch((error) => {
        
    })
}

  lastTap = null;
  handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(this.timer);
      doubleTapCallback();
    } else {
      this.lastTap = now;
      this.timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  }

  getTime = t => {
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    // const t = Math.round(time);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return hr + ':' + min + ':' + sec; // this will convert sec to timer string
    // 33 -> 00:00:33
    // this is done here
    // ok now the theme is good to look
  }

  load = ({ duration }) => this.setState({ duration,isLoading:false }) // now here the duration is update on load video
  progress = ({ currentTime }) => this.setState({ currentTime }) // here the current time is upated

componentDidMount(){
  this.starturl();
    this.waktu = setTimeout(() => this.setState({ overlay: false }), 1000);
    this.fullscreen();
}

componentWillUnmount(){
    Orientation.lockToPortrait();
}

  onLoadStart=()=> {
    this.setState({ isLoading:true })
  }

  onBack=()=>{
    const { navigation } = this.props;
    Orientation.lockToPortrait();
        navigation.goBack()
  }

  backward = () => {
    this.video.seek(this.state.currentTime - 5);
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 5000);
  }
  forward = () => {
    this.video.seek(this.state.currentTime + 5); // here the video is seek to 5 sec forward
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 5000);
  }

  onslide = slide => {
    this.video.seek(slide * this.state.duration); // here the upation is maked for video seeking
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 5000);
  }

  youtubeSeekLeft = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => {
      this.video.seek(currentTime - 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 5000);
    })
  }
  youtubeSeekRight = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => { // this fn is used to detect the double tap first callback
      this.video.seek(currentTime + 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 5000);
    })
  }

  fullscreen = () => {
    const { fullscreen } = this.state;
    if(fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    this.setState({ fullscreen: !fullscreen });
  }

  onBuffer = ({isBuffering}) => {
    console.log(isBuffering)
    this.setState({isLoading:isBuffering})
  }
  

  render () {
    const { navigation,route } = this.props;
    const { currentTime, duration, paused, overlay, fullscreen,isLoading } = this.state;
    
    //{this.fullscreen()}
    return (
      <View style={style.container}>
          
        <View style={fullscreen ? style.fullscreenVideo : style.video}>
        
           <Video
            fullscreen={fullscreen}
            paused={paused} // this will manage the pause and play
            ref={ref => this.video = ref}
            source={{uri:route.params.movieUrl}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            onLoadStart={this.onLoadStart}
            onLoad={this.load}
            onProgress={this.progress}
            onBuffer={this.onBuffer}
          />
          <View style={style.overlay}>
            {/* now we can remove this not */}
            {isLoading == true ?<Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={stylescss.spinnerTextStyle}
        />:<Spinner
        visible={false}
        textContent={'Loading...'}
        textStyle={stylescss.spinnerTextStyle}
      />}
            {overlay ? <View style={{flex:1,backgroundColor: '#0006'}}>

            
            <View style={{ ...style.overlaySet, backgroundColor: '#0006'}}>
            <View style={{height: 50,backgroundColor: 'rgba(0,255,0,0)',flex:1,justifyContent:'center',position:'absolute',top:20,left:0,right:0}}><Text style={{color:'white',textAlign: 'center',textAlignVertical: 'center',}}>{route.params.judul}</Text></View>
                    
              <Icon name='backward' style={style.icon} onPress={this.backward} />
              <Icon name={paused ? 'play' : 'pause'} style={style.icon} onPress={() => this.setState({ paused: !paused })} />
              <Icon name='forward' style={style.icon} onPress={this.forward} />

              <View style={{height: 50,backgroundColor: 'rgba(255,0,0,0)',flex:1,position:'absolute', justifyContent:'center',left:20}}><Icon name='arrow-left' style={style.icon} onPress={()=>{this.onBack()}} /></View>
              <View style={style.sliderCont}>
                <View style={style.timer}>
                  <Text style={{ color: 'white' }}>{this.getTime(currentTime)}</Text>
                  <Text style={{ color: 'white' }}>{this.getTime(duration)}</Text>
                </View>
                
                <Slider
                  maximumTrackTintColor='red'
                  minimumTrackTintColor='orange'
                  thumbTintColor='white' // now the slider and the time will work
                  value={currentTime / duration} // slier input is 0 - 1 only so we want to convert sec to 0 - 1
                  onValueChange={this.onslide} 
                />
              </View>
            </View>
            
            </View> : <View style={style.overlaySet}>
                <TouchableNativeFeedback onPress={this.youtubeSeekLeft}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.youtubeSeekRight}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
              </View>}
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  overlaySet: {
      top:15,
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25
  },
  sliderCont: {
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: 20
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  video: { width, height: width * .6, backgroundColor: 'black' },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1
  }
});