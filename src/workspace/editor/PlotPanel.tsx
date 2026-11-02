import { useEffect, useMemo, useState } from "react";
import uPlot from "uplot";
import UplotReact from "uplot-react";
import 'uplot/dist/uPlot.min.css';

import { useAppData } from "../../stores/AppData";


export function PlotPanel() {
  const data = useAppData(state => state.plotData);
  const plotOpts = useAppData(state => state.plotOpts);

  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const title = container.querySelector<HTMLElement>(".u-title");
      const titleHeight = title?.offsetHeight ?? 0;
      const legend = container.querySelector<HTMLElement>(".u-legend");
      const legendHeight = legend?.offsetHeight ?? 0;
      const { width, height } = entry.contentRect;
      setSize({
        width: Math.max(0, Math.floor(width)),
        height: Math.max(0, Math.floor(height - titleHeight - legendHeight)),
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [container]);

  const opts = useMemo<uPlot.Options>(() => ({
    ...plotOpts,
    ...size,
    class: "my-chart",
    scales: plotOpts?.scales ?? { x: { time: false } },
    series: plotOpts?.series ?? [
      {},
      {
        show: true,
        spanGaps: false,
        stroke: "steelblue",
        width: 1.5,
      },
    ],
  }), [plotOpts, size]);

  if (!data) return null;

  return (
    <div className="plot-panel" ref={setContainer}>
      <UplotReact options={opts} data={data} />
    </div>
  );
}
