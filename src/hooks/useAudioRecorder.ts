import { useState, useCallback } from 'react';
import { Platform } from 'react-native';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    
    if (Platform.OS === 'web') {
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setIsRecording(true);
          return true;
        } catch (error) {
          setError('Microphone permission denied');
          return false;
        }
      } else {
        setError('Audio recording not supported in this browser');
        return false;
      }
    }
    return false;
  }, []);

  const stopRecording = useCallback(async () => {
    setIsRecording(false);
    return {
      id: `recording-${Date.now()}`,
      uri: 'recording-completed',
      timestamp: Date.now()
    };
  }, []);

  return {
    isRecording,
    error,
    startRecording,
    stopRecording,
  };
};