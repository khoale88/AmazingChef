# AmazingChef

This is the server side of AmazingChef application demo. 
This will work in conjunction with frontend server AmazingChefReact Repository.

## Software dependecy:
1. Language: ECMAScript 6 (javascript)
2. NodeJS

## Database dependency:
Before the back-end sever is run, in addition to satisfy software requirements, 
make sure the following conditions are also met:
1. Have at least one mongo database available, either localhost:27017 or database-as-a-service.
2. If a mongo cluster is desired, make sure they have proper replica configuration.
3. Modify connection in server.js line 19 with with proper addresses and ports. Currently using default mongodb://localhost:27017/amzc

## Test/Run application
1. Go to root directory and install packages dependency

        npm install
        
2. Run application
        
        npm start
        
3. Visit http://localhost:3001/search?name=omlette to see if any result.

# Team Members:
   | [![Ipsha Mohanty](https://avatars1.githubusercontent.com/u/22066710?v=4&s=400)<br /><sub>Ipsha Mohanty</sub>](https://github.com/ipsha1545)<br /> |  [![Khoa Le](https://avatars2.githubusercontent.com/u/21697893?v=3&s=400)<br /><sub>Khoa Le</sub>](https://github.com/khoale88)<br />| [![Arpita Dixit](https://avatars1.githubusercontent.com/u/21253852?v=4&s=400)<br /><sub>Arpita Dixit</sub>](https://github.com/ArpitaDixit)<br /> |
| :---: | :---: | :---: |