import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";

import { useAppData } from "./AppData";
import uPlot from "uplot";


interface WaveformData {
  selectedTraceData: null | number[];

  importWaveforms: (filepath: string) => Promise<void>;
  selectWaveform: (index: number) => void;
}


export const useWaveformData = create<WaveformData>((set, get) => ({
  selectedTraceData: null,

  importWaveforms: async (filepath) => {
    if (!filepath) return;

    try {
      const nTraces = await invoke<number>("import_waveforms", { filepath });

      const selectTrace = useWaveformData.getState().selectWaveform;

      const traces = [...Array(nTraces).keys()].map((_, i) => (
        <tr key={i}>
          <td onClick={() => selectTrace(i)}>{ i }</td>
        </tr>
      ));

      useAppData.setState(() => ({ dataExplorerItems: traces }));
    } catch (e) {
      console.error(e);
    }
  },

  selectWaveform: async (index) => {
    try {
      const trace = await invoke<number[]>("get_trace_data", { index });

      set({ selectedTraceData: trace });

      const plotData = [trace.map((_, i) => i), trace] as uPlot.AlignedData;

      useAppData.setState(() => ({ plotData }));
      useAppData.setState(() => ({ plotOpts: { title: `Trace ${index}` } as uPlot.Options }));
    } catch (e) {
      console.error(e);
    }
  },
}));
