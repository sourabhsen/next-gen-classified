import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class ChatHistory extends BaseEntity
{
   
    public UserId: ObjectID;
}