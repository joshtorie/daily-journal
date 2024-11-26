export class JournalEntry {
    constructor(
        public timeOfDay: 'morning' | 'afternoon' | 'evening',
        public audioPath?: string
    ) {}
}