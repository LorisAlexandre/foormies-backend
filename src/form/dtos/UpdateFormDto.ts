import { FormCosmeticSchema, FormSettingsSchema } from 'src/schemas';

export class UpdateFormDto {
  projectName: string;
  description: string;
  settings: typeof FormSettingsSchema;
  cosmetic: typeof FormCosmeticSchema;
}
