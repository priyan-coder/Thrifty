import DisplaySearchResults from './components/DisplaySearchResults';
const App = () => {
  const searchResults = [
    {
      id: 1,
      title: 'Hats',
      imageUrl: ''
    },
    {
      id: 2,
      title: 'Sneakers',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
    },
    {
      id: 3,
      title: 'Jackets',
      imageUrl: ''
    }
  ];
  return <DisplaySearchResults searchResults={searchResults} />;
};

export default App;
