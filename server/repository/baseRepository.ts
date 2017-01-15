﻿import { MongoDBConnection } from '../data/connection';
import { Db, Collection } from 'mongodb';
import logger = require('winston');

export interface IBaseRepository<TEntity> {
    get(id: number, callback: (err: Error, item: TEntity) => any);
    read(query: Object, callback: (err: Error, item: TEntity) => any);
    readMany(query: Object, sortKey: string, sortOrder: string, callback: (err: Error, item: Array<TEntity>) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulk(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: string);
    delete(id: string);
}

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    moviesCollection: Collection;
    collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;

        MongoDBConnection.getConnection((connection) => {
            this.db = connection;

            console.log('Mongo connected.......');
        });
    }

    public get(id: number, callback: (err: Error, item: TEntity) => any) {


        var moviesCollection = this.db.collection(this.collectionName);
        moviesCollection.findOne({ "id": +id }, function (err, item) {
            logger.log('debug', 'reading get data..with id..' + id);
            callback(err, item);
        });
    }

    public read(query: Object, callback: (err: Error, item: TEntity) => any) {

        var moviesCollection = this.db.collection(this.collectionName);
        moviesCollection.findOne(query, function (err, item) {
            logger.log('debug', 'reading single data..with query');
            callback(err, item);
        });
    }

    public readMany(query: Object, sortKey: string, sortOrder: string, callback: (err: Error, item: Array<TEntity>) => any) {

        var moviesCollection = this.db.collection(this.collectionName);

        var options;

        if (sortKey && sortOrder) {
            logger.log('debug', 'reading many data..with query and sortkey, sortorder');
            options = {
                // "limit": 20,
                // "skip": 10,
                "sort": [sortKey, sortOrder]
            };

            moviesCollection.find(query, options).toArray(function (err, results) {
                callback(err, results);
            });
        } else if (sortKey) {
            logger.log('debug', 'reading many data..with query and sortkey');
            options = {
                //  "limit": 20,
                //  "skip": 10,
                "sort": sortKey
            };
            moviesCollection.find(query, options).toArray(callback);
        } else {
            logger.log('debug', 'reading many data..with query');
            moviesCollection.find(query).toArray(callback);
        }
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.log('debug', 'called create data..');

        if (!data) {
            callback(new Error('Empty'), null);
        }

        var moviesCollection = this.db.collection(this.collectionName);
        moviesCollection.insert(data, function (err, res) {
            logger.log('debug', 'inserting data..');

            callback(err, res.ops[0]);
        });
    }

    public bulk(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any) {
        logger.log('debug', 'called bulk data..');

        if (data) {
            callback(new Error("Empty data.."), null);
        }

        var moviesCollection = this.db.collection(this.collectionName);
        moviesCollection.insert(data, function (err, res) {
            logger.log('debug', 'inserting bulk data..');

            callback(err, res.ops);
        });
    }

    public update(id: string) {
        this.db.open(function (err, db) {


        });

    }

    public delete(id: string) {
        this.db.open(function (err, db) {

        });
    }
}