import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Subscriber extends BaseEntity
{
  
    public UserId: ObjectID;
}