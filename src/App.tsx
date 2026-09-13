import { useEffect, useState } from "react";
import InputPage from "./components/InputPage";
import ProcessingScreen from "./components/ProcessingScreen";
import ResultsPage from "./components/results/ResultsPage";
import SettingsModal from "./components/SettingsModal";
import { DEFAULT_DOC, TASKS } from "./data/mockData";

type View = "input" | "processing" | "results";

export default function App() {
  const [view, setView] = useState<View>("input");
  const [task, setTask] = useState(TASKS[0]);
  const [prompt, setPrompt] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const runAnalysis = () => {
    if (!fileName) setFileName(DEFAULT_DOC);
    setView("processing");
  };

  /** Reset everything back to a fresh workbench. */
  const newAnalysis = () => {
    setPrompt("");
    setFileName(null);
    setTask(TASKS[0]);
    setView("input");
  };

  return (
    <>
      {view === "input" && (
        <InputPage
          prompt={prompt}
          setPrompt={setPrompt}
          fileName={fileName}
          setFileName={setFileName}
          task={task}
          setTask={setTask}
          onRun={runAnalysis}
          onNewAnalysis={newAnalysis}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      {view === "processing" && (
        <ProcessingScreen
          task={task}
          fileName={fileName}
          onComplete={() => setView("results")}
        />
      )}

      {view === "results" && (
        <ResultsPage
          fileName={fileName}
          task={task}
          prompt={prompt}
          onNewAnalysis={newAnalysis}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
