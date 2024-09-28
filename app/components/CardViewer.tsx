import React, { useState } from "react";
import AssetCard from "./assets/AssetCard"; // Ensure this path is correct
import { IAsset } from "@/app/models/asset";

interface CardViewerProps {
  assets: IAsset[];
  cardsPerPage?: number;
}

const CardViewer: React.FC<CardViewerProps> = ({
  assets,
  cardsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(assets.length / cardsPerPage);

  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, assets.length);
  const currentAssets = assets.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  return (
    <div className="relative">
      <div className="flex overflow-x-auto space-x-2 py-4 px-2">
        {currentAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onDelete={() => null}
            onEdit={() => null}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white py-1 px-2 font-bold rounded-full disabled:bg-gray-400"
        aria-label="Previous"
        disabled={currentPage === 0}
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white py-1 px-2 font-bold rounded-full disabled:bg-gray-400"
        aria-label="Next"
        disabled={currentPage === totalPages - 1}
      >
        &gt;
      </button>
    </div>
  );
};

export default CardViewer;
