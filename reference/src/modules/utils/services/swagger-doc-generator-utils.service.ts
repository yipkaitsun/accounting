/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';

import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';

import {
} from './constants/swagger-doc-generator-utils.constant';

@Injectable()
export class SwaggerDocGeneratorUtilsService {
  public async generateFile(swaggerDoc: any, env: string): Promise<void> {
    if (!fs.existsSync(path.join(appRoot.toString(), 'swagger'))) {
      fs.mkdirSync(path.join(appRoot.toString(), 'swagger'));
    }
    fs.writeFileSync(
      path.join(
        appRoot.toString(),
        'swagger',
        `recipes-service-${env}.json`
      ),
      JSON.stringify(swaggerDoc, null, 2),
      { flag: 'w' }
    );
  }
}
