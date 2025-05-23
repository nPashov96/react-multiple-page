import React, { useEffect, useState } from 'react';
import Statistics from './Statistics';
import Information from './Information';
import locationIcon from '../Assets/icon-location.svg';
import darkLocation from '../Assets/dark-location.svg';
import blogIcon from '../Assets/icon-website.svg';
import darkBlog from '../Assets/dark-website.svg';
import twitterIcon from '../Assets/icon-twitter.svg';
import darkTwitter from '../Assets/dark-twitter.svg';
import companyIcon from '../Assets/icon-company.svg';
import darkCompany from '../Assets/dark-company.svg';

const DataSection = ({ searchedUser, setIsResult }) => {
  const [isLoading, setIsLoading] = useState('false');
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.github.com/users/${searchedUser}`
        );
        if (!response.ok) {
          setIsResult(false);
          return;
        }
        const receivedData = await response.json();

        setData(receivedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchedUser) fetchData();
  }, [searchedUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Please try again!</div>;
  }

  return (
    <>
      <div className="data-section-layout">
        <div className="avatar-and-name">
          <img src={`${data.avatar_url}`} alt="img" className="user-avatar" />
          <div className="name-tag-joined">
            <div>
              <p className="full-name">{data.name || 'No name'}</p>
              <p className="user-tag">{`@${data.login}`}</p>
            </div>
            <div className="join-date">
              {`Joined ${new Date(data.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
            </div>
          </div>
        </div>

        <div className="user-details">
          <div className="user-bio">{'This profile has no bio'}</div>
          <div className="user-statistics">
            <Statistics subject="Repos" count={data.public_repos} />
            <Statistics subject="Followers" count={data.followers} />
            <Statistics subject="Following" count={data.following} />
          </div>

          <div className="user-information">
            <Information
              iconId={locationIcon}
              darkIcon={darkLocation}
              data={data.location || 'Not Available'}
              row_start="1"
              col_start="1"
            />
            <Information
              iconId={blogIcon}
              darkIcon={darkBlog}
              data={data.blog || 'Not Available'}
              row_start="2"
              col_start="2"
            />
            <Information
              iconId={twitterIcon}
              darkIcon={darkTwitter}
              data={data.twitter_username || 'Not Available'}
              row_start="1"
              col_start="2"
            />
            <Information
              iconId={companyIcon}
              darkIcon={darkCompany}
              data={data.company || 'Not Available'}
              row_start="1"
              col_start="2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataSection;
