const dbConnector = require("../dbConnect/db");

const addNewUser = async (user) => {

  try {
    const res = await dbConnector.query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
     '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`);
    return res.rows
  }
  catch (err) {
    console.log(err)
  }


  // console.log(user);
  // await dbConnector.connect().query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
  // '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`, (error, results) => {
  //     if (error) {
  //         console.log(error)
  //     }
  //     // if(results.rows.length == 0)
  //     // {
  //     //   response.send({exist: false })
  //     // }
  //     else {
  //         console.log(results)
  //         return results
  //     }

  // })
};

const userAuthentication = async (user) => {

  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE TAI_KHOAN='${user.username}'`);
    return res.rows
  }
  catch (err) {
    console.log(err)
  }
};

const adminAuthentication = async (user) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM NGUOI_BAN WHERE TAI_KHOAN='${user.username}'`);
    return res.rows
  }
  catch (err) {
    console.log(err)
  }


};
const getTodayFood = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};

const getFoodById = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN AND TA.MA_MON_AN='${id}'`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};


const getUserInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE id='${id}'`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};
// const getFoodInfo =async (foodID) => {
//   try{
//     const res= await dbConnector.query(`SELECT * FROM MON_AN WHERE MA_MON_AN='${foodID}'`);
//     return res.rows;
//   }
//   catch(err){
//     return err;
//   } 
// };

const updateUserInfo = async (id, name, email, phone) => {
  try {
    const res = await dbConnector.query(`UPDATE KHACH_HANG SET ten_kh = '${name}', email='${email}', sdt='${phone}' WHERE id = '${id}'`)
    return res
  } catch (error) {
    return error
  }
}

const getAllGoods = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM MAT_HANG`)
    return res.rows
  } catch (error) {
    return error
  }
}

// call themPhieuNhapHang(ARRAY['#GDCxZxJT','#GDCxZxJT','#GDx3VH16','#GDCnX6D1'],ARRAY[10,10,15,20],ARRAY[17000,20000,30000,40000],'{2012-05-05,
//   ma mh, so luong																											 2012-07-07,2017-03-03,2019-01-01}');
const addNewReceipt = async (queryStringArr) => {
  try {
    const res = await dbConnector.query(`call themPhieuNhapHang(${queryStringArr})`)
    return res
  } catch (error) {
    return error.message
  }
}

// const getPopularItems = async (amount) => {
//   try {
//     const res = await dbConnector.query(`SELECT * FROM MAT_HANG `)
//     return res
//   } catch (error) {
//     return error
//   }
// }

const getAllUserInfo = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG ORDER BY id asc` );
    return res.rows;
  }
  catch (err) {
    return err;
  }
}
const setUserBalance = async user => {
  try {
    const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du ='${user.balance}' WHERE id='${user.id}' `)
    return res
  } catch (error) {
    return error
  }
}
const setUsersBalance=async users =>{
  console.log('server side',users)
  for(var i=0;i<users.length;i++){
     await setUserBalance(users[i]);
  }
}
module.exports = {
  addNewUser,
  userAuthentication,
  adminAuthentication,
  getTodayFood,
  getUserInfo,
  getAllUserInfo,
  updateUserInfo,
  getFoodById,
  getAllGoods,
  addNewReceipt,
  setUsersBalance
};
