import { open } from "@tauri-apps/plugin-dialog";

import { useWaveformData } from "../../stores/WaveformData";


async function importData() {
  try {
    const filepath = await open({ multiple: false, directory: false });

    if (!filepath) return;

    const importWaveforms = useWaveformData.getState().importWaveforms;

    await importWaveforms(filepath);
  } catch (e) {
    console.error(e);
  }
}


export function MenuBar() {
  return (
    <div id="menu-bar">
      <div className="menu-bar-section">
        <table>
          <tbody>
            <tr>
              <td key={0} onClick={importData}>Import Data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
