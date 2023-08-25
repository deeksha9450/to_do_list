const mongoose = require('mongoose');

const dbURI='mongodb://localhost:27017/todoapp';

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
console.log('yeaa !! Connected to MongoDB');
}) 
.catch((err) => {
console.error('Error connecting to MongoDB:', err);
});

