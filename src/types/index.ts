{
  export interface AudioRecording {
    id: string;
    uri: string;
    timestamp: number;
    timeOfDay: 'morning' | 'afternoon' | 'evening';
  }
}