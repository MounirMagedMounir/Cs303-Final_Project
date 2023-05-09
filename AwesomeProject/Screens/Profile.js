import { StyleSheet, View, Text, TouchableOpacity, TextInput, Switch, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase'
import { Alert } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import ProfileAvatar from '../Components/profileavatar';
import back from "../assets/Profile.png"
import wp from "../assets/wp.png"
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function Profile({ navigation }) {
    const [activeTab, setActiveTab] = useState('Info');
    const [UserData, SetUserData] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [name, setName] = useState(UserData?.name);
    const [phone, setPhone] = useState(UserData?.phone);
    const [BirthDate, setBirthdate] = useState(UserData?.birthdate);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

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
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };
    const updateData = async () => {
        try {
            const userDocRef = doc(db, "users", UserData.uid);
            await updateDoc(userDocRef, {
                name: name,
                phone: phone,
                birthdate: date.toLocaleDateString(),
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



  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
   
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileImageContainer}>
            <ProfileAvatar/>
          </View>
          <Text style={styles.profileName}>{name}</Text>
        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Info' && styles.activeTab]}
            onPress={() => handleTabPress('Info')}
          >
            <Text style={styles.tabText}>Informations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'Orders' && styles.activeTab]}
            onPress={() => handleTabPress('Orders')}
          >
            <Text style={styles.tabText}>Orders</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={styles.tabContent}>
        {activeTab === 'Info' && (
          <View style={styles.profileContent}>
            <Switch
                                    style={{
                                        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                        marginRight: 170,
                                        marginBottom: -20,
                                        marginLeft: 5,
                                    }}
                                    trackColor={{ false: "#767577", true: "#fff" }}
                                    thumbColor={isEnabled ? "red" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />

                                <TextInput
                                    style={styles.input0}
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
                                <TouchableOpacity onPress={showDatePicker}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Birth Date "
                                        value={date.toLocaleDateString()}
                                        onChangeText={(text) => setDate(text)}
                                        keyboardType="numeric"
                                        editable={false}
                                    />
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}

                                {isEnabled ? (
                                    <TouchableOpacity style={styles.buttonn} onPress={updateData}>
                                        <Text style={styles.buttonText}>SaveData</Text>
                                    </TouchableOpacity>

                                ) : <TouchableOpacity style={styles.buttonn} onPress={handleDeleteAccount}>
                                    <Text style={styles.buttonText}>DeleteAccount</Text>
                                </TouchableOpacity>}

                            </View>
          
        )}
        {activeTab === 'Orders' && (
          <View style={styles.photosContent}>
            
            
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
  },
  activeTab: {
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileContent: {},
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileDescription: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
    marginBottom: 20,
  },
  photosContent: {},
  friendsContent: {},
  
input: {
    width: '80%',
    padding: '3.8%',
    marginBottom: '3.85%',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: '9.5%',
    marginTop: '-1.3%',
},input0: {
    width: '80%',
    padding: '3.8%',
    marginBottom: '3.85%',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: '9.5%',
    marginTop: '10%',
},
buttonn: {
    width: '80%',
    backgroundColor: 'red',
    padding: '3%',
    borderRadius: 50,
    marginTop: 0,
    marginLeft: '9.5%',
},
buttonText: {
    color: '#fff',
    textAlign: 'center',
},
});