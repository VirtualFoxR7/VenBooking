import { StyleSheet, View, FlatList } from 'react-native';
import innDatabase from '@/data/staticDatabase.json';
import InnElement from '@/components/inn-element';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={innDatabase}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InnElement id={item.id} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});