const express = require("express");
require("./connect");
const Register_data = require("./db/register");
const bcrypt = require("bcryptjs");
const { status } = require("nprogress");
const moment = require("moment");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
    const Insert_data = new Register_data(req.body);

    const Insert_data_result = await Insert_data.save();
    res.status(201).send(Insert_data);
})

app.get("/login", async (req, res) => {

    const { Email, Password } = req.body;

    const user = await Register_data.findOne({ Email });

    if (!user) {

        return res.status(400).send({ success: false, msg: "Email Or Password Does Not Match" })
    }

    if (user.Count === 5) {
        //status //
        await Register_data.updateOne({ _id: user._id }, { $set: { status: 0 } })

        return res.send({ msg: "Your Account Is Block" })

    }




    else {
        //Status//
        await Register_data.updateOne({ _id: user._id }, { $set: { status: 1 } })

        const Passwordmatch = await bcrypt.compare(Password, user.Password);

        if (!Passwordmatch) {
            var Count = user.Count
            Count++
            console.log(Count);

            await Register_data.updateOne({ _id: user._id }, { $set: { Count } })
            return res.status(400).send({ success: false, msg: "Email Or Password Does Not Match" })
        }
        else {
            await Register_data.updateOne({ _id: user._id }, { $set: { Count: 1 } })
            return res.send({
                success: true,
                data: { user },
                msg: "Users Detils"
            });
        }
    }
})


app.post("/Punching/:id", async (req, res) => {

    const id = req.params.id;
    console.log(id);
    const Punch_data = await Register_data.findOne({ _id: id });
    // console.log(Punch_data);

    if (Punch_data.Punch_in == "" || Punch_data.Punch_in == null) {
        await Register_data.updateOne({ _id: Punch_data._id }, { $set: { Punch_in: new Date() } });
        // console.log(punch_in);
    }

    else if (Punch_data.Punch_out == "" || Punch_data.Punch_out == null) {
        await Register_data.updateOne({ _id: Punch_data._id }, { $set: { Punch_out: new Date() } })
        // console.log(punch_out);
    }

    // else {

    //     let seconds = (Punch_data.Punch_out.gettime() - Punch_data.Punch_in.gettime()) / 60000;
    //     console.log(seconds);
    //     await res.send(seconds);
    //     return 0;
    // }

    res.send(Punch_data);
});


app.get("/Punching_diff/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id);

    const Punch_diff = await Register_data.find({ _id: id });
    console.log(Punch_diff);

    var seconds = (Punch_diff.Punch_out.getTime() - Punch_diff.Punch_in.getTime()) / 60000;
    console.log('time dff===', seconds);


})

app.listen(3000)