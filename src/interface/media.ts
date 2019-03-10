export interface Media {
    file_id: number;
    filename: string;
    filesize: number;
    title: string;
    description: string;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: string;
    screenshot?: string;
    thumbnails?: Thumbnail;
}

export interface Thumbnail {
    w160?: string;
    w320?: string;
    w640?: string;
}

export interface MediaUploadResponse {
    message: string;
    file_id: number;
}

export interface AppDBMedia {
    file_id: number;
    filename: string;
    filesize: number;
    title: string;
    description: AppDBDescription;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: string;
    screenshot?: string;
    thumbnails?: Thumbnail;
}

export interface AppDBDescription {
    categories?: string[];
    users?: { user_id: number, file_id: number }[];
}
