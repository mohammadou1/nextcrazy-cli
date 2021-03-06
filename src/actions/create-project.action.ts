import { showError, showInfo, showSuccess } from "../utils/logger.util";
import path from "path";
import tar from "tar";
import got from "got";
import fs from "fs";
import { promisify } from "util";
import { Stream } from "stream";
import { execSync } from "child_process";
import { ConsoleMessage, Options } from "../interfaces/console.enum";
import { Manager } from "../interfaces";
import { provideManagerQuestion } from "../questions";
const pipeline = promisify(Stream.pipeline);

export const createProject = async (folder: string, manager?: Manager) => {
  const selectedManager: Manager = manager
    ? manager
    : (await provideManagerQuestion()).manager;

  showInfo(ConsoleMessage.GENERATING_PROJECT);
  await getRepositoryTemplate(
    path.join(process.cwd(), folder),
    selectedManager,
    folder
  );
};

const getRepositoryTemplate = async (
  path: string,
  selectedManager: Manager,
  name: string
) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    } else throw new Error(ConsoleMessage.PROJECT_EXISTS);

    /**
     * copying files from "nextcrazy" repo as "tar" archieve (provided by github)
     * unzipping it, and add it to the desired directory
     */

    await pipeline(
      got.stream(
        "https://codeload.github.com/mohammadou1/nextcrazy/tar.gz/master"
      ),
      tar.extract({ cwd: path, strip: 1 }, ["nextcrazy-master"])
    );

    const packageJson = await fs
      .readFileSync(path + "/package.json")
      .toString();
    const parsed = JSON.parse(packageJson);

    // Since am using the master repo, it has unneeded package.json data, in the future, examples folder should be created
    delete parsed.keywords;
    delete parsed.description;

    parsed.name = name;

    await fs.writeFileSync(path + "/package.json", JSON.stringify(parsed));

    // Prettifiyng package.json
    execSync(
      `cd ${path} && ${
        selectedManager === Options.YARN ? "yarn" : "npm install"
      } && yarn prettier`,
      { stdio: "inherit" }
    );

    showSuccess(ConsoleMessage.PROJECT_GENERATED);
    showInfo(`cd ${name}, run "yarn dev" to start the project`);
  } catch (error) {
    showError(error);
  }
};
