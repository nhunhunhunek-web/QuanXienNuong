const fs = require("fs");
const path = require("path");

const root = process.cwd();
const source = path.join(root, "game-source", "game.html");
const outputDir = path.join(root, "dist");
const output = path.join(outputDir, "index.html");

if (!fs.existsSync(source)) {
  throw new Error("Khong tim thay game-source/game.html");
}

fs.mkdirSync(outputDir, { recursive: true });

let html = fs.readFileSync(source, "utf8");

const scripts = `
<script src="/platform/auth.js"></script>
<script src="/platform/cloud.js"></script>
`;

if (html.includes("</body>")) {
  html = html.replace("</body>", scripts + "\n</body>");
} else {
  html += scripts;
}

fs.writeFileSync(output, html, "utf8");

fs.cpSync(
  path.join(root, "platform"),
  path.join(outputDir, "platform"),
  { recursive: true }
);

console.log("Build game thanh cong!");
