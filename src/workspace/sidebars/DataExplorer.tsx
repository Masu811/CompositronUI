import { useAppData } from "../../stores/AppData";

export function DataExplorer() {
  const items = useAppData(state => state.dataExplorerItems);

  return (
    <table className="trace-selector">
      <tbody>
        {items}
      </tbody>
    </table>
  );
}
