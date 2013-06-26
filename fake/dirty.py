from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['landagent']

if __name__ == '__main__':
    for doc in db['pbs'].find():
        try:
            doc['position']
        except:
            continue
        property = {}
        property['cname'] = doc['cname']
        property['sname'] = doc['sname']
        property['location'] = doc['position']
        property['description'] = doc['description']
        db['properties'].save(property)
        print doc['id']
    
'''
class Store():
    def __init__(self, dbname):
        self.
        self.
        self.collections = {}
        #self.collections['property'] = self.db.properties

    def insert(self, obj, collection):
        self.db[collection].insert(obj)
        
    def existed(self, obj, collection):

        r = self.db[collection].find_one({ "id": obj['id'] })
        if( not r is None ):
            return True
        else:
            return False
    
    def saveIfNotExisted(self, obj, collection):
        if( not self.existed(obj, collection) ):
            self.insert(obj, collection)
    
    def save(self, obj, collection):
        self.db[collection].save(obj)
    
    def list(self, collection):
        for doc in self.db[collection].find():
            print doc 
    
    def listNoLocation(self, collection):
        return [doc for doc in self.db[collection].find({'location': None})]
        
    def listLocationed(self, collection):
        return [doc for doc in self.db[collection].find({'location':  { '$exists' : True }})]
    
    def db(self):
        return self.db
    
    def drop(self, collection):
        self.db[collection].drop()
        
    def test(self, obj, collection):
        print self.db[collection].find_one({ "_id": obj['id'] })
'''

    
    