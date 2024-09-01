enum AssetPnlLabelStyle {
  PossibleTrendChangeStatus = "text-red-600 text-lg",
  CorrectionStatus = "text-purple-600",
  PumpStatus = "text-green-500",
  TakeProfitStatus = "text-green-800 text-xl",
  TwoX = "text-yellow-500 text-2xl",
  ThreeX = "text-yellow-600 text-3xl",
  FourX = "text-yellow-700 text-4xl",
  FiveX = "text-yellow-800 text-5xl",
  SixX = "text-yellow-900 text-6xl",
  TenX = "text-pink-900 text-6xl",
}

const styleConditions: Record<AssetPnlLabelStyle, (value: number) => boolean> =
  {
    [AssetPnlLabelStyle.PossibleTrendChangeStatus]: (value) => value < -20,
    [AssetPnlLabelStyle.CorrectionStatus]: (value) => -20 <= value && value < 0,
    [AssetPnlLabelStyle.PumpStatus]: (value) => 0 < value && value <= 15,
    [AssetPnlLabelStyle.TakeProfitStatus]: (value) => 15 < value && value < 100,
    [AssetPnlLabelStyle.TwoX]: (value) => 100 <= value && value < 200,
    [AssetPnlLabelStyle.ThreeX]: (value) => 200 <= value && value < 300,
    [AssetPnlLabelStyle.FourX]: (value) => 300 <= value && value < 400,
    [AssetPnlLabelStyle.FiveX]: (value) => 400 <= value && value < 500,
    [AssetPnlLabelStyle.SixX]: (value) => 500 <= value && value < 1000,
    [AssetPnlLabelStyle.TenX]: (value) => value >= 1000,
  };

export function getAssetPnlLabelStyle(value: number): string {
  for (const [style, condition] of Object.entries(styleConditions)) {
    if (condition(value)) {
      return style;
    }
  }
  return "text-gray-500";
}
