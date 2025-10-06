import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Please provide a module name.");
  console.log("Example: pnpm gen:module user");
  process.exit(1);
}

const modulesDir = path.resolve("server/modules");
const moduleDir = path.join(modulesDir, moduleName);

if (fs.existsSync(moduleDir)) {
  console.error(`❌ Module "${moduleName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(moduleDir, { recursive: true });

const files = {
  [`${moduleName}.repo.ts`]: `// ${moduleName} repository\nexport function get${capitalize(moduleName)}() {}\n`,
  [`${moduleName}.service.ts`]: `// ${moduleName} service\nexport function create${capitalize(moduleName)}() {}\n`,
  [`${moduleName}.dto.ts`]: `// ${moduleName} DTO (Zod schemas)\nimport { z } from 'zod'\n\nexport const ${moduleName}Schema = z.object({})\n`,
  [`index.ts`]: `export * from "./${moduleName}.dto";\nexport * from "./${moduleName}.service";`,
};

for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(moduleDir, fileName), content);
}

console.log(`✅ Module "${moduleName}" created successfully!`);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
