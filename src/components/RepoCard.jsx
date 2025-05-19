import React from 'react';
import PropTypes from 'prop-types';

const RepoCard = ({ repo }) => {
  const { full_name, description, stargazers_count, owner, html_url } = repo;
  const fallbackAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(owner.login);

  return (
    <article className="bg-white p-4 mb-3 border-b border-gray-200">
      <div className="flex items-start justify-between gap-3">
        <img
          src={owner.avatar_url}
          alt={owner.login + ' avatar'}
          onError={(e) => (e.target.src = fallbackAvatar)}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-medium text-sm text-blue-600 truncate hover:underline"
          >
            {full_name}
          </a>
          <p className="text-xs text-gray-700 mt-1 line-clamp-2">
            {description || 'No description provided.'}
          </p>
          <span className="text-xs text-gray-500 mt-1 block">👤 {owner.login}</span>
        </div>

        <div className="text-xs text-gray-600 font-medium pl-2 pt-0.5 whitespace-nowrap">
          ⭐ {stargazers_count.toLocaleString()}
        </div>
      </div>
    </article>
  );
};

RepoCard.propTypes = {
  repo: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stargazers_count: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
    html_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RepoCard;