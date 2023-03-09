
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Configuration, OpenAIApi } from "openai";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function generatePrompt() {
    return ``;
  }

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(),
        temperature: 0.6,
      });
      
      setResult(completion.data.choices[0].text);
    } catch (e) {
      Alert.alert("Couldn't generate review", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Generate Review</Text>
      </Pressable>
      {result && (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Generated Review
          </Text>
          <Text style={styles.result}>{result}</Text>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,

    borderColor: "#353740;",
    borderWidth: 1,
    borderRadius: 4,

    padding: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
