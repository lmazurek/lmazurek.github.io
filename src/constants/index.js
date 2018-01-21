export const username = 'lmazurek';
export const repositoryName = 'test'
export const prApiUrl = ({ username, repositoryName }) => `https://api.github.com/repos/${username}/${repositoryName}/pulls`;
