import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputIndex = process.argv.indexOf("--output");
const outputRoot = resolve(
  siteRoot,
  outputIndex >= 0 ? process.argv[outputIndex + 1] : "_site",
);

const rootFiles = [
  "index.html",
  "styles.css",
  "site.js",
  "CNAME",
  "sitemap.xml",
  "robots.txt",
  ".nojekyll",
];
const rootDirectories = ["assets", "notices"];

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });

for (const file of rootFiles) {
  copyRequired(resolve(siteRoot, file), resolve(outputRoot, file));
}
for (const directory of rootDirectories) {
  copyRequired(resolve(siteRoot, directory), resolve(outputRoot, directory));
}

const productsRoot = resolve(siteRoot, "products");
let publishedProducts = 0;

if (existsSync(productsRoot)) {
  for (const entry of readdirSync(productsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;

    const productRoot = resolve(productsRoot, entry.name);
    const manifestPath = resolve(productRoot, "publish-manifest.json");
    if (!existsSync(manifestPath)) continue;

    validateProduct(productRoot, entry.name, manifestPath);
    mkdirSync(resolve(outputRoot, "products"), { recursive: true });
    cpSync(productRoot, resolve(outputRoot, "products", entry.name), { recursive: true });
    publishedProducts += 1;
  }
}

console.log(`AKORA 사이트 준비 완료: ${outputRoot} (제품 정책 ${publishedProducts}개)`);

function copyRequired(source, destination) {
  if (!existsSync(source)) throw new Error(`사이트 필수 경로가 없습니다: ${source}`);
  cpSync(source, destination, { recursive: statSync(source).isDirectory() });
}

function validateProduct(productRoot, productSlug, manifestPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const expectedBaseUrl = `https://akoracorp.com/products/${productSlug}/`;

  if (manifest.schemaVersion !== 1) {
    throw new Error(`${productSlug} 게시 매니페스트 버전이 올바르지 않습니다.`);
  }
  if (manifest.productSlug !== productSlug) {
    throw new Error(`${productSlug} 게시 매니페스트의 제품 경로가 일치하지 않습니다.`);
  }
  if (manifest.publicBaseUrl !== expectedBaseUrl) {
    throw new Error(`${productSlug} 공개 주소는 ${expectedBaseUrl}이어야 합니다.`);
  }

  const requiredFiles = [
    "index.html",
    "privacy.html",
    "terms.html",
    "support.html",
    "licenses.html",
    "assets/site.css",
    "assets/app-icon-192.png",
  ];
  for (const file of requiredFiles) {
    if (!existsSync(resolve(productRoot, file))) {
      throw new Error(`${productSlug} 공개 정책 파일이 없습니다: ${file}`);
    }
  }

  const forbiddenPatterns = [
    /출시 전 입력/,
    /출시 전 초안/,
    /example\.(?:com|net|org)/i,
    /\b(?:TODO|DRAFT)\b/i,
  ];
  for (const file of requiredFiles.filter((file) => file.endsWith(".html"))) {
    const html = readFileSync(resolve(productRoot, file), "utf8");
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(html)) {
        throw new Error(`${productSlug}/${file}에 공개할 수 없는 초안 값이 있습니다: ${pattern}`);
      }
    }
    if (!html.includes(expectedBaseUrl)) {
      throw new Error(`${productSlug}/${file}의 canonical 공개 주소가 올바르지 않습니다.`);
    }
  }
}
