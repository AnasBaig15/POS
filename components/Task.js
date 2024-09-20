import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';

function Task({navigation}) {
  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Image
        source={require('../images/logo.png')}
        style={{width: 120, height: 110, resizeMode: 'contain'}}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Chart')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/house.png')} style={styles.iconn} />
        <Text style={styles.drawerItem}>Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Project')}
        style={styles.drawerItemContainer}>
        <Image
          source={require('../images/shopping.png')}
          style={styles.iconn}
        />
        <Text style={styles.drawerItem}>Project</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Member')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/group.png')} style={styles.iconn} />
        <Text style={styles.drawerItem}>Member</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/user.png')} style={styles.iconn} />
        <Text style={styles.drawerItem}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Favorite')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/star.png')} style={styles.iconn} />
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
  const drawer = useRef(null);
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}>
      <View style={{padding:20}}>
      <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <Image
            source={require('../images/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 200,
        }}>
        <Image
          source={require('../images/task.png')}
          style={{height: 100, width: 100}}
        />
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 22}}>
          You Have No Assigned Tasks.
        </Text>
      </View>
    </DrawerLayoutAndroid>
  );
}
const styles = StyleSheet.create({
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
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  drawerItem: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: 8,
  },
  iconn: {
    width: 23,
    height: 23,
    tintColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#4B5563',
    marginVertical: 10,
  },
});
export default Task;
