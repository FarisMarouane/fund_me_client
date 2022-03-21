import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from './connector';
import './App.css';
import { Notification } from './components/Notification';
import { Modal } from './components/Modal';

const statuses = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  IDLE: 'IDLE',
  PENDING: 'PENDING',
};

function App() {
  const [status, setStatus] = useState(statuses.IDLE);
  const [showNotification, setShowNotification] = useState(false);
  const { active, account, activate, deactivate } = useWeb3React();

  console.log('account', account);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const postData = async (campaignData) => {
    const res = await fetch('/smart_contract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    });

    if (!res.ok) throw new Error(res.status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaignDuration = e.target.duration.value;
    const campaignOwnerAddress = e.target.address.value;
    try {
      setStatus(statuses.PENDING);
      await postData({ campaignDuration, campaignOwnerAddress });
      setStatus(statuses.SUCCESS);
      setShowNotification(true);
    } catch (error) {
      console.log('postData error', error);
      setStatus(statuses.ERROR);
      setShowNotification(true);
    }
  };

  return (
    <div className="h-screen">
      {showNotification && (
        <Notification
          type={status}
          onClick={() => setShowNotification(false)}
        />
      )}
      {status === statuses.PENDING && <Modal />}
      <div className="absolute left-0 top-0">
        <input
          onClick={active ? disconnect : connect}
          type="button"
          value={active ? 'Disconnect from wallet' : 'Connect to wallet'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
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
                Wallet Address:
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={active ? account : ''}
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
