import { promises as fs } from "fs";
import { join, dirname } from "path";
import * as os from "os";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(
      `❌ Failed to read/parse JSON at ${filePath}: ${err.message}`
    );
    throw err;
  }
}

function getSystemInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    cpuCount: os.cpus().length,
    totalMemBytes: os.totalmem(),
    freeMemBytes: os.freemem(),
    uptimeSeconds: os.uptime(),
    username: (() => {
      try {
        return os.userInfo().username;
      } catch {
        return null;
      }
    })(),
  };
}

(async () => {
  const jsonPath = join(__dirname, "data.json");

  console.log("📂 Reading data.json asynchronously...");
  const jsonData = await readJsonFile(jsonPath);
  console.log("✅ JSON contents:", jsonData);

  console.log("\n💻 System information:");
  console.log(getSystemInfo());
})();
