import os, time, datetime;
import pymysql.cursors;
from dotenv import load_dotenv;
from flask_sqlalchemy import SQLAlchemy;
import json;
from io import BytesIO;

load_dotenv();

def connectDb() :
    connection = pymysql.connect(host=os.getenv("PRODUCTION_SERVER"),
        user=os.getenv("PRODUCTION_USERNAME"),
        password=os.getenv("PRODUCTION_PWD"),
        database=os.getenv("PRODUCTION_DB_NAME"),
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    return connection;

def createLocalTimestamp() :
    ts = time.time();
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S');
    return timestamp;

def insertTest(type:str, value:int) :
    connection = connectDb();

    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO graphData (type, value, created_time) VALUES (%s, %s, NOW())"
            cursor.execute(sql, (type, value, ))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit();
        connection.close();
    return;

def getAllGraphDatas() :
    connection = connectDb();

    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "SELECT * FROM graphData";
            cursor.execute(sql);
            dataArr = cursor.fetchall();
    
    return {
        "datas": dataArr,
        "totalDatas": len(dataArr)
    };

def uploadFileData(blob, name) : 
    connection = connectDb();

    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO filetable (file_name, file_data, created_time) VALUES(%s, %s, NOW())";
            cursor.execute(sql, (name, blob));
            connection.commit();
            connection.close();
    
    return;

def getFileLists() : 
    connection = connectDb();

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT file_name, file_id FROM filetable";
            cursor.execute(sql);
            file_info = cursor.fetchall();
            
    return {
        "file_list": file_info,
        "total_len": len(file_info)
    }

def getFileById(id) : 
    connection = connectDb();

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT file_data, file_name FROM filetable WHERE file_id=%s";
            cursor.execute(sql, (id, ));
            file_data = cursor.fetchone();
    
            file_stream = BytesIO(file_data["file_data"])
            
    return {
        "file_stream": file_stream,
        "file_name": file_data["file_name"]
    }

def deleteFilesById(id) :
    connection = connectDb();

    with connection:
            with connection.cursor() as cursor:
                sql = "DELETE FROM filetable WHERE file_id=%s";
                cursor.execute(sql, (id));
                connection.commit();
                connection.close();
    return;