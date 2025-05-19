import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const RepoCard = ({ repo }) => {
  const { full_name, description, stargazers_count, owner, html_url } = repo;
  const fallbackAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(owner.login);

  return (
    <article className="bg-white p-4 mb-3 rounded border border-gray-200">
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block font-semibold text-sm text-black hover:underline truncate"
      >
        {full_name}
      </a>
      <p className="text-sm text-gray-800 mt-1">
        {description || 'No description provided.'}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <img
            src={owner.avatar_url}
            alt={owner.login + ' avatar'}
            onError={(e) => (e.target.src = fallbackAvatar)}
            className="w-3 h-3 rounded object-cover"
          />
          <span>{owner.login}</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
          <FaStar className="text-black" /> {Math.round(stargazers_count / 100) / 10}k
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