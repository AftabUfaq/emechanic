import React, { useState, useEffect, useContext } from 'react';
import { View, StatusBar, Modal, ToastAndroid} from 'react-native';
import MapView, { Marker } from  'react-native-maps';
import  styles  from  './Styles/authstyles';
import MechanicInformation from '../Components/MechnicInformation'
import {Context as BookingContext} from '../Context/BookingContext'
const BookMechanicScreen = () => {
  const {state, mechanchicdetails, fecthservices, fetchmechanics} = useContext(BookingContext)
  useEffect(() =>{
    fetchmechanics();
  }, [])
  const getmechnicdata = (id) =>{
     mechanchicdetails(id),
     fecthservices(id);
       setModal(true);
  }

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
            {state.mechanicsarray.map(marker => (
              <Marker
                key={marker.key}
                coordinate={{ 
                    latitude: marker.latitude,
                    longitude:marker.longitude,
                          }}
                    onPress = {() => getmechnicdata(marker.key)}                      
                    title={'click to show details'}
                    description={'He is a 5 star rated Mechanic'}
              />))}
      
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
            
          <MechanicInformation
              name={state.mechanicdata.name}
              email ={state.mechanicdata.email}
              cnic={state.mechanicdata.cnic}
              photoURl ={state.mechanicdata.photoURl}
              phoneNumber ={state.mechanicdata.phoneNumber}
              role={state.mechanicdata.role}
              FCM={state.mechanicdata.FCM}
              address={state.mechanicdata.address}
              uid ={state.mechanicdata.uid}
              services = {state.services}
              closeview={() => setModal(false)} 
          />
         </Modal>
      </View>
    );
};

export default BookMechanicScreen;


