const express = require("express");
const app = express();
app.use(express.json())

const port = 5000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userapp")
    .then(() => console.log("Local Mongo DB Connected"));

app.listen(port, () => console.log(`Server running on ${port}`));
app.get("/", (req, res) => {
    console.log("Home Called");
    res.end("Bhavya Shah");
});

const userModel = require("./models/users");

// Get All Uses Data
app.get("/api/list", async (req, res) => {
    const userList = await userModel.find();
    if (userList.length === 0) {
        res.json({ data: "No Data Found" });
    }
    res.json({ data: userList });
});

// For Managing Current User Session
app.get("/api/list/:email", async (req, res) => {
    const email = req.params.email

    const userList = await userModel.find({ email: email });
    if (userList.length === 0) {
        res.json({ data: "No Data Found" });
    }
    res.json({ data: userList });
});


// list by userName
app.get("/api/listbyname/:name", async (req, res) => {
    const uname = req.params.name

    const userList = await userModel.find({ username: uname });
    if (userList.length === 0) {
        res.json({
            data: {
                status: false
            }
        });
    }
    res.json({
        data: {
            status: true,
            user: userList
        }
    });
});

// Validate User Login
app.post("/api/login", async (req, res) => {
    const userData = req.body;
    const userList = await userModel.find({ email: userData.email, password: userData.password });
    // const validate = await userList.find((u) => {
    //     (u.email === userData.email, u.password === userData.password)
    // })

    if (userList.length === 1) {
        res.json({
            data: { isLogged: true, user: userList }
        });
    }
    else {
        res.json({ data: { isLogged: false } });
    }
});

// User Registeration
app.post("/api/register", (req, res) => {
    const newUser = req.body;
    userModel.create(newUser);
    res.json({ data: true });
})

// Update User Data
app.put("/api/update/:email", async (req, res) => {
    const emailId = req.params.email
    const updatedRecord = req.body;
    const userList = await userModel.find({ email: emailId });
    if (userList.length > 0) {
        await userModel.findOneAndUpdate({ email: emailId }, updatedRecord, { new: true });
        return res.json({ data: true });
    }
    else {
        res.json({ data: false })
    }

})

// Delete Current User
app.delete("/api/delete/:email", async (req, res) => {
    const emailId = req.params.email
    const userList = await userModel.find({ email: emailId });
    if (userList.length > 0) {
        await userModel.findOneAndDelete({ email: emailId })
        return res.json({ data: true })
    }
})
