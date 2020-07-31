import React, { Component } from 'react';
import {  IconButton, Colors} from 'react-native-paper';
import Sound from 'react-native-sound';
import {View, ToastAndroid,StyleSheet} from "react-native";
import { Circle } from 'react-native-animated-spinkit';
class AudioMessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      loading: false
     };
     this.sound = null;
  }

  playMessage = (uri)=>{
    
    if(this.state.playing && this.sound){
      this.sound.stop();
      this.setState({
        playing:false,
        loading:false
      })
    
    }else{
        this.setState({
          loading:true
        })
      if(uri === undefined){
        ToastAndroid.showWithGravityAndOffset(
          "Loading failed",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
       )
        this.setState({
          playing:false,
          loading:false
        })
        return;
      }
      this.sound = new Sound(uri, null, (e) => {
        if (e) {
          console.log('error loading track:', e)
          this.setState({
            playing:false,
            loading:false
          })
        } else {
 
          if(this.sound.isLoaded()){    
            this.setState({
              playing:true,
              loading:false
            })  
          }
         

          this.sound.play((success)=>{

            if(success){
              this.setState({
                playing:false,
                loading:false
              })
              this.sound.release();
            }
          })
        }
      })
    }

  }

deleteMessage = (uri)=>{

}

  render() {
    const {uri, id} = this.props;
    const btnIcon = this.state.playing && !this.state.loading
              ? 
            "stop"
              :
              this.state.loading
                ? 
                "loading" 
          :"play";
    return (
      <View style={{backgroundColor:"ransparent", left:0}}>
        {btnIcon === 'loading'
        ?<Circle color="#009783" size={20} style={{left:40}}/>:
        <IconButton 
         icon={btnIcon}
         style={{marginLeft:50}}
         color={'#009387'}
         size={30}
    onPress={()=>{this.playMessage(uri)}} /> }
      </View>
    );
  }
}



export default AudioMessageBubble
