import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ isRecording, onPress }) => (
  <TouchableOpacity
    style={[styles.recordButton, isRecording && styles.recordingButton]}
    onPress={onPress}
  >
    <Text style={styles.recordButtonText}>
      {isRecording ? '⬛ Stop' : '⚫ Record'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#4B5563',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RecordButton;