import React, { useEffect, useState, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
import RepoCard from '../components/RepoCard';
import { fetchTrendingRepos } from '../api/github';

const HomePage = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const sinceDate = useMemo(() => dayjs().subtract(10, 'day').format('YYYY-MM-DD'), []);

  const loadRepos = useCallback(async () => {
    try {
      const items = await fetchTrendingRepos({ date: sinceDate, page });
      if (!items.length) {
        setHasMore(false);
        return;
      }
      setRepos(prev => [...prev, ...items]);
      setPage(prev => prev + 1);
    } catch (err) {
      const isRateLimit = err?.response?.status === 403;
      setError(isRateLimit ? 'GitHub API rate limit exceeded. Please try again later.' : 'Failed to load repositories.');
      setHasMore(false);
    } finally {
      setInitialLoading(false);
    }
  }, [page, sinceDate]);

  useEffect(() => {
    loadRepos();
  }, []);

  if (initialLoading) {
    return (
      <section className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (!repos.length && !error) {
    return (
      <section className="text-center text-gray-500 dark:text-gray-400 py-10">
        <p>No trending repositories found for the last 10 days.</p>
      </section>
    );
  }

  return (
    <section aria-label="GitHub Repositories List" className="space-y-4">
      {error && (
        <div className="text-red-600 dark:text-red-400 text-center mb-4">
          {error}
        </div>
      )}
      <InfiniteScroll
        dataLength={repos.length}
        next={loadRepos}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading more...</div>}
        scrollThreshold={0.9}
        pullDownToRefresh
        pullDownToRefreshThreshold={60}
        refreshFunction={() => {
          setPage(1);
          setRepos([]);
          setHasMore(true);
          setInitialLoading(true);
          loadRepos();
        }}
      >
   <section className="space-y-3">
  {repos.map(repo => (
    <RepoCard key={repo.id} repo={repo} />
  ))}
</section>
      </InfiniteScroll>
    </section>
  );
};

export default HomePage;
