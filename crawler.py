from urllib.request import urlopen
from urllib import error
from bs4 import BeautifulSoup
import re
import time
import pymysql
import datetime
import io 
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')


def getHtml(url):
    try:
        html = urlopen(url)
    except:
        return False
    return html

def connect_database():
    db = pymysql.connect("39.98.131.44", "u1", "ZUCCdjl!", "JS", charset='utf8' )
    return db

def insert_type_to_mysql(info):
    try:
        sql="insert into job_type(type_name) values(%s)"
        cursor.execute(sql, [info])
        conn.commit()
        sql="select id from job_type where type_name=%s"
        cursor.execute(sql,[info])
        id = cursor.fetchone()
        return id
    except Exception as e:
        print(e.args)
        print(traceback.format_exc())
    
def insert_index_to_sql(type_id,name):
    try:
        sql="insert into job_index(type_id,index_name) values(%s,%s)"
        cursor.execute(sql, [type_id,name])
        conn.commit()
    except Exception as e:
        print(e.args)
        print(traceback.format_exc())

def get_content(html):
    soup = BeautifulSoup(html, "html.parser")
    lists = soup.findAll("div",{"class":"list"})
    for list in lists:
        type = list.find("strong")
        # print(type.get_text())
        id = insert_type_to_mysql(type.get_text())
        indexs = list.findAll("li",{"class":"lir"})
        for index in indexs:
            # print(index.get_text())
            insert_index_to_sql(id,index.get_text())


def CrawlInfo(url):
    html = getHtml(url)
    if html!=False:
        get_content(html)

url = "https://74cms50.tywangcai.com/index.php?m=&c=jobs&a=index"

if __name__ == "__main__":
    conn = connect_database()
    cursor = conn.cursor()
    CrawlInfo(url)