import { showError, showInfo, showSuccess } from "./logger.util";
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
    selectedManager
  );
};

const getRepositoryTemplate = async (
  path: string,
  selectedManager: Manager
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

    execSync(
      `cd ${path} && ${
        selectedManager === Options.YARN ? "yarn" : "npm install"
      }`,
      { stdio: "inherit" }
    );

    showSuccess(ConsoleMessage.PROJECT_GENERATED);
    showInfo(`cd ${path}, run "yarn dev" to start the project`);
    
  } catch (error) {
    showError(error);
  }
};
