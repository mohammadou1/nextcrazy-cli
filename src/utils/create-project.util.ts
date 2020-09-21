import { showInfo, showSuccess } from "./logger.util";
import path from "path";
import tar from "tar";
import got from "got";
import fs from "fs";
import { promisify } from "util";
import { Stream } from "stream";
import { ConsoleMessage } from "../interfaces/console.enum";
const pipeline = promisify(Stream.pipeline);

export const createProject = async (folder: string) => {
  showInfo(ConsoleMessage.GENERATING_PROJECT);
  await getRepositoryTemplate(path.join(process.cwd(), folder));
  showSuccess(ConsoleMessage.PROJECT_GENERATED);
  showInfo(`cd ${folder}, run "yarn; yarn dev" to start the project`);
};

const getRepositoryTemplate = async (path: string) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    await pipeline(
      got.stream(
        "https://codeload.github.com/mohammadou1/nextcrazy/tar.gz/master"
      ),
      tar.extract({ cwd: path, strip: 1 }, ["nextcrazy-master"])
    );
  } catch (error) {
    console.log(error);
  }
};
