import type { MilitaryScenario } from "@orbat-mapper/msdllib";
import type { InjectionKey, ShallowRef } from "vue";

export const activeScenarioKey = Symbol("Active scenario") as InjectionKey<
  ShallowRef<MilitaryScenario | undefined>
>;
