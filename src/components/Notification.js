import React from 'react';

const NOTIFICATION_TYPES = {
  SUCCESS: 'bg-green-100',
  ERROR: 'bg-red-100',
};

const NOTIFICATION_MESSAGES = {
  ERROR: 'An error occured while deploying the contract. Please try again.',
  SUCCESS: 'Your contract has been successfully deployed.',
};

export const Notification = ({ type = 'SUCCESS', onClick, message }) => (
  <div
    className={`w-2/3 flex p-4 mb-4 ${NOTIFICATION_TYPES[type]} rounded-lg dark:${NOTIFICATION_TYPES[type]} mr-auto ml-auto`}
    role="alert"
  >
    <svg
      className={`flex-shrink-0 w-5 h-5 text-${NOTIFICATION_TYPES[type]}-700 dark:text-${NOTIFICATION_TYPES[type]}-800`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div
      className={`ml-3 text-lg font-medium text-${NOTIFICATION_TYPES[type]}-700 dark:text-${NOTIFICATION_TYPES[type]}-800`}
    >
      {NOTIFICATION_MESSAGES[type]}
    </div>
    <button
      onClick={onClick}
      type="button"
      className={`ml-auto -mx-1.5 -my-1.5 ${NOTIFICATION_TYPES[type]} text-${NOTIFICATION_TYPES[type]}-500 rounded-lg focus:ring-2 focus:ring-${NOTIFICATION_TYPES[type]}-400 p-1.5 hover:${NOTIFICATION_TYPES[type]} inline-flex h-8 w-8 dark:${NOTIFICATION_TYPES[type]} dark:text-${NOTIFICATION_TYPES[type]}-600 dark:hover:${NOTIFICATION_TYPES[type]}`}
      data-collapse-toggle="alert-2"
      aria-label="Close"
    >
      <span className="sr-only">Close</span>
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
);
