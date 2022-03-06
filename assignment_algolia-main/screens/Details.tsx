import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
type MyProps={
    route:any
}
export class Details extends Component<MyProps> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{textAlign:'center'}}> Details </Text>
                <View style={{flexDirection:'row'}}>
                    <Text>{JSON.stringify(this.props?.route?.params?.data)}</Text>
                </View>
            </View>
        )
    }
}

export default Details
const styles=StyleSheet.create({
    container:{
        flex:1, 
        paddingHorizontal:20, 
        paddingVertical:20
    }
})