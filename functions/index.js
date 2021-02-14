const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
// const routes = require("./routes/users.routes.js");
// const routesAdmin = admin.initializeApp({
//   credential: admin.credential.cert("../routes/users.routes.js"),
// });
const router = require("express")();
admin.initializeApp();

const db = admin.firestore()
    .collection("users");


app.use("/api/v1", router);


// View a contact
router.get("/users/:id", (request, response) => {
  db.doc(request.params.id).get()
      .then((user) => response.status(200).json({
        id: user.id,
        userEmail: user.data().userEmail,
        userName: user.data().userName,
        roleID: user.data().roleID,
        birthDate: new Date(user.data().userName),
        createDate: new Date(user.data().createDate),
      })
          .catch((error) => response.status(400)
              .send(`Cannot get user: ${error}`)));
});

router.get("/users", (request, response) => {
  db.get()
      .then((users) => {
        const listUsers = [];

        users.forEach((user) => {
          listUsers.push({
            id: user.id,
            userEmail: user.data().userEmail,
            userName: user.data().userName,
            roleID: user.data().roleID,
            birthDate: new Date(user.data().userName),
            createDate: new Date(user.data().createDate),
          });
        });

        response.json(listUsers);
      });
});


router.post("/users", (request, response) => {
  const birthDate = new Date(Date.parse(request.body.birthDate));
  const actualDate = new Date(Date.now());

  const newUser = {
    "userID": request.body.userID,
    "userEmail": request.data().userEmail,
    "userName": request.data().userName,
    "roleID": request.data().roleID,
    "birthDate": birthDate,
    "createDate": actualDate,
  };
  db.add(newUser)
      .then(() => {
        response.status(200).json("Success Added");
      });
});

router.delete("/users/:id", (request, response) => {
  db.doc(request.params.id).delete()
      .then((item) => {
        response.status(204).send(`User is deleted: ${item}`);
      })
      .catch((item) => {
        response.status(404).send("User deleted fail.");
      });
});

// Update new contact
router.patch("/users/:id", (request, response) => {
  // const startDate = new Date(Date.parse(request.body.startDate));
  // const endDate = new Date(Date.parse(request.body.endDate));
  try {
    const newUser = {};
    const body = request.body;
    if (body.userEmail) newUser.userEmail = body.userEmail;

    if (body.userName) newUser.userName = body.userName;
    if (body.roleID) newUser.roleID = body.roleID;

    if (body.birthDate) {
      const birthDate = new Date(Date.parse(body.birthDate));
      newUser.birthDate = birthDate;
    }
    if (body.createDate) {
      const createDate = new Date(Date.parse(body.createDate));
      newUser.createDate = createDate;
    }
    db.doc(request.params.id).update(newUser)
        .then(
            (user) => response.send(`${user.id} updated sucessfully`)
        );
  } catch (ex) {
    response.status(500).send("ERRO: " + ex.message);
  }
});

exports.dbUsers = functions.https.onRequest(app);
