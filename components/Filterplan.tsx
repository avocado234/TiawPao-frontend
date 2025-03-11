import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';

interface Trip {
  trip_name: string;
}

interface FilterplanProps {
  trips: Trip[];
  setFilteredTrips: (trips: Trip[]) => void;
}

const Filterplan: React.FC<FilterplanProps> = ({ trips, setFilteredTrips }) => {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs = ['A-Z', 'Z-A'];

  const filterAndSortTrips = () => {
    let filtered = trips.filter((trip) =>
      trip.trip_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab === 'A-Z') {
      filtered = filtered.sort((a, b) => a.trip_name.localeCompare(b.trip_name));
    } else if (activeTab === 'Z-A') {
      filtered = filtered.sort((a, b) => b.trip_name.localeCompare(a.trip_name));
    }

    setFilteredTrips(filtered);
  };

  const handleTabPress = (tab: string) => {
    // ถ้ากด tab เดิม ให้เป็นการยกเลิก filter
    if (activeTab === tab) {
      setActiveTab('');
      setFilteredTrips(trips); // คืนค่า trips ทั้งหมด
    } else {
      setActiveTab(tab);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredTrips(trips);
  };

  useEffect(() => {
    filterAndSortTrips();
  }, [searchQuery, activeTab, trips]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Section */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#999"  />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Feather name="x-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Section */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 8,
    paddingRight: 30, // เผื่อพื้นที่ให้กับปุ่ม Clear
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
  clearButton: {
    position: 'absolute',
    right: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: '#203B82',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#203B82',
  },
  activeTabText: {
    color: '#FFF',
  },
});

export default Filterplan;
