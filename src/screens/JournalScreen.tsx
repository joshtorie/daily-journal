import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { PROMPTS } from '../constants/prompts';
import { AudioRecording } from '../types';
import RecordButton from '../components/RecordButton';
import ActionButton from '../components/ActionButton';

const JournalScreen = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [recordings, setRecordings] = useState<(AudioRecording | null)[]>([]);
  const { isRecording, error, startRecording, stopRecording } = useAudioRecorder();

  const handleRecordPress = useCallback(async () => {
    if (isRecording) {
      const recording = await stopRecording();
      setRecordings(prev => [...prev, {
        ...recording,
        timeOfDay: ['morning', 'afternoon', 'evening'][currentPromptIndex] as AudioRecording['timeOfDay']
      }]);
      moveToNextPrompt();
    } else {
      const success = await startRecording();
      if (!success && error) {
        Alert.alert('Recording Error', error);
      }
    }
  }, [isRecording, currentPromptIndex, error, startRecording, stopRecording]);

  const moveToNextPrompt = useCallback(() => {
    if (currentPromptIndex < PROMPTS.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    } else {
      Alert.alert('Complete', 'Journal entries completed!');
    }
  }, [currentPromptIndex]);

  const handleSkip = useCallback(() => {
    setRecordings(prev => [...prev, null]);
    moveToNextPrompt();
  }, [moveToNextPrompt]);

  const handleClose = useCallback(() => {
    BackHandler.exitApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>
        {PROMPTS[currentPromptIndex]}
      </Text>
      
      {isRecording && (
        <Text style={styles.recordingText}>Recording in progress...</Text>
      )}

      <View style={styles.buttonContainer}>
        <ActionButton title="Skip" onPress={handleSkip} />
        <RecordButton isRecording={isRecording} onPress={handleRecordPress} />
        <ActionButton title="Close" onPress={handleClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
    justifyContent: 'space-between',
  },
  promptText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#4B5563',
    marginTop: 32,
    marginBottom: 16,
  },
  recordingText: {
    color: '#EF4444',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
});