/* Import */
const { error } = require("../utils/logger");
const { isUrl, generate } = require("../utils/url_tool");

const Slink = require("../models/Slink");

/* Class */
class apiController {
  /**
   * Создать ссылку
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    try {
      const { url } = req.body;
      if (isUrl(url)) {
        const condidate = await Slink.findOne({ url: url });
        if (!condidate) {
          const newLink = await Slink.create({
            hash: generate(url),
            url,
          });
          await newLink.save()
          return res.json({
            type: "success",
            message: `http://localhost:5000/_${newLink.hash}`,
          });
        } else {
          return res.json({
            type: "success",
            message: `http://localhost:5000/_${condidate.hash}`,
          });
        }
      } else {
        return res
        .status(400)
        .json({ type: "error", message: "Ошибка - это не ссылка" });
      }
    } catch (err) {
      error(err);
      return res
        .status(500)
        .json({ type: "error", message: "Ошибка в 'create'" });
    }
  }

  /**
   * Получить все пары ссылок
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async full_list(req, res) {
    try {
      const _links = await Slink.find();
      let links = []
      _links.forEach(element => {
        links.push({
          url: element.url,
          hash: element.hash
        })
      });
      return res.json(links);
    } catch (err) {
      error(err);
      return res
        .status(500)
        .json({ type: "error", message: "Ошибка в 'full_list'" });
    }
  }
}

/* Export */
module.exports = new apiController();
