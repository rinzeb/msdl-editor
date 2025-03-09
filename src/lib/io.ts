import { MilitaryScenario } from "@orbat-mapper/msdllib";

export async function loadMSDLFromFile() {
  const { fileOpen } = await import("browser-fs-access");
  try {
    const file = await fileOpen();
    const text = await file.text();
    return MilitaryScenario.createFromString(text);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
