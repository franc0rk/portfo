enum AssetPnlLabelStyle {
  PossibleTrendChangeStatus = "red-600",
  CorrectionStatus = "purple-600",
  PumpStatus = "green-500",
  TakeProfitStatus = "green-800",
  TwoX = "yellow-500",
  ThreeX = "yellow-600",
  FourX = "yellow-700",
  FiveX = "yellow-800",
  SixX = "yellow-900",
  TenX = "pink-900",
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

export function getAssetPnlStyle(value: number): string {
  for (const [style, condition] of Object.entries(styleConditions)) {
    if (condition(value)) {
      return style;
    }
  }
  return "text-gray-500";
}
