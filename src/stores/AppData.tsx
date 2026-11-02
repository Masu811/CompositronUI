import { create } from "zustand";
import uPlot from "uplot";
import { JSX } from "react/jsx-runtime";


interface AppData {
  plotData: null | uPlot.AlignedData;
  plotOpts: null | uPlot.Options;

  dataExplorerItems: JSX.Element[];
}


export const useAppData = create<AppData>((set, get) => ({
  plotData: null,
  plotOpts: null,
  dataExplorerItems: [],
}));
