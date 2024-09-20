import React, { useState,useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image,DrawerLayoutAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

function Profile({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Function to handle image picking
  const selectImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };
  const drawer = useRef(null);

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chart')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/house.png')} style={styles.iconn}/>
        <Text style={styles.drawerItem}>Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.separator} />


      <TouchableOpacity
        onPress={() => navigation.navigate('Project')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/shopping.png')} style={styles.iconn}/>
        <Text style={styles.drawerItem}>Project</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Member')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/group.png')} style={styles.iconn}/>
        <Text style={styles.drawerItem}>Member</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/user.png')} style={styles.iconn}/>
        <Text style={styles.drawerItem}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Favorite')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/user.png')} style={styles.iconn}/>
        <Text style={styles.drawerItem}>Favorite</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Task')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/todo.png')} style={styles.iconn} />
        <Text style={styles.drawerItem}>Task</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  return (
    <DrawerLayoutAndroid
    ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}>
    <View style={styles.container}>
      <View style={styles.card}>
      <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <Image
            source={require('../images/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imagePlaceholder}>Add Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={selectImage} style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change Profile</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={()=>navigation.navigate('Project')}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#ddd',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  changeButton: {
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  changeButtonText: {
    color: 'black',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'rgb(39,99,235)',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#000',
    marginBottom: 10,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: 'rgb(31, 41, 55)',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerItem: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: 10,
  },
  iconn: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#4B5563',
    marginVertical: 10,
  },
});

export default Profile;
