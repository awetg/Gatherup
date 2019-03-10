import { Thumbnail } from './media';

export interface Event {
    file_id: number;
    filename: string;
    filesize: number;
    title: string;
    description: EventDescription;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: string;
    screenshot?: string;
    thumbnails?: Thumbnail;
}

export interface EventDescription {
    category?: string[];
    details?: string;
    start_time?: Date;
    end_time?: Date;
    location?: string;
    coordinates?: { lng?: number, lat?: number };
    attendees?: number[];   // intereseted users will be saved as taging event media as favorite
    organizer?: EventOrganizer;
}

export interface EventOrganizer {
    username?: string;
    fullname?: string;
    avatar_id?: number;
}

export interface PlaceAutocompleteResponse {
    attribution: string;
    features: PlaceItem[];
    query: string[];
    type: string;
}

export interface PlaceItem {
    place_name: string;
    geometry: { type: string; coordinates: number[] };
}

export interface CreateEvent {
    title?: string;
    description?: EventDescription;
}
