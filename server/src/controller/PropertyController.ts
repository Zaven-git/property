import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Property } from '../entity/Property';

export class PropertyController {
  private propertyRepository = AppDataSource.getRepository(Property);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.propertyRepository.find();
  }

  async save(req: Request, res: Response, next: NextFunction) {
    const { address, description } = req.body;
    const property = Object.assign(new Property(), { address, description });
    return this.propertyRepository.save(property);
  }
}
