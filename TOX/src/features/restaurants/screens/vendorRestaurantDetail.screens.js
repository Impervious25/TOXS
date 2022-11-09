import React, {useState ,useContext} from "react";
import { FlatList,View, TouchableOpacity } from "react-native";
import styled from 'styled-components';
import { TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { VendorMenuDetail } from "../components/vendorMenuDetails.components";
import { VendorRestaurantContext } from "../../../services/restaurant/vendorRestaurant.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { DeviceOrientationContext } from "../../../services/common/deviceOrientation.context";

const RestaurantText = styled.Text`
  margin-top: ${(props) => props.theme.space[2]};
  text-align: center;
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const FlatListStyle = styled(FlatList)`
    padding-top:${(props) => props.theme.space[3]};
    padding-left:${(props) => props.theme.space[1]};
    padding-right:${(props) => props.theme.space[1]};
    flex:1
`;

const Container = styled.View`
    flex:1
    background-color:${(props) => props.theme.background};
`;

const BottomBar = styled(View)`
    background-color:${(props) => props.theme.colors.ui.basic};
    flex-direction:row
    padding-horizontal: ${(props) => props.theme.space[2]};
    padding-vertical: ${(props) => props.theme.space[3]};
    border-radius: ${(props) => props.theme.space[4]};
    margin-horizontal: ${(props) => props.theme.space[2]};
    margin-bottom:${(props) => props.theme.space[2]};
`;

const AddText=styled.Text`
    color:${(props) => props.theme.colors.bg.primary};
    font-size:18px;
    text-align:center
    font-family:${(props) => props.theme.fonts.heading};
`;

const Add=styled.Text`
    color:${(props) => props.theme.colors.bg.primary};
    font-size:14px;
    font-family:${(props) => props.theme.fonts.heading};
`;

const Input=styled(TextInput)`
    height:50px;
    width:128px;
`;

const Touch=styled.TouchableOpacity`
    margin-left:${(props) => props.theme.space[4]};
    margin-top:${(props) => props.theme.space[2]};
`;

export const VendorRestaurantDetail = () => {

    const { addItem,isLoading,restaurant } = useContext(VendorRestaurantContext)
    
    const [add,setAdd]=useState(false)
    const [item,setItem]=useState("")
    const [cost,setCost]=useState("")
    const [error,setError]=useState(null)
    const { orientation } = useContext(DeviceOrientationContext)

    if(!!error)
    {
        setTimeout(()=>{setError(null)},5000)
    }

    const renderItem = ({ item }) => {
        return (
            <VendorMenuDetail foodItem={item} Restaurant={restaurant[0].Name} oriTag={orientation==1||orientation==2?0:1} />
        );
    };

    return (
        <Container>
            <RestaurantText>{restaurant[0].Name}</RestaurantText>   
            {isLoading?
            (
                <View style={{marginTop:50}}>
                    <ActivityIndicator color={Colors.red400} size={50} />
                </View>
            ):(
                <>
                    <FlatListStyle
                    data={restaurant[0].menuList}
                    renderItem={renderItem}
                    keyExtractor={(item)=>item.title}
                    />
                    <BottomBar>
                        {!!error?
                        (
                            <AddText>Error: {error}</AddText>
                        ):
                        (add?
                            (
                                <View style={{flexDirection:"row", flex:1}}>
                                    <View style={{flex:0.4,alignItems:"center"}}>
                                        <Add>Name: </Add>  
                                        <Input
                                            label="New item"
                                            textContentType="username"
                                            keyboardType="default"
                                            autoCapitalize="words"
                                            onChangeText={(text) => setItem(text)} />  
                                    </View>  
                                    <View style={{flex:0.4,alignItems:"center"}}>
                                        <Add>Cost: </Add> 
                                        <Input
                                            label="Item Cost"
                                            textContentType="telephoneNumber"
                                            keyboardType="phone-pad"
                                            autoCapitalize="none"
                                            onChangeText={(text) => setCost(text)} /> 
                                    </View>       
                                    <View style={{flex:0.2,alignItems:"flex-start"}}>
                                        <Touch activeOpacity={0.65} onPress={async ()=>{
                                            setError(await (addItem(item,cost,restaurant[0].Name)))
                                            setAdd(!add)}}>
                                            <Ionicons name="checkmark-circle-outline" size={28} style={{marginTop:16}} color="white" />
                                        </Touch>
                                    </View>   
                                </View>
                            ):
                            (
                                <TouchableOpacity activeOpacity={0.65} onPress={()=>setAdd(!add)} style={{flex:1,alignItems:"center"}}>
                                    <AddText>Add food item</AddText>
                                </TouchableOpacity>
                            )
                        )
                        }
                    </BottomBar> 
                </>
            )
            }                 
        </Container>
    )
};