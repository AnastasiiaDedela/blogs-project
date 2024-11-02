export const getPostsUrl = (
  limit: number,
  offset: number,
  tags: string[],
  searchValue: string,
  authorId?: number,
) => {
  let requestTags = '';
  let url = `http://localhost:8001/api/posts/?limit=${limit}&offset=${offset}`;

  for (let i = 0; i < tags.length; i++) {
    requestTags += `tags=${tags[i]}&`;
  }
  if (requestTags.length > 0) {
    url += `&${requestTags}`;
  }
  if (searchValue.length > 0) {
    url += `&q=${searchValue}`;
  }
  if (authorId) {
    url += `&author_id=${authorId}`;
  }

  return url;
};
