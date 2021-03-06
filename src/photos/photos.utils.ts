export const processHashtags = (caption) => {
    // parse caption
    const hashtags = caption.match(/#[\w]+/g) || [];
    return hashtags.map(hashtag => ({
            where: { hashtag },
            create:{ hashtag }
    }));
          

};