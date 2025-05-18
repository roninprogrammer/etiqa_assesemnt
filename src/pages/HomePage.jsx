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
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    setPage(1);
    setRepos([]);
    setHasMore(true);
    setInitialLoading(true);
    await loadRepos();
    setRefreshing(false);
  };

  useEffect(() => {
    loadRepos();
  }, []);

  if (initialLoading) {
    return (
      <section className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-white p-6 rounded-lg shadow space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section aria-label="GitHub Repositories List" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Page {page - 1}</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-sm px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}
      <InfiniteScroll
        dataLength={repos.length}
        next={loadRepos}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading more...</div>}
        scrollThreshold={0.9}
      >
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default HomePage;
