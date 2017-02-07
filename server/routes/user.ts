﻿import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { IUser} from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';

export class UserRoute extends BaseApiRoute<IUser> implements IBaseApiRoute<IUser>{
    constructor(public app: Express) {
        super(app, "users");
    }
}