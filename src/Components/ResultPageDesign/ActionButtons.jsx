import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton'; // Ensure this path is correct

/**
 * Renders action buttons for the result page, such as share and predict more.
 */
function ActionButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <ShareButton />
      <Link to="/predict">
        <button className="px-6 py-3 mt-4 text-white bg-green-600 rounded-xl hover:bg-green-500">
          🔄 Predict More
        </button>
      </Link>
    </div>
  );
}

export default ActionButtons;