import { MenuBar } from "./workspace/menubar/MenuBar";
import { DataExplorer } from "./workspace/sidebars/DataExplorer";
import { Editor } from "./workspace/editor/Editor";
import "./App.css";


function App() {
  return (
    <main>
      <MenuBar />
      <div className="row-container">
        <DataExplorer />
        <Editor />
      </div>
    </main>
  );
}


export default App;
