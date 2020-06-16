import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native'

const Confirmphone = ({navigation}) => {
    const [enteredValue, setEnteredValue] = useState('')
    const inputHandler = (input) => {
        setEnteredValue(input.replace(/[^0-9]/g, ''));
    }

    return (
        <View style={styles.inputView}>
            <TextInput
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={11}
                placeholder={'Enter mobile number\nاپنا موبائل نمبر لکھیں'}
                onChangeText={inputHandler}
                value={enteredValue}
                style={styles.input}
                multiline={true} />
            <Button title="Submit" onPress={() => navigation.navigate('Services')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#33BBFF'
    },
    input: {
        margin: 15,
        height: 100,
        fontWeight: 'bold',
        borderColor: 'black',
        fontSize: 23,
        fontFamily: 'verdana',
        textAlign: 'center',
        borderRadius: 10,
        width: '80%',
        borderWidth: 1
    }
})
export default Confirmphone