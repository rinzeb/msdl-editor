import { downloadAsKMZ, downloadAsMSDL, loadMSDLFromFile } from "@/lib/io.ts";
import { useScenarioStore } from "@/stores/scanarioStore.ts";

export type ScenarioAction = "LoadMSDLFromFile" | "DownloadMSDL" | "ExportKML";

export function useScenarioActions() {
  const { msdl, loadScenario } = useScenarioStore();

  async function dispatchAction(action: ScenarioAction) {
    if (!msdl.value) {
      return;
    }
    switch (action) {
      case "DownloadMSDL":
        await downloadAsMSDL(msdl.value);
        break;
      case "ExportKML":
        await downloadAsKMZ(msdl.value);
        break;
      case "LoadMSDLFromFile":
        try {
          const scn = await loadMSDLFromFile();
          loadScenario(scn);
        } catch (e) {
          console.error(e);
        }
        break;
      default:
        console.error(`Unknown action: ${action}`);
    }
  }

  return { dispatchAction };
}
