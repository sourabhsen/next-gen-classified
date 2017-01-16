﻿
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { User } from '../models/User';



export interface IUserRepository extends IBaseRepository<User> {

}

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  
    constructor() {
        super();
    }
}
