﻿
import {Express, Router, Request, Response} from 'express';
import logger = require('winston');
import {LookupRoute} from './lookup';
import {UserRoute} from './user';
import {PostRoute} from './post';
import {ProductRoute} from './product';

export class IndexApiRoute
{ 
    constructor(private app : Express)
    { 
        new LookupRoute(app);
        new UserRoute(app);
        new PostRoute(app);
        new ProductRoute(app);
    }  
}

