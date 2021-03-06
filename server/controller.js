const bcrypt = require('bcryptjs')
const { SECRET_KEY } = process.env;
const stripe = require('stripe')(SECRET_KEY)



module.exports = {
    registerUser: async (req, res) => {
        try {
        const {firstname, lastname, username, email, phonenumber, password, url } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        var salt = bcrypt.genSaltSync(10); //test
        var hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register_User({firstname,lastname, username, email, phonenumber, password: hash, url })
        console.log(newUser)
        newUser = newUser[0];
        console.log('newuser', newUser)
        delete newUser.password;
        session.user = {...newUser}
        res.status(201).send(session.user) 
        }
        catch(error){
            console.log(error)
        }
    },
    login: async (req, res) => {
        console.log('login endpoint hit', req.body)
        const {username, password} =req.body;
        const {session} = req;
        const db = req.app.get("db");
        let user = await db.user.login({user: username, pass: password}) //massive
        // console.log({user})
        user = user[0]; //pulling the user out of the array 
        // console.log({user})
        if (!user) {
            return res.sendStatus(418);
        }
        console.log(password, user.password)
        const foundUser = bcrypt.compareSync(password, user.password);

        console.log(foundUser)
        if (foundUser) {
            delete user.password;
            session.user = user;
            res.status(200).send(session.user);
        }   else {
            res.status(401).send('nice try man');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    },

    getProperties: (req, res) => {
        const db = req.app.get('db');
        db.properties.get_properties()
        .then((properties) => {res.status(200).send(properties)})
        .catch((err) => res.status(500).send('Error Getting Properties'))
    },
    deleteProperty: (req, res) => {
        const db = req.app.get('db');
        db.properties.delete_property([req.params.id])
        .then((property) => {res.status(200).send(property)})
        .catch((err) => {res.status(200).send('Error Deleting House')})
    },
    getUser: (req, res) => {
    if (req.session.user) {
        res.status(200).send({user: req.session.user})
        } else {
        res.status(200).send({message: "How did you find this page?"})
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    },
    // sendmessage: (req, res) => {
    //     res.header('Content-Type', 'application/json');
    //     client.messages
    //         .create({
    //         from: '+14804053025',
    //         to: req.body.to,
    //         body: req.body.body
    //         })
    //         .then(() => {
    //         res.send(JSON.stringify({ success: true }));
    //         })
    //         .catch(err => {
    //         console.log(err);
    //         res.send(JSON.stringify({ success: false }));
    //         });
    // },
    chargeUser: (req, res, next) => {
        //convert amount to pennies 
        const amountArray = req.body.amount.toString().split('');
        const pennies = [];
        for (var i = 0; i < amountArray.length; i++) {
          if(amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
              pennies.push(amountArray[i + 1]);
            } else {
              pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
              pennies.push(amountArray[i + 2]);
            } else {
              pennies.push("0");
            }
              break;
          } else {
              pennies.push(amountArray[i])
          }
        }
        const convertedAmt = parseInt(pennies.join(''));
      
        const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
      }, function(err, charge) {
          if (err) return res.sendStatus(500)
          return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
      });
      },
    updateUser: (req, res) => {
        const db = req.app.get('db');
        const id = req.params.id;
        const {firstname, lastname, username, email, phonenumber} = req.body;
        // let id = Number(id);
        db.user.update_user([id, firstname, lastname, username, email, phonenumber])
        .then(() => {
            console.log('Edit User Complete')
        })
        .catch((err) => {
            res.status(500).send('Update Error');
            console.log(err);
        })
    },
        match_properties: (req, res) => {
            const db = req.app.get('db');
            const { id } = req.params
            console.log(req.params)
            db.properties.match_properties([id])

            .then(properties => {res.status(200).send(properties)
            console.log(properties)
            })

            .catch(err => {console.log(err)})
        },

    // sendMessage: (req, res) => {
    //     res.header('Content-Type', 'application/json');
    //     client.messages
    //     .create({
    //         from: '+14804053025',
    //         to: req.body.to,
    //         body: req.body.body
    //     })
    //     .then(() => {
    //         res.send(JSON.stringify({ success: true }));
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.send(JSON.stringify({ success: false }));
    //     });
    // },
};