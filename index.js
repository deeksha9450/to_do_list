// require express for setting up the express server
const express = require('express');
const path = require('path');
// set up the port number
const port = 8000;

// importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  task  = require('./models/schema');

// using express
const app = express();

// using static files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("assets"));

// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "TODO_List",
            task: task
        });
    }
)});


// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    
    task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

// make the app to listen on asigned port number
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});







// const express=require('express');
// const app=express();
// const port=3000;
// const db=require('./config/mongoose');
// const todolist=require('./models/schema');

// app.set("view engine","ejs");
// app.use(express.static('assets'));
// app.use(express.urlencoded({ extended: true }));

// app.get('/',function(req,res){
//     todolist.find({},function(err,todolist){
//         if(err){
//             console.log("Some error in db : ",err);
//         }
//         return res.render("index",{
//             todo_list: todolist
//         });
//     });

// })

// app.post('/new-todo-list',function(req,res){
//     console.log(req.body);
//     todolist.create({
//         title: req.body.title,
//         status: req.body.category,
//         date: req.body.date
//     });
//     return res.redirect('back');
// });

// app.get('/delete-list',function(req,res){
//     let id=req.query.id;

//     todolist.findByIdAndDelete(id,function(err){
//         if(err){
//             console.log("some error in here");
//         }
//     });

//     return res.redirect('back');
// });

// //lets start server on the mentioned port 3000
// app.listen(port,function(err){
//     if(err){
//         console.log(`oops!! there is something wrong :${err}`);
//     }
//     console.log(`woho !! server is running on port :${port}`);
// })