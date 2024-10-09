import { useState } from 'react';

const GroceryStoreLocator = () => {
  const [location, setLocation] = useState('');
  const [mapSrc, setMapSrc] = useState('');

  const handleSearch = () => {
    if (location) {
      const encodedLocation = encodeURIComponent(location);
      const groceryStoresQuery = `grocery+stores+near+${encodedLocation}`;
      const newSrc = `https://www.google.com/maps/embed/v1/search?key=${import.meta.env.VITE_STORE_API_KEY}&q=${groceryStoresQuery}&zoom=12`;
      setMapSrc(newSrc);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Find Grocery Stores</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              aria-label="Location"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {mapSrc && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <iframe
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryStoreLocator;
