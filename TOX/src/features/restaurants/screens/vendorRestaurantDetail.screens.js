import React, {useContext ,useState} from "react";
import { FlatList,View,Text, TouchableOpacity } from "react-native";
import styled from 'styled-components';
import { TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { VendorMenuDetail } from "../components/vendorMenuDetails.components";

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
`;

const Container = styled.View`
    flex:1
    background-color:${(props) => props.theme.background};
`;

const BottomBar = styled(View)`
    background-color:${(props) => props.theme.colors.ui.basic};
    flex-direction:row
    padding-horizontal: ${(props) => props.theme.space[2]};
    padding-vertical: ${(props) => props.theme.space[4]};
    border-radius: ${(props) => props.theme.space[2]};
    margin-horizontal: ${(props) => props.theme.space[2]};
`;

const AddText=styled.Text`
    color:${(props) => props.theme.colors.bg.primary};
    font-size:18px;
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

export const VendorRestaurantDetail = ({ route,navigation }) => {
    const { restaurant } = route.params;
    
    const [add,setAdd]=useState(false)
    const [item,setItem]=useState("")
    const [cost,setCost]=useState("")

    const renderItem = ({ item }) => {
        return (
            <VendorMenuDetail foodItem={item} navigation={navigation} />
        );
    };

    return (
        <Container>
            <RestaurantText>{restaurant.Name}</RestaurantText>                    
            <FlatListStyle
                data={restaurant.menuList}
                renderItem={renderItem}
                keyExtractor={(item)=>item.Name}
            />
            <BottomBar>
                {add?
                    (
                            <View style={{flexDirection:"row", flex:1}}>
                                <View style={{flex:0.45}}>
                                    <Add>Name: </Add>  
                                    <Input
                                        label="New item"
                                        value={item}
                                        textContentType="username"
                                        keyboardType="default"
                                        autoCapitalize="words"
                                        onChangeText={(text) => setItem(text)} />  
                                </View>  
                                <View style={{flex:0.55}}>
                                    <Add>Cost: </Add> 
                                    <View style={{flexDirection:"row"}}>
                                    <Input
                                        label="Item Cost"
                                        value={cost}
                                        textContentType="telephoneNumber"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        onChangeText={(text) => setCost(text)} /> 
                                    <Touch onPress={()=>setAdd(!add)}>
                                        <Ionicons name="checkmark-circle-outline" size={28} color="white" />
                                    </Touch>
                                    </View> 
                                </View>  
                            </View>
                        
                    ):
                    (
                        <TouchableOpacity onPress={()=>setAdd(!add)} style={{marginLeft:125}}>
                            <AddText>Add food item</AddText>
                        </TouchableOpacity>
                    )
                }
            </BottomBar>    
        </Container>
    )
};