import { useEffect } from 'react';
import './App.css';

function App() {
  // useEffect( () => {
  // fetchData();
  // }, [])

  const postData = async (campaignData) => {
    const res = await fetch('/smart_contract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    });
    const response = await res.json();
    console.log('response', response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campaignDuration = e.target.duration.value;
    const campaignOwnerAddress = e.target.address.value;
    postData({ campaignDuration, campaignOwnerAddress });
  };

  return (
    <div className="container mx-auto h-screen">
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="flex flex-col justify-around items-center h-full">
          <div className="flex justify-around w-full">
            <div className="w-72">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                for="name"
              >
                Fund campaign duration (in minutes):{' '}
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                required
                className="appearance-none block w-14 bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                for="email"
              >
                Wallet Address:{' '}
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                className="appearance-none block w-max bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="">
            <input
              type="submit"
              value="Start campaign"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
