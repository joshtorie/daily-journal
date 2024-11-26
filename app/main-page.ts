import { EventData, Page, Frame } from '@nativescript/core';
import { JournalViewModel } from './view-models/journal-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new JournalViewModel();
}

export function closeApp() {
    if (Frame.topmost()) {
        Frame.topmost().close();
    }
}