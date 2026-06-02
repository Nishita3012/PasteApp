import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  FaEdit,
  FaEye,
  FaTrash,
  FaCopy,
  FaShareAlt,
  FaCalendarAlt,
} from 'react-icons/fa';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  async function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: shareUrl,
        });

        toast.success('Shared successfully');
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <input
        className="w-full p-3 rounded-xl mt-5 bg-gray-950 border border-gray-700 outline-none"
        type="search"
        placeholder="Search your paste..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border border-gray-700 rounded-xl p-5 bg-gray-900 shadow-md"
            >
             <div className='flex flex-row gap-10 justify-between items-center'>
               {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-3">
                {paste.title}
              </h2>

              {/* Icons Row */}
              <div className="flex items-center gap-4 mb-4">
                <Link to={`/?pasteId=${paste._id}`}>
                  <FaEdit
                    size={18}
                    className="cursor-pointer hover:scale-110 transition"
                    title="Edit"
                  />
                </Link>

                <Link to={`/pastes/${paste._id}`}>
                  <FaEye
                    size={18}
                    className="cursor-pointer hover:scale-110 transition"
                    title="View"
                  />
                </Link>

                <FaTrash
                  size={18}
                  className="cursor-pointer hover:scale-110 transition"
                  title="Delete"
                  onClick={() => handleDelete(paste._id)}
                />

                <FaCopy
                  size={18}
                  className="cursor-pointer hover:scale-110 transition"
                  title="Copy"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to clipboard');
                  }}
                />

                <FaShareAlt
                  size={18}
                  className="cursor-pointer hover:scale-110 transition"
                  title="Share"
                  onClick={() => handleShare(paste)}
                />
              </div>
             </div>

             <div className='flex flex-row gap-10 justify-between items-center'>
               {/* Content */}
              <p className="text-gray-500 text-base mb-5 break-words">
                {paste.content}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaCalendarAlt />
                <span>
                  {new Date(paste.createdAt).toLocaleDateString()}
                </span>
              </div>
             </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No Pastes Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
