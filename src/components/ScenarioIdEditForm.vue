<script setup lang="ts">
import type { ScenarioId } from "@orbat-mapper/msdllib";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Input } from "@/components/ui/input";
import FormFooter from "@/components/FormFooter.vue";
import type { ScenarioIdType } from "@orbat-mapper/msdllib/dist/lib/scenarioid";

const props = defineProps<{ item: ScenarioId }>();
const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "update", value: Partial<ScenarioIdType>): void;
}>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    description: z.string(),
    modificationDate: z.string().date(),
    securityClassification: z.string(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.item.name || "",
    description: props.item.description || "",
    modificationDate: props.item.modificationDate || new Date().toISOString().split("T")[0],
    securityClassification: props.item.securityClassification || "",
  },
});

const onSubmit = form.handleSubmit((values) => {
  emit("update", values);
});
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-6">
      <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!form.isFieldDirty">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="description"
        :validate-on-blur="!form.isFieldDirty"
      >
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input type="text" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="securityClassification"
        :validate-on-blur="!form.isFieldDirty"
      >
        <FormItem>
          <FormLabel>Security classification</FormLabel>
          <FormControl>
            <Input type="text" placeholder="e.g. UNCLASSIFIED" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="modificationDate"
        :validate-on-blur="!form.isFieldDirty"
      >
        <FormItem>
          <FormLabel>Modification date</FormLabel>
          <FormControl>
            <Input type="text" placeholder="YYYY-MM-DD" v-bind="componentField" />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormFooter @cancel="emit('cancel')" />
    </form>
  </div>
</template>
