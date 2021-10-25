import React from 'react';
import LargeImage from './LargeImage';
import SmallImage from './SmallImage';

export default function MoreInfo({ artwork, closeInfo, }) {
  if (!artwork) return <></>;

  const {
    accessionYear,
    primaryImage,
    primaryImageSmall,
    additionalImages,
    constituents,
    title,
    artistDisplayName,
    artistDisplayBio,
    artistNationality,
    artistGender,
  } = artwork;

  /**
   * Renders additional images
   * @returns JSX.Element[]
   */
  const renderAdditionalImages = () => {
    return additionalImages.map((additionalImage, index) => (
      <SmallImage key={`additional-image-${index}`} imgSrc={additionalImage} imgTitle={`Additional ${index}`} />
    ))
  }

  /**
   * Renders constituents in string
   * @returns JSX.Element[]
   */
  const renderConstituents = () => {
    return constituents.map((constituent, index) => {
      const { name, role, constituentWikidata_URL } = constituent;
      return (
        <a href={constituentWikidata_URL} key={`constituent-${index}`}>
          {name}, {role}
        </a>
      );
    })
  }

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          closeInfo();
        }}
      >
        Close
      </button>
      {title && <h1>{title}</h1>}
      <p>Year: {accessionYear && accessionYear.length ? accessionYear : 'N/A'}</p>
      <LargeImage imgSrc={primaryImage} imgTitle={title} />
      <SmallImage imgSrc={primaryImageSmall} imgTitle={title} />
      <div>
        {additionalImages && additionalImages.length && renderAdditionalImages()}
      </div>
      <h3>Constituents</h3>
      <div>{constituents && constituents.length && renderConstituents()}</div>
      <div>
        <h2>Artist Info</h2>
        <h3>Name: {artistDisplayName && artistDisplayName.length ? artistDisplayName : 'N/A'}</h3>
        <h3>Bio:</h3>
        <p>{artistDisplayBio && artistDisplayBio.length ? artistDisplayBio : ''}</p>
        <h3>Nationality: {artistNationality && artistNationality.length ? artistNationality : 'N/A'}</h3>
        <h3>Gender: {artistGender && artistGender.length ? artistGender : 'N/A'}</h3>
      </div>
    </div>
  )
}
