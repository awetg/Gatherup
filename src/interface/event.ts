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

export interface EventUploadResponse {
    message: string;
    file_id: number;
}

export interface EventDescription {
    category?: string[];
    details?: string;
    time?: Date;
    location?: string;
    attends?: number[];
}

export interface Thumbnail {
    w160?: string;
    w320?: string;
    w640?: string;
}

export interface Avatar extends Event {
  tag_id: number;
  tag: string;
}
