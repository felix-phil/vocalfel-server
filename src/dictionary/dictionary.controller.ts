import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as availableWords from '../../data/words.json';
import * as definitions from '../../data/definitions.json';

@Controller('dictionary')
export class DictionaryController {
  @Get()
  allWords(@Res() res: Response): any {
    res.status(HttpStatus.OK).json(availableWords);
  }
  @Get(':word')
  getWord(@Param('word') word: string, @Res() res: Response): any {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const definition = definitions[word];
    if (definition) {
      return res.status(HttpStatus.OK).json(definition);
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'Word not found' });
  }
}
