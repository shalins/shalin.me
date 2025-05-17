import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  
  // Handle files without frontmatter
  if (!match) {
    console.warn("No frontmatter found in file");
    return { 
      metadata: {
        title: "Untitled",
        publishedAt: new Date().toISOString().split('T')[0],
        summary: ""
      } as Metadata,
      content: fileContent 
    };
  }
  
  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { 
    metadata: metadata as Metadata, 
    content 
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

export function getMDXPosts(directory: string) {
  const postsDirectory = path.join(process.cwd(), directory);
  let mdxFiles = getMDXFiles(postsDirectory);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(postsDirectory, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
} 