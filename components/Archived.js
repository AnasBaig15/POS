import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unarchiveProject} from '../Redux/ProjectSlice';

function Archived({navigation}) {
  const archivedProjects = useSelector(state => state.projects.archivedProjects);
  const dispatch = useDispatch();

  const handleUnarchiveProject = index => {
    dispatch(unarchiveProject(index));
  };

  const navigateToProjects = () => {
    navigation.navigate('Project');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{alignItems: 'center', marginTop: -6}}>
        <Image
          source={require('../images/logo.png')}
          style={{width: 150, height: 80, resizeMode: 'contain'}}
        />
      </View>

      {/* Active Projects Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToProjects}>
          <Image
            source={require('../images/checklist.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Archived')}>
          <Image
            source={require('../images/archive.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Archived</Text>
        </TouchableOpacity>
      </View>

      {/* Archived Projects List */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Project Name</Text>
      </View>
      {archivedProjects.length > 0 ? (
        archivedProjects.map((project, index) => (
          <View key={index} style={styles.projectRow}>
            <View style={styles.projectInfo}>
              <View
                style={[
                  styles.colorDot,
                  {backgroundColor: project.color || '#000'}, // Default color if none is selected
                ]}
              />
              <Text style={styles.projectText}>{project.name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleUnarchiveProject(index)}>
              <Image
                source={require('../images/unarchived.png')}
                style={styles.unarchiveIcon}
              />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No archived projects</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    right: 1,
    marginTop: 15,
    padding: 10,
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  projectRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  projectText: {
    fontSize: 16,
    color: 'black',
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius:6,
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  unarchiveIcon: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: 'black',
  },
});

export default Archived;
