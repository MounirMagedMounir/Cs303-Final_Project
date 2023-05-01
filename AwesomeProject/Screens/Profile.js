import { StyleSheet, View, Text, TouchableOpacity, TextInput, Switch, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase'
import { Alert } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import ProfileAvatar from '../Components/profileavatar';
import back from "../assets/Profile.png"

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

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Confirm Account Deletion",
            "Are you sure you want to delete your account?",
            [


                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes, Delete Account",
                    onPress: async () => {
                        try {
                            await deleteUser(auth.currentUser);
                            Alert.alert("Success", "Your account has been deleted!");
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Error", "There was an error deleting your account.");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };



    return (
        <>

            <ImageBackground
                style={{ flex: 1 }}
                source={back}>
                <ScrollView>
                    <KeyboardAvoidingView behavior="position">

                        <View style={{ width: '30%', height: '15%', marginLeft: 143, marginTop: 79 }}>

                            <ProfileAvatar />
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, marginLeft: 154, marginTop: 10 }}>{name}</Text>
                            <Switch
                                style={{
                                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                    marginTop: 1,
                                    marginRight: 185,
                                    marginBottom: 100,
                                    marginLeft: 5,
                                }}
                                trackColor={{ false: "#767577", true: "#fff" }}
                                thumbColor={isEnabled ? "#3EC70B" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />

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

                            {isEnabled ? (
                                <TouchableOpacity style={styles.buttonn} onPress={updateData}>
                                    <Text style={styles.buttonText}>SaveData</Text>
                                </TouchableOpacity>

                            ) : <TouchableOpacity style={styles.buttonn} onPress={handleDeleteAccount}>
                                <Text style={styles.buttonText}>DeleteAccount</Text>
                            </TouchableOpacity>}

                        </View>


                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>

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
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 1,
        marginLeft: 70,
        marginTop: -5,
    },
    buttonn: {
        width: '60%',
        backgroundColor: '#FE3539',
        padding: 10,
        borderRadius: 50,
        marginTop: 0,
        marginLeft: 70,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});