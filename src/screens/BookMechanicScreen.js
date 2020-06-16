import React, { useState } from 'react';
import { View, StatusBar, Modal} from 'react-native';
import MapView, { Marker } from  'react-native-maps';
import  styles  from  './Styles/authstyles';
import MechanicInformation from '../Components/MechnicInformation'
import LinearGradient from 'react-native-linear-gradient';
const BookMechanicScreen = () => {
  const [modal,setModal] = useState(false);
  const [visible, setVisible] = useState(false)
    return (
      <View style={styles.container}>
       <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <MapView 
          initialRegion={{
            latitude: 34.253000,
            longitude: 72.3489000,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
              }} 
              loadingEnabled = {true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress = {false}
              showsUserLocation={true}
              showsCompass={true}
              showsPointsOfInterest = {false}  
           style ={{width:'100%', height:'100%',}} 
        >
            <Marker
              onPress ={() =>setModal(true)}
              coordinate={{ 
              latitude:34.2530,
              longitude:72.3489,
              }} />

            <Marker
              coordinate={{ 
              latitude:34.2530,
              longitude:72.3996,
              }} />  

              <Marker
              coordinate={{ 
              latitude:34.2953,
              longitude:72.3496,
              }} />

             <Marker
              coordinate={{ 
              latitude:34.2953,
              longitude:72.3996,
              }} />
        </MapView>

        <Modal
          animation="zoomInUp"
          direction="alternate"
          animationType="slide"
          transparent={false}
          visible={modal}
          onRequestClose={()=>{
          setModal(false)
          }}>
          <MechanicInformation />
         </Modal>
      </View>
    );
};

export default BookMechanicScreen;


