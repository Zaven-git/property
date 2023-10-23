const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response ,Error} from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';

const errorHandler = (err:Error, req:Request, res:Response, next:Function) => {
  res.status(err.statusCode || 500).send(err.message);
};

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property',
      version: '1.0.0',
    },
  },
  apis: ['src/index.ts'],
};

const swaggerDocs = swaggerJsdoc(options);
/**
 * @openapi
 * /property:
 *   get:
 *     summary: Returns a list of properties.
 *     description: Property Documentations
 *     responses:
 *       200:
 *         description: A list of Properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     data:
 *                       type: object
 *                       description: The collection of data.
 *                       example: [{address,description}]
 *                     succeeded:
 *                       type: boolean
 *                       description: true if the request is successful.
 *                       example: true
 *                     message:
 *                       type: string
 *                       description: The request message.
 *                       example: ''
 */


/**
 * @swagger
 *
 * /property:
 *   post:
 *     summary: Create a new property
 *     description: Creates a new property with the given address and description.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: address
 *         in: formData
 *         description: The address of the property.
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         description: The description of the property.
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Bad request
 */



AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](req,res,next);
            res.send({ succeeded: true, data: result, message: '' });
          } catch (err) {
            next(err);
          }
        }
      );
    });

    app.use(errorHandler);
    app.listen(3001);

    console.log(
      'Express server has started on port 3001. Open http://localhost:3001/property to see results'
    );
  })
  .catch((error) => console.log(error));
