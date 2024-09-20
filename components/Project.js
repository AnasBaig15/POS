import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  DrawerLayoutAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProject,
  archiveProject,
  toggleFavorite,
} from '../Redux/ProjectSlice';
import {Modal, Portal} from 'react-native-paper';

function Project({navigation}) {
  const [visible, setVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    'rgb(100,116,139)',
    'rgb(113,113,122)',
    'rgb(239,68,68)',
    'rgb(249,115,22)',
    'rgb(234,179,8)',
    'rgb(132,204,22)',
    'rgb(34,197,94)',
    'rgb(20,184,166)',
    'rgb(14,165,233)',
    'rgb(59,130,246)',
    'rgb(99,102,241)',
    'rgb(139,92,246)',
    'rgb(236,72,153)',
    'rgb(244,63,94)',
  ];

  const handleColorSelect = color => {
    setSelectedColor(color);
  };

  const dispatch = useDispatch();
  const activeProjects = useSelector(state => state.projects.activeProjects);
  const favoriteProjects = useSelector(
    state => state.projects.favoriteProjects,
  );

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleAddProject = () => {
    if (projectName && selectedColor) {
      dispatch(addProject({name: projectName, color: selectedColor}));
      setProjectName('');
      setSelectedColor(null);
      hideModal();
    }
  };

  const handleArchiveProject = index => {
    dispatch(archiveProject(index));
  };

  const navigateToArchived = () => {
    navigation.navigate('Archived');
  };

  const handleFavoriteProject = project => {
    dispatch(toggleFavorite(project)); // Pass the entire project object
  };
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
  const drawer = useRef(null);
  return (
    <DrawerLayoutAndroid
     ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require('../images/menu.png')} style={styles.menuIcon}/>
        <View style={{alignItems: 'center', marginTop: -6}}>
          <Image
            source={require('../images/logo.png')}
            style={{width: 150, height: 80, resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../images/checklist.png')}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToArchived}>
            <Image
              source={require('../images/archive.png')}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Archived</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CreateButton} onPress={showModal}>
            <Text style={styles.createButtonText}>Create Project</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Project Name</Text>
          </View>
          {activeProjects.length > 0 ? (
            activeProjects.map((project, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.colorDotContainer}>
                  <View
                    style={[styles.colorDot, {backgroundColor: project.color}]}
                  />
                  <Text style={styles.tableCell}>{project.name}</Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    onPress={() => handleFavoriteProject(project)}>
                    <Image
                      source={require('../images/star.png')}
                      style={[
                        styles.favoriteIcon,
                        {
                          tintColor: favoriteProjects.some(
                            favProject => favProject.name === project.name,
                          )
                            ? 'rgb(255,239,0)'
                            : 'gray',
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleArchiveProject(index)}>
                    <Image
                      source={require('../images/archive.png')}
                      style={styles.archiveIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No projects available</Text>
          )}
        </View>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalHeader}>Create New Project</Text>
            <TextInput
              label="Project Name"
              value={projectName}
              onChangeText={setProjectName}
              style={styles.input}
              mode="outlined"
              placeholder="Project Name"
              placeholderTextColor="gray"
            />
            <Text style={styles.colorHeader}>Select Color:</Text>
            <View style={styles.colorCheckboxContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: color,
                      borderColor: selectedColor === color ? '#000' : '#fff',
                    },
                  ]}
                  onPress={() => handleColorSelect(color)}>
                  {selectedColor === color && (
                    <Text style={styles.checkMark}></Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={handleAddProject}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Add Project</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  colorHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  colorCheckboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorDot: {width: 15, height: 15, borderRadius: 7.5, marginRight: 10},
  colorDotContainer: {flexDirection: 'row', alignItems: 'center'},
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    right: 10,
    marginTop: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  CreateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(39,99,235)',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'black',
  },
  buttonText: {
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tableRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableCell: {
    fontSize: 16,
    color: 'rgb(107 114 128)',
  },
  archiveIcon: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: 'black',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default Project;
