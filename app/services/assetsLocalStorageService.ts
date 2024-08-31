import { IAsset } from "../models/asset";

class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  setAssets(assets: IAsset[]): void {
    localStorage.setItem("assets", JSON.stringify(assets));
  }

  getAssets(): IAsset[] {
    const storedAssets = localStorage.getItem("assets");
    if (storedAssets) {
      return JSON.parse(storedAssets);
    }
    return [];
  }
}

export default LocalStorageService;
