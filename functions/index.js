const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

const router = require("express")();
admin.initializeApp();

const db = admin.firestore()
    .collection("users");


app.use("/api/v1", router);


router.get("/users/byUserList",(request,response)=>{
  db.where("user")
});

router.get("/users/googleToken/:googleToken", (request, response) => {
  db.where("googleToken", "==", request.params.googleToken).get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const user = snapshot.docs[0];
          // response.send("USER FOUND");
          response.status(200).json({
            id: user.id,
            userEmail: user.data().userEmail,
            userName: user.data().userName,
            role: user.data().role,
            imageUrl: user.data().imageUrl,
            createDate: new Date(user.data().createDate),
          });
        } else {
          response.status(400).send("USER NOT FOUND");
        }
      });
  // response.send("PATH OK");
});

router.get("/users/emailToken/:emailToken", (request, response) => {
  db.where("emailToken", "==", request.params.emailToken).get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const user = snapshot.docs[0];
          // response.send("USER FOUND");
          response.status(200).json({
            id: user.id,
            userEmail: user.data().userEmail,
            userName: user.data().userName,
            role: user.data().role,
            imageUrl: user.data().imageUrl,
            createDate: new Date(user.data().createDate),
          });
        } else {
          response.status(400).send("USER NOT FOUND");
        }
      });
  // response.send("PATH OK");
});


// View a contact
router.get("/users/:id", (request, response) => {
  db.doc(request.params.id).get()
      .then((user) => response.status(200).json({
        id: user.id,
        userEmail: user.data().userEmail,
        userName: user.data().userName,
        role: user.data().role,
        imageUrl: user.data().imageUrl,
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
            role: user.data().role,
            imageUrl: user.data().imageUrl,
            createDate: new Date(user.data().createDate),
          });
        });

        response.json(listUsers);
      });
});


router.post("/users", (request, response) => {
  const actualDate = new Date(Date.now());

  const newUser = {
    "googleToken": request.body.googleToken,
    "emailToken": request.body.emailToken,
    "userEmail": request.body.userEmail,
    "userName": request.body.userName,
    "role": request.body.role,
    "imageUrl": request.body.imageUrl,
    "createDate": actualDate,
  };
  db.add(newUser)
      .then((value) => {
        response.status(200).json(value.id);
      }).catch(function(error) {
        response.status(500).send(error);
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

    if (body.googleToken) newUser.googleToken = body.googleToken;
    if (body.emailToken) newUser.emailToken = body.emailToken;


    if (body.userName) newUser.userName = body.userName;
    if (body.role) newUser.role = body.role;
    if (body.imageUrl) newUser.imageUrl = body.imageUrl;

    db.doc(request.params.id).update(newUser)
        .then(
            (user) => response.send(`${user.id} updated sucessfully`)
        );
  } catch (ex) {
    response.status(500).send("ERRO: " + ex.message);
  }
});

exports.dbUsers = functions.https.onRequest(app);
