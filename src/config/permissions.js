import {PermissionsAndroid} from 'react-native';

export const RequestContactPermission=async()=>{
    try{
        const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,{
                title: 'Contacts Permission',
                message: 'This app needs access to your contacts',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
        })
        if(granted){
            return true;
        }
        return false;
    }catch(err){
        console.log("error in getting permission for contact",err);
    }

}
