import { downloadAsKMZ, downloadAsMSDL, loadMSDLFromFile } from "@/lib/io.ts";
import { useScenarioStore } from "@/stores/scanarioStore.ts";
import { toast } from "vue-sonner";
export type ScenarioAction = "LoadMSDLFromFile" | "DownloadMSDL" | "ExportKML";

export function useScenarioActions() {
  const { msdl, loadScenario } = useScenarioStore();

  async function dispatchAction(action: ScenarioAction) {
    switch (action) {
      case "DownloadMSDL":
        if (!msdl.value) {
          return;
        }
        const res = await downloadAsMSDL(msdl.value);
        if (res?.name) {
          toast.success(`Scenario downloaded as "${res.name}" `);
        }
        break;
      case "ExportKML":
        if (!msdl.value) {
          return;
        }
        const kmzRes = await downloadAsKMZ(msdl.value);
        if (kmzRes?.name) {
          toast.success(`Scenario exported as "${kmzRes.name}" `);
        } else if (kmzRes !== undefined) {
          toast.success("Scenario exported as KMZ");
        }
        break;
      case "LoadMSDLFromFile":
        try {
          const scn = await loadMSDLFromFile();
          loadScenario(scn);
          toast.success(`Scenario "${scn.scenarioId.name}" loaded`);
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
