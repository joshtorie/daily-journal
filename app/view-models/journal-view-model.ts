import { Observable, knownFolders, path } from '@nativescript/core';
import { TNSRecorder } from '@nativescript/audio';
import { JournalEntry } from '../models/journal-entry';

export class JournalViewModel extends Observable {
    private recorder: TNSRecorder;
    private currentPromptIndex: number = 0;
    private prompts = ['morning', 'afternoon', 'evening'];
    private _isRecording: boolean = false;
    private _currentPrompt: string = 'Briefly describe your morning';
    private entries: JournalEntry[] = [];

    constructor() {
        super();
        this.recorder = new TNSRecorder();
        this.setupRecorder();
    }

    get isRecording(): boolean {
        return this._isRecording;
    }

    set isRecording(value: boolean) {
        if (this._isRecording !== value) {
            this._isRecording = value;
            this.notifyPropertyChange('isRecording', value);
        }
    }

    get currentPrompt(): string {
        return this._currentPrompt;
    }

    set currentPrompt(value: string) {
        if (this._currentPrompt !== value) {
            this._currentPrompt = value;
            this.notifyPropertyChange('currentPrompt', value);
        }
    }

    private async setupRecorder() {
        try {
            const hasPermission = await this.recorder.hasRecordPermission();
            if (!hasPermission) {
                await this.recorder.requestRecordPermission();
            }
        } catch (err) {
            console.error('Failed to get recording permission:', err);
        }
    }

    async startRecording() {
        try {
            const documentsFolder = knownFolders.documents();
            const audioFolder = documentsFolder.getFolder('journal_recordings');
            const fileName = `${this.prompts[this.currentPromptIndex]}_${Date.now()}.m4a`;
            const audioPath = path.join(audioFolder.path, fileName);

            await this.recorder.start({
                filename: audioPath,
                format: 'm4a',
                metering: true,
                channels: 1
            });
            this.isRecording = true;
        } catch (err) {
            console.error('Error starting recording:', err);
        }
    }

    async stopRecording() {
        try {
            const audioPath = await this.recorder.stop();
            this.isRecording = false;
            this.entries.push(new JournalEntry(
                this.prompts[this.currentPromptIndex] as any,
                audioPath
            ));
            this.moveToNextPrompt();
        } catch (err) {
            console.error('Error stopping recording:', err);
        }
    }

    skipPrompt() {
        this.entries.push(new JournalEntry(
            this.prompts[this.currentPromptIndex] as any
        ));
        this.moveToNextPrompt();
    }

    private moveToNextPrompt() {
        this.currentPromptIndex++;
        if (this.currentPromptIndex < this.prompts.length) {
            this.currentPrompt = `Briefly describe your ${this.prompts[this.currentPromptIndex]}`;
        } else {
            this.currentPrompt = 'Journal entry completed!';
        }
    }
}