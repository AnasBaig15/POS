import React, {useRef} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Chart = ({navigation}) => {
  const drawer = useRef(null);

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

  return (
    <>
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

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../images/logo.png')}
              style={{width: 150, height: 80, resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.containerr}>
            <View style={styles.statBox}>
              <Image
                source={require('../images/portfolio.png')}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Open Task</Text>
                <Text style={styles.value}>157</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <Image
                source={require('../images/check.png')}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Completed Task</Text>
                <Text style={styles.value}>85</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <Image
                source={require('../images/shopping.png')}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Total Project</Text>
                <Text style={styles.value}>31</Text>
              </View>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.title}>Completed in Last 7 Days</Text>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [50, 10, 40, 95, 85, 20],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 60}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                },
              }}
              style={styles.chart}
            />
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.title}>Most Productive Month</Text>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [50, 10, 40, 95, 85, 20],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 60}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                },
              }}
              style={styles.chart}
            />
          </View>
        </ScrollView>
      </View>
      </DrawerLayoutAndroid>
      </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chartContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  chart: {
    borderRadius: 16,
  },
  containerr: {
    flexDirection: 'row',
    right: -12,
    marginTop: 20,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 5,
    width: '30%',
    minWidth: 90,
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 12,
    tintColor: 'rgb(59 ,130 ,246)',
  },
  textContainer: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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

export default Chart;
