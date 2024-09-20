import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TextInput,
  DrawerLayoutAndroid,
} from 'react-native';
import {Modal, Portal, RadioButton} from 'react-native-paper';

function Member({navigation}) {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [members, setMembers] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleSubmit = () => {
    if (name && email && role) {
      if (isEditing && editIndex !== null) {
        const updatedMembers = members.map((member, index) =>
          index === editIndex ? {name, email, role} : member,
        );
        setMembers(updatedMembers);
      } else {
        setMembers([...members, {name, email, role}]);
      }
      setName('');
      setEmail('');
      setPassword('');
      setRole('member');
      hideModal();
    }
  };

  const handleEdit = index => {
    const memberToEdit = members[index];
    setName(memberToEdit.name);
    setEmail(memberToEdit.email);
    setRole(memberToEdit.role);
    setEditIndex(index);
    setIsEditing(true);
    showModal();
  };

  const handleDelete = index => {
    Alert.alert(
      'Delete Resource',
      'Are you sure you want to delete this resource?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => setMembers(members.filter((_, i) => i !== index)),
        },
      ],
    );
  };

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.nameEmailContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.emailText}>{item.email}</Text>
        </View>
        <Text style={styles.roleText}>{item.role}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleEdit(index)}>
            <Image source={require('../images/edit.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Image source={require('../images/bin.png')} style={styles.iconn} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const listHeader = () => (
    <>
      <View style={{alignItems: 'center', marginTop: -6}}>
        <Image
          source={require('../images/logo.png')}
          style={{width: 150, height: 80, resizeMode: 'contain'}}
        />
      </View>
      <Text style={styles.header}>Team Members</Text>
      <TouchableOpacity onPress={showModal} style={styles.createButton}>
        <Text style={styles.buttonText}>
          {isEditing ? 'Update Member' : 'Create Member'}
        </Text>
      </TouchableOpacity>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCel}>Role</Text>
      </View>
    </>
  );
  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chart')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/house.png')} style={styles.iconnn}/>
        <Text style={styles.drawerItem}>Dashboard</Text>
      </TouchableOpacity>
      <View style={styles.separator} />


      <TouchableOpacity
        onPress={() => navigation.navigate('Project')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/shopping.png')} style={styles.iconnn}/>
        <Text style={styles.drawerItem}>Project</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Member')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/group.png')} style={styles.iconnn}/>
        <Text style={styles.drawerItem}>Member</Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.drawerItemContainer}>
        <Image source={require('../images/user.png')} style={styles.iconnn}/>
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
  const drawer = useRef(null);
  return (
    <DrawerLayoutAndroid
    ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}>
    <View style={styles.container}>
    <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <Image
            source={require('../images/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {isEditing ? 'Edit Member' : 'Add New Member'}
          </Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.label}>Select Role</Text>
          <RadioButton.Group
            onValueChange={newValue => setRole(newValue)}
            value={role}>
            <View style={styles.radioButtonRow}>
              <RadioButton value="admin" />
              <Text style={{color: 'black'}}>Admin</Text>
            </View>
            <View style={styles.radioButtonRow}>
              <RadioButton value="manager" />
              <Text style={{color: 'black'}}>Manager</Text>
            </View>
            <View style={styles.radioButtonRow}>
              <RadioButton value="member" />
              <Text style={{color: 'black'}}>Member</Text>
            </View>
          </RadioButton.Group>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {isEditing ? 'Update' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </Modal>
      </Portal>

      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No members added yet.</Text>
        }
        contentContainerStyle={styles.flatList}
      />
    </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 170,
    top: 30,
  },
  createButton: {
    backgroundColor: 'rgb(39,99,235)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    left: 86,
    top: -23,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '500',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  flatList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(107 114 128)',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameEmailContainer: {
    flex: 2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  roleText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 10,
    tintColor: 'rgb(107 114 128)',
  },
  iconn: {
    width: 18,
    height: 18,
    marginLeft: 10,
    tintColor: 'rgb(107 114 128)',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 16,
  },
  headerCel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(107 114 128)',
    right: 90,
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
  iconnn: {
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

export default Member;

// headerCel:{
//   fontSize: 16,
//   fontWeight: 'bold',
//   color: '#333',
// },
