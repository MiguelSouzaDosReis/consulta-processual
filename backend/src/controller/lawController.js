const LawModel = require("../model/lawModel");

module.exports = {
  async readOne(req, res) {
    const { lawsuit } = req.params;
    if (lawsuit.length <= 5) {
      const tri = await LawModel.find({ tribunal: lawsuit });
      console.log(tri);
      return res.json(tri);
    }
    const cnj = await LawModel.findOne({ cnj: lawsuit });
    console.log(cnj);
    return res.json(cnj);
  },

  async readAll(req_, res) {
      const readEverything = await LawModel.find();
      console.log(readEverything);
      return res.json(readEverything);
  },
};
