import Fixtures from "node-mongodb-fixtures";
import mongoose from 'mongoose'
// import { mapSchema } from './models/Map'

const fixtures = new Fixtures({
    dir: 'tests/fixtures',
    mute: false, // do not mute the log output
  });


describe("Testing connection to Mongodb server", () => {

    it("it should exit gracefully", async () => {
        await fixtures.connect('mongodb://localhost:27017/')

        await mongoose.connect('mongodb://127.0.0.1:27017');
        
        await fixtures.disconnect();
    });

    test("if unload and load worked by finding a Person", async () => {
        await fixtures
        .connect('mongodb://localhost:27017/')
        .then(() => fixtures.unload())
        .then(() => fixtures.load())
        .catch(e => console.error(e))

        await mongoose.connect('mongodb://127.0.0.1:27017');
        
        const personSchema = new mongoose.Schema({
            name: String,
            age: Number
          });
          
          
        const Person = mongoose.model('Person', personSchema);


        const paul = await Person.find({ name: "Paul" });

        console.log(paul[0].name)

        await fixtures.disconnect();
    });
});

/*
describe("Crud Map operations", () => {
    
    test("if CREATE a map works", async () => {
        await fixtures
        .connect('mongodb://localhost:27017/')
        .catch(e => console.error(e));
        
        await mongoose.connect('mongodb://127.0.0.1:27017');

        

    })

    test("if READ a map works", async () => {
        
    })

    test("if UPDATE a map works", async () => {
        
    })

    test("if DELETE a map works", async () => {
        
    })

})
*/