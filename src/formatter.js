import { fileURLToPath } from 'node:url';
import { check, format, resolveConfig } from 'prettier';

const configurationPath = fileURLToPath(import.meta.url);

async function getOptions() {
  const configuration = await resolveConfig(configurationPath);
  return { ...configuration, parser: 'babel' };
}

export async function formatJavaScript(source) {
  return format(source, await getOptions());
}

export async function isFormatted(source) {
  return check(source, await getOptions());
}
