"use client";
import { useState, useEffect } from "react";
import { GroupedAssets, IAsset } from "../../models/asset";
import AssetForm from "./AssetForm";
import LocalStorageService from "@/app/services/assetsLocalStorageService";
import { groupBy } from "lodash";
import AssetGroupAccordion from "./AssetGroupAccordion";

interface AssetsListProps {
  assets: IAsset[];
  onSort: (field: keyof IAsset, order: "asc" | "desc") => void;
}

const localStorageService = LocalStorageService.getInstance();

export default function AssetsList({ assets, onSort }: AssetsListProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [assetEditing, setAssetEditing] = useState<IAsset | null>(null);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.target.value.split(":");
    onSort(field as keyof IAsset, order as "asc" | "desc");
  };

  const [groupedAssets, setGroupedAssets] = useState<GroupedAssets>({});

  useEffect(() => {
    setGroupedAssets(groupBy(assets, "group"));
  }, [assets]);

  useEffect(() => {
    localStorageService.setAssets(assets);
  }, [assets, localStorageService]);

  function handleSubmitForm(event: IAsset): void {
    let updatedAssets = [...assets];

    if (isEditing) {
      // setAssets(
      //   updatedAssets.map((a) => (a.id === assetEditing?.id ? event : a))
      // );
      setIsEditing(false);
      return;
    }

    // setAssets([...updatedAssets, event].map(withPnl));
    setAssetEditing(null);
  }

  function handleRemoveAsset(asset: IAsset): void {
    const updatedAssets = assets.filter((a) => a.id !== asset.id);
    // setAssets(updatedAssets);
  }

  function handleEditAsset(asset: IAsset): void {
    setIsEditing(true);
    setAssetEditing(asset);
  }

  const sortControls = (
    <div className="w-full flex items-center justify-end my-4 mx-1">
      <label className="text-xs font-bold text-gray-100 text-opacity-80">
        Sort By:
      </label>
      <select
        className="bg-transparent text-xs border rounded-md px-1 ml-2"
        onChange={handleSortChange}
      >
        <option value="">Select one option</option>
        <option value="ticker:asc">Ticker - asc</option>
        <option value="ticker:desc">Ticker - desc</option>
        <option value="pnl:asc">PNL - asc</option>
        <option value="pnl:desc">PNL - desc</option>
        <option value="pnlPercentage:asc">PNL % - asc</option>
        <option value="pnlPercentage:desc">PNL % - desc</option>
        <option value="amount:asc">Amount - asc</option>
        <option value="amount:desc">Amount - desc</option>
        <option value="amount:asc">Value - asc</option>
        <option value="amount:desc">Value - desc</option>
      </select>
    </div>
  );
  return (
    <div className="flex flex-wrap relative">
      {sortControls}
      <div className="w-full">
        <AssetGroupAccordion groups={groupedAssets} />
      </div>
      <div className="w-52 h-48 mx-auto my-4 overflow-auto border-2 bg-gray-900 border-gray-700 rounded-md">
        <AssetForm assetEditing={assetEditing} onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
}
