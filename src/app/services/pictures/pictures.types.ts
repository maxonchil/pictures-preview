export interface PictureDto {
    download_url?: string,
    alt_description?: string,
    blur_hash: string,
    categories: string[],
    color: string,
    created_at: string,
    current_user_collections: string[],
    description: string,
    height: number,
    id: string,
    liked_by_user: false,
    likes: number,
    links: {},
    promoted_at: string,
    sponsorship: string,
    topic_submissions: {}
    updated_at: string,
    urls: PictureDtoUrls,
    user: {},
    width: number
}

export interface PictureDtoUrls {
    full: string,
}

export interface Picture {
    id: string,
    url: string,
    isFavorite: boolean,
}
