
import { useState } from 'react';
import { Box, Button, FormControl, Heading, Input, NativeBaseProvider, Select, Text } from "native-base";
import { Configuration, OpenAIApi } from "openai";
import {REACT_APP_OPENAI_API_KEY} from "@env";
import "react-native-url-polyfill/auto";

export default function App() {
  const [rating, setRating] = useState('');
  const [estType, setEstType] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const configuration = new Configuration({apiKey: REACT_APP_OPENAI_API_KEY,});
  const openai = new OpenAIApi(configuration);

  function generatePrompt() {
    return `write a ${rating} review of a ${estType} with these positive points ${pros} and these negative points ${cons}`;
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
        max_tokens: 2048
      });
      console.log(completion);
      setResult(completion.data.choices[0].text);
    } catch (e) {
      console.log(e)
      setResult("Couldn't generate review", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Box alignItems="center" mt="70">
        <Heading size="xl" >Review Generator</Heading>
        <Box w="90%" mt="10">
          <FormControl isRequired>
            <FormControl.Label>Establishmant Type</FormControl.Label>
            <Input type="text"  placeholder="i.e. restaurant" value={estType} onChangeText={value => setEstType(value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Rating</FormControl.Label>
            <Select selectedValue={rating} onValueChange={value => setRating(value)}>
              <Select.Item label="Very Negative" value="Very Negative" />
              <Select.Item label="Slightly Negative" value="Slightly Negative" />
              <Select.Item label="Neutral" value="Neutral" />
              <Select.Item label="Slightly Positive" value="Slightly Positive" />
              <Select.Item label="Very Positive" value="Very Positive" />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label>Positives</FormControl.Label>
            <Input type="text" value={pros} onChangeText={value => setPros(value)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Negatives</FormControl.Label>
            <Input type="text" value={cons} onChangeText={value => setCons(value)}/>
          </FormControl>
          <Button onPress={onSubmit} mt="5" colorScheme="blue">
            Generate Review
          </Button>
          {result && (<>
                <Heading mt="10">Generated Review:</Heading>
                <Text mt="5">{result}</Text>
            </>)} 
        </Box>          
      </Box>         
    </NativeBaseProvider>
  );
}
