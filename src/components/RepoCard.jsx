import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const RepoCard = ({ repo }) => {
  const { full_name, description, stargazers_count, owner, html_url } = repo;
  const fallbackAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(owner.login);

  const formatStars = (count) =>
    count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 mb-4 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-700 hover:underline break-words"
          >
            {full_name}
          </a>
          <p className="text-sm text-gray-600 mt-2">
            {description || 'No description provided.'}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex items-center">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-sm font-medium text-gray-800">
            {formatStars(stargazers_count)}
          </span>
        </div>
      </div>

      <div className="flex items-center mt-4">
        <img
          src={owner.avatar_url}
          onError={(e) => (e.target.src = fallbackAvatar)}
          alt={owner.login}
          className="w-8 h-8 rounded-full object-cover border"
        />
        <span className="ml-3 text-sm font-medium text-gray-700">{owner.login}</span>
      </div>
    </div>
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
