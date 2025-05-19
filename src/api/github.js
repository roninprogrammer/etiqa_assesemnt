import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/repositories';
const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
};
const DEFAULT_PER_PAGE = 30;

export const fetchTrendingRepos = async ({ date, page }) => {
  const { data } = await axios.get(GITHUB_API_URL, {
    params: {
      q: `created:>${date}`,
      sort: 'stars',
      order: 'desc',
      page,
      per_page: DEFAULT_PER_PAGE,
    },
    headers: GITHUB_HEADERS,
    timeout: 10000,
  });
  return data.items || [];
};