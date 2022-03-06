import React, { Component } from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,Linking,
    ActivityIndicator,
    Modal,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform
  } from 'react-native';
  const vpHeight=Dimensions.get('window').height;
  const vpWidth=Dimensions.get('window').width;
type Myprops={
  navigation:any
}
type MyState={
    search:any;
    filterDataSource:any;
    MasterDataSource:any;
    page:any;
    onEndReachedCalledDuringMomentum:boolean;
    isLoading:boolean;
    createdAtModal:boolean;
    filteredTxt:any;
    isCreatedAtFilter:boolean;
    isTitleFilter:boolean;
}
export default class Home extends Component<Myprops, MyState> {
    timerId: any;
    constructor(props:any){
        super(props);
        this.state={
            search:'',
            filterDataSource:[],
            MasterDataSource:[],
            page:0,
            onEndReachedCalledDuringMomentum:true,
            isLoading:false,
            createdAtModal:false,
            filteredTxt:'',
            isCreatedAtFilter:false,
            isTitleFilter:false

        }
    }
    _onMomentumScrollBegin = () => this.setState({onEndReachedCalledDuringMomentum: false});

    loadMoreContent = () => {
      if(!this.state.onEndReachedCalledDuringMomentum){
        this.setState({ onEndReachedCalledDuringMomentum: true },()=>{
          this.setState({ page: this.state.page + 1 }, ()=>this.getListData());
    
        })
      }
    }
    footerView=()=>{
        return(
              <View style={{flex:1,flexDirection: "row",
                  justifyContent: "space-around",
                  marginBottom:100,
                  padding: 10}}>
                  {this.state.isLoading&&
                  <ActivityIndicator size="large" color="#00ff00" />
                  }
              </View>               
        )
    }
     ItemSeparatorView = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
    
       getItem = (item:any) => {
       this.props.navigation.navigate('Detail', {data:item})
      };
     ItemView = ({item, index}:{item:any, index:any}) => {
        return (
          <View style={{flexDirection:'row'}}>
            <Text
              style={styles.itemStyle}
              numberOfLines={2}
              onPress={() => this.getItem(item)}>
              {item.title.toUpperCase()}
          </Text>
          <Text 
            numberOfLines={2} 
            style={{padding:10, 
            width:vpWidth/4}}
            onPress={()=>Linking.openURL(item.url)}>
            {item.url}
          </Text>
          <Text 
            numberOfLines={2} 
            style={{padding:10, 
            width:vpWidth/4}}
            onPress={()=>Linking.openURL(item.url)}>
            {item.created_at}
          </Text>
          <Text 
            numberOfLines={2} 
            style={{width:vpWidth/4, 
            padding:10}}>
            {item.author.toUpperCase()}
          </Text>
          </View>
        );
      };
     searchFilterFunction = (text:any) => {
        if (text) {
          const newData = this.state.MasterDataSource.filter(
             (item:any)=> {
              const itemData = item.title
                ? item.title.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
        this.setState({
            filterDataSource:newData,
            search:text
        })
        } else {
           
          this.setState({
            filterDataSource:this.state.MasterDataSource,
            search:text
        })
        
        }
      };

     filterItem=(text:any, label:any)=>{
       this.setState({createdAtModal:false})
       const filterItem=this.state.MasterDataSource.filter((item:any)=>{
         if(label=='title'){
          return item.title==text;

         }
         else{
        return item.created_at==text;

         }
       }).map(({title, author, url}:{title:any, author:any, url:any})=>{
         return {title, author, url}

       })
       console.log(`filter items here`, filterItem)
       this.setState({filterDataSource:filterItem})
     } 
    componentDidMount(){
        this.getListData();
        this.timerId=setInterval(()=>this.setState({page:this.state.page+1},
        ()=>this.getListData()), 10000)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    getListData=()=>{
        this.setState({isLoading:true})
        fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+this.state.page)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            filterDataSource:this.state.filterDataSource.concat(responseJson.hits),
            MasterDataSource:this.state.MasterDataSource.concat(responseJson.hits),
            isLoading:false
          })
      })
      .catch((error) => {
        //console.error(error);
        this.setState({isLoading:false})
        alert(error.message)
      });
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
             {Platform.OS=='android'&&
              <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.createdAtModal}
              onRequestClose={() => {
                this.setState({createdAtModal:false})
              }}>
              <ScrollView>
              <View style={{flex:1,  margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5}}
            >
        <Text>Modal</Text>
        <Text 
        onPress={
          ()=>this.setState({createdAtModal:false})}>
        Close</Text>  
     
       {this.state.MasterDataSource.map((item:any)=>{
            return (
          <>
            <View style={{flexDirection:'row', paddingVertical:10}}>
         {this.state.isCreatedAtFilter?
            <TouchableOpacity onPress={
            ()=>this.filterItem(item.created_at,'created_at')}>
            <Text>{item.created_at}</Text>
            </TouchableOpacity>:
               <TouchableOpacity onPress={
                ()=>this.filterItem(item.title, 'title')}>
               <Text>{item.title}</Text>
               </TouchableOpacity>}
            </View>
          </>
            )
        })}
       
      </View>
     </ScrollView>
    </Modal>}
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <Text>Filter:-</Text>
                    <TouchableOpacity 
                        onPress={
                        ()=>this.setState({createdAtModal:true, 
                        isCreatedAtFilter:true, 
                        isTitleFilter:false})}>
                      <Text>Created At</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={
                        ()=>this.setState({createdAtModal:true, 
                        isTitleFilter:true, 
                        isCreatedAtFilter:false})}>
                      <Text>Title</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={
                      ()=>this.setState({filterDataSource:[],MasterDataSource:[], page:0},
                      ()=>this.getListData())}>
                      <Text>Clear</Text>
                  </TouchableOpacity>
                </View>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => this.searchFilterFunction(text)}
                value={this.state.search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
              />
              <View 
              style={{flexDirection:'row', 
              paddingVertical:10, paddingHorizontal:10}}>
                <Text 
                  style={{fontSize:16, 
                    width:vpWidth/4,
                  fontWeight:'bold'}}>
                  Title
                </Text>
                <Text 
                  style={{
                  fontSize:16, 
                  width:vpWidth/4,
                  fontWeight:'bold'}}>
                  Url
                </Text>
                <Text 
                  style={{
                  fontSize:16, 
                  width:vpWidth/4,
                  fontWeight:'bold'}}>
                  Created_at
                </Text>
                <Text 
                  style={{ 
                  fontSize:16, 
                  width:vpWidth/4,
                  fontWeight:'bold'}}>
                  Author
                </Text>
              </View>
              <FlatList
              style={{marginTop:10}}
                data={this.state.filterDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView}
                renderItem={this.ItemView}
                onEndReached={this.loadMoreContent}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={this._onMomentumScrollBegin}
                ListFooterComponent={this.footerView}
              />
            </View>
          </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingHorizontal:10,
      paddingVertical:30,
    },
    itemStyle: {
      padding: 10,
      width:vpWidth/4
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
  });
  

