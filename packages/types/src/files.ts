// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export type FileInfo = {
    id: string;
    user_id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    name: string;
    extension: string;
    size: number;
    mime_type: string;
    width: number;
    height: number;
    has_preview_image: boolean;
    clientId: string;
    post_id?: string;
};

export type FileUploadResponse = {
    file_infos: FileInfo[];
    client_ids: string[];
}

export type FileSearchResultItem = FileInfo & {
    channel_id: string;
}

export type FileSearchResults = {
    order: string[];
    file_infos: Map<string, FileSearchResultItem>;
    next_file_info_id: string;
    prev_file_info_id: string;
};
