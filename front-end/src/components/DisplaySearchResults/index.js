import EachProductSummary from '../EachProductSummary';

const DisplaySearchResults = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map(({ id, title, imageUrl }) => (
        <EachProductSummary key={id} pdtName={title} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default DisplaySearchResults;
