/* Import */
const { error } = require("../utils/logger");

const Slink = require("../models/Slink");

/* Class */
class viewController {
  /**
   * Главная
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async main(req, res) {
    try {
      return res.render("index", {
        title: "Сокращай с нами!"
      })
      // return res.json({ type: "success", message: "Страница из 'main'" });
    } catch (err) {
      error(err);
      return res
        .status(500)
        .json({ type: "error", message: "Ошибка в 'main'" });
    }
  }

  /**
   * Страница перенаправлений
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async payload(req, res) {
    try {
      const pageId = req.params.pageId;
      if (pageId.length == 6) {
        const condidate = await Slink.findOne({hash: pageId})
        if (!condidate) {
          return res.render("payload", {
            type: "error",
            title: `Адрес: ${pageId} - не существует}`,
            message: "/"
          })
        }
        return res.render("payload", {
          type: "success",
          title: `Скоро перенаправим - ${condidate.hash}`,
          message: condidate.url
        })
      } else {
        return res.redirect("/");
      }
    } catch (err) {
      error(err);
      return res
        .status(500)
        .json({ type: "error", message: "Ошибка в 'payload'" });
    }
  }
}

/* Export */
module.exports = new viewController();
