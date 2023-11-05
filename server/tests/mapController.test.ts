import Fixtures from "node-mongodb-fixtures";
import mongoose from "mongoose";
import { mapSchema } from "./models/Map";
import map1 from "./models/tests/map1.json";

describe("Testing connection to Mongodb server", () => {
  it("it should exit gracefully", async () => {
    const fixtures = new Fixtures({
      dir: "tests/fixtures",
      mute: true, // do not mute the log output
    });

    await fixtures.connect("mongodb://localhost:27017/");

    await mongoose.connect("mongodb://127.0.0.1:27017");

    await fixtures.disconnect();
  });

  test("if unload and load worked by finding a Person", async () => {
    const fixtures = new Fixtures({
      dir: "tests/fixtures",
      mute: true, // do not mute the log output
      filter: "people.*",
    });
    await fixtures
      .connect("mongodb://localhost:27017/")
      .then(() => fixtures.unload())
      .then(() => fixtures.load())
      .catch((e) => console.error(e));

    await mongoose.connect("mongodb://127.0.0.1:27017");

    const personSchema = new mongoose.Schema({
      name: String,
      age: Number,
    });

    const Person = mongoose.model("Person", personSchema);

    const paul = await Person.find({ name: "Paul" });

    console.log(paul[0].name);

    await fixtures.disconnect();
  });
});

describe("Crud Map operations", () => {
  test("if CREATE a map works", async () => {
    const fixtures = new Fixtures({
      dir: "tests/fixtures",
      mute: true, // do not mute the log output
    });
    await fixtures.connect("mongodb://localhost:27017/");

    await mongoose.connect("mongodb://127.0.0.1:27017");

    const Map = mongoose.model("map", mapSchema);

    const map = new Map(map1);
    const result = await map.save();

    console.log(result.mapName)

    await fixtures.disconnect();
  });

  test("if READ a map works", async () => {
    const fixtures = new Fixtures({
      dir: "tests/fixtures",
      mute: true, // do not mute the log output
      filter: "map.*",
    });
    await fixtures.connect("mongodb://localhost:27017/");
    await fixtures.unload();
    await fixtures.load();

    await mongoose.connect("mongodb://127.0.0.1:27017");

    const Map = mongoose.model("map", mapSchema);


    const retrievedmap = await Map.find({ mapName: "Sample Map 1" });

    expect(retrievedmap).toBeDefined();
    expect(retrievedmap[0].mapName).toBe("Sample Map 1");

    console.log(retrievedmap[0]);

    await fixtures.disconnect();
  });

  test("if UPDATE a map works", async () => {

  })

  test("if DELETE a map works", async () => {

  })
});
