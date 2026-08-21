import {
    View,
    TextInput,
    StyleSheet
} from "react-native";

interface Props {
    value: string;
    onChange: (text: string) => void;
} 

export function SearchBar({value,onChange}:Props){
    return (
        <View style={styles.container}>
      <TextInput
        placeholder="🔍 Buscar destino..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    fontSize: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },
});