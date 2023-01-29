const express = require("express");
require("./connect");
const Register_data = require("./db/register");
const Paunching = require("./db/Paunching");
const token = require("./token");
const bcrypt = require("bcryptjs");
const auth = require("./auth");
const moment = require("moment/moment");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
    const Insert_data = new Register_data(req.body);

    const Insert_data_result = await Insert_data.save();
    res.status(201).send(Insert_data);

})

app.post("/login", async (req, res) => {
    //    try {

    const { Email, Password } = req.body;

    const user = await Register_data.findOne({ Email });

    if (!user) return res.status(400).send({ success: false, msg: "Email Or Password Does Not Match" })

    if (user.Count === 5) return res.send({ msg: "Your Account Is Block" })

    else {
        const Passwordmatch = await bcrypt.compare(Password, user.Password);

        if (!Passwordmatch) {
            var Count = user.Count
            Count++

            await Register_data.updateOne({ _id: user._id }, { $set: { Count } })
            return res.status(400).send({ success: false, msg: "Email Or Password Does Not Match" })
        }
        else {

            // token generate
            const userToken = await token(user._id)

            await Register_data.updateOne({ _id: user._id }, {
                $set: {
                    Count: 1,
                    token: userToken
                }
            })
            return res.send({
                success: true,
                data: {
                    _id: user._id,
                    Email: user.Email,
                    token: user.token
                },
                msg: "Users Detils"
            });
        }
    }
})


app.post("/Paunching", async (req, res) => {
    const user_id = await auth(req, res)
    const Paunching_insert = new Paunching({ ...req.body, user_id });

    const Paunching_result = await Paunching_insert.save();
    res.send(Paunching_result);

})

app.get("/Diffrent/:paunchingId", async (req, res) => {
    const data = await Paunching.findOne({ _id: req.params.paunchingId }) // Find paunching data by paunchingId  

    const start_date = moment(new Date()).set({ hour: (Number(data.Paunch_in.split(":")[0])), minute: (Number(data.Paunch_in.split(":")[1])) }).format()
    const end_date = moment(new Date()).set({ hour: (Number(data.Paunch_out.split(":")[0])), minute: (Number(data.Paunch_out.split(":")[1])) }).format()

    const diff = moment(end_date).diff(moment(start_date)) // get diff start_date & end_date in seconds

    const result = new Date(diff).toISOString().slice(11, 16);

    res.json({ msg: "date diff get successfully", dateDiff: result });
})


app.listen(3000)