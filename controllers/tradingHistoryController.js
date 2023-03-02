const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;
const loadHistory = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }

    var receiptIDArr;
    if (req.query.searchID) {
      if (req.query.searchID != "") {
        receiptIDArr = await dbModel.getReCeiptsByID(req.query.searchID);
      }
    } else {
      receiptIDArr = await dbModel.getAllOrder();
    }

    var tempReceiptIDArr = receiptIDArr.slice(
      currentPage * itemPerPage,
      currentPage * itemPerPage + itemPerPage
    );
    totalPage =
      parseInt(receiptIDArr.length / itemPerPage) +
      (receiptIDArr.length % itemPerPage > 0 ? 1 : 0);
    detailArr = [];
    temp = {};

    for (i = 0; i < tempReceiptIDArr.length; i++) {
      temp["ma_don_hang"] = tempReceiptIDArr[i].ma_don_hang;
      temp["thong_tin"] = {
        ngaynhap: tempReceiptIDArr[i].ngay_mua,
        trang_thai: tempReceiptIDArr[i].trang_thai,
      };
      detailArr.push(temp);
      temp = {};
    }

    if (detailArr.length > 0) {
      res.render("tradingHistoryPage", {
        user: user,
        transactionsList: detailArr,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } else {
      res.render("tradingHistoryPage", {
        user: user,
        transactionsList: detailArr,
      });
    }
  } catch (err) {
    res.render("errorPage", {
      user: user,
      message: err.message,
    });
  }
};

const loadDetails = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    res.render("tradingDetailsPage", { user: {} });
  } catch (err) {
    res.render("errorPage", {
      user: user,
      message: err.message,
    });
  }
};
module.exports = { loadHistory, loadDetails };
