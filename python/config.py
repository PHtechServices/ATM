import json
from pymongo import MongoClient


client = MongoClient("mongodb+srv://himanshu:himanshu@cluster0.ebjdo.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-13hnoa-shard-0&w=majority&readPreference=primary&retryWrites=True",
                     tlsAllowInvalidCertificates=True, tls=True)
db = client.AtmPohu
db2 = client.students
db3 = client.attendaceqr
db4 = client.attendance
collectionSC=db.studyCentralInsert
parentCollection=db.ParentsList
class1 = db4.class1
class2 = db4.class2
class3 = db4.class3
class4 = db4.class4
class5 = db4.class5
class6 = db4.class6
class7 = db4.class7
class8 = db4.class8
class9 = db4.class9
class10 = db4.class10
nursery = db4.nursery
teachers=db4.teacherattendance
lkg = db4.L.K.G
ukg = db4.U.K.G
garbage = db4.garbage
collectionQR = db3.qr
collection = db.Users
collection1 = db.Task
collectionStaff = db.Staff
collectionResponsibilities = db.Responsibilities
collection2 = db.Roles
collectionStatus = db.TaskStatus
collectionClassInfo = db.ClassInfo
collectionTeacherAssignments = db.teacherAssignments
collectionMeetings = db.meetings
broadcast = db.broadcast
report = client.atendancereport
class1 = report.class1
class2 = report.class2
class3 = report.class3
class4 = report.class4
class5 = report.class5
class6 = report.class6
class7 = report.class7
class8 = report.class8
class9 = report.class9
class10 = report.class10
lkg = report.L.K.G
marks = client.marksreport
class1M = marks.class1
class2M = marks.class2
class3M = marks.class3
class4M = marks.class4
class5M = marks.class5
class6M = marks.class6
class7M = marks.class7
class8M = marks.class8
class9M = marks.class9
class10M = marks.class10
lkgM = marks.L.K.G


eventTemplate = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2021-05-28T09:00:00-07:00',
            'timeZone': 'Asia/Kolkata',
        },
        'end': {
            'dateTime': '2021-05-28T17:00:00-07:00',
            'timeZone': 'Asia/Kolkata',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [
            {'email': 'pohulabs@srishtiworldschools.in'}
        ],
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }


userDetailsTemplate = {
    "primaryEmail": "test@keyoncompanies.com",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "suspended": False,
    "password": "f7c3bc1d808e04732adf679965ccc34ca7ae3441",
    "hashFunction": "SHA-1",
    "changePasswordAtNextLogin": True,
    "ipWhitelisted": False,
    "ims": [
        {
            "type": "work",
            "protocol": "gtalk",
            "im": "test@keyoncompanies.com",
            "primary": True
        }
    ],
    "emails": [
        {
            "address": "test@keyoncompanies.com",
            "type": "home",
            "customType": "",
            "primary": True
        }
    ],
    "addresses": [
        {
            "type": "work",
            "customType": "",
            "streetAddress": "1600 Amphitheatre Parkway",
            "locality": "Mountain View",
            "region": "CA",
            "postalCode": "94043"
        }
    ],
    "externalIds": [
        {
            "value": "12345",
            "type": "custom",
            "customType": "employee"
        }
    ],
    "relations": [
        {
            "value": "Mom",
            "type": "mother",
            "customType": ""
        },
        {
            "value": "manager",
            "type": "referred_by",
            "customType": ""
        }
    ],
    "organizations": [
        {
            "name": "Google Inc.",
            "title": "SWE",
            "primary": True,
            "type": "work",
            "description": "Software engineer"
        }
    ],
    "phones": [
        {
            "value": "+1 nnn nnn nnnn",
            "type": "work"
        }
    ],
    "includeInGlobalAddressList": True
}