import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const RepoCard = ({ repo }) => {
  const { full_name, description, stargazers_count, owner, html_url } = repo;
  const fallbackAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(owner.login);

  const formatStars = (count) =>
    count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;

  return (
<div className="bg-white px-3 py-2 border border-gray-200 rounded shadow-sm">
  <a
    href={html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-semibold text-black"
  >
    {full_name}
  </a>
  <p className="text-xs text-gray-700 mt-1">
    {description || 'No description provided.'}
  </p>

  <div className="mt-3 flex items-center justify-between">
<div className="flex items-center space-x-1 mt-2">
  <img
    src={owner.avatar_url}
    alt={`${owner.login} avatar`}
    onError={(e) => (e.target.src = fallbackAvatar)}
    className="w-[14px] h-[14px] rounded object-cover"
  />
  <span className="text-xs text-gray-800">{owner.login}</span>
</div>

    <div className="flex items-center text-xs font-normal text-gray-800">
  <FaStar className="mr-1 text-xs" />
  {formatStars(stargazers_count)}
</div>

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
