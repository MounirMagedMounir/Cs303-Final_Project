import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase'
import { Alert } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { deleteUser, signOut, updateProfile } from "firebase/auth";
import ProfileAvatar from '../Components/profileavatar';

export default function Home({ navigation }) {
    const [UserData, SetUserData] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [name, setName] = useState(UserData?.name);
    const [phone, setPhone] = useState(UserData?.phone);
    const [BirthDate, setBirthdate] = useState(UserData?.birthdate);


    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const userr = auth.currentUser;

    useEffect(() => {
        getUserData();
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);

    const getUserData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const userData = doc.data();
            setName(userData.name);
            setPhone(userData.phone);
            setBirthdate(userData.BirthDate);
            SetUserData(userData);
        });
    };
    const updateData = async () => {
        try {
            const userDocRef = doc(db, "users", UserData.uid);
            await updateDoc(userDocRef, {
                name: name,
                phone: phone,
                birthdate: BirthDate,
            });
            Alert.alert("Success", "Your data has been updated!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was an error updating your data.");
        }
    };



    return (
        <>
            
                <View style={{ flex: 0.5, marginTop: 40, marginLeft: 145}}>

                    <ProfileAvatar />
                    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10 }}>{name}</Text>
                    <Switch
                    style={{
                        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                        marginTop: 1,
                        marginRight:177,
                        marginBottom: 100,
                        marginLeft: 10,
                    }}
                    trackColor={{ false: "#767577", true: "#fff" }}
                    thumbColor={isEnabled ? "#3EC70B" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                </View>
            
                
           
            <View style={{ flex: 1.4, borderWidth: 3, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    keyboardType="text"
                    editable={isEnabled}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={UserData?.email}
                    keyboardType="email-address"
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                    editable={isEnabled}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Birth Date "
                    value={BirthDate}
                    onChangeText={(text) => setBirthdate(text)}
                    keyboardType="numeric"
                    editable={isEnabled}
                />
                <TouchableOpacity onPress={updateData} style={{ marginLeft: 180}}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '60%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 1,
        marginLeft: 70,
    },
});