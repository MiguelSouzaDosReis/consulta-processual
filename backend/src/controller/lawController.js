const LawModel = require('../model/lawModel')

module.exports = {
    async readOne(req, res){
        const { lawsuit } = req.params
        if(lawsuit.length <= 4){
            const tri = await LawModel.find({"tribunal": lawsuit});
            console.log(tri)
            return res.json(tri);
        }
        const cnj = await LawModel.findOne({"cnj": lawsuit});
                console.log(cnj)
                return res.json(cnj);
    },
}