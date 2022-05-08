const express = require ("express")
const { Router } = express;
const router = new Router()

const productMethods = require("../api/productMethods")

const urlForm = "/form"
const form = 'public/index.html'

router.get("/", (req, res) =>{
   res.send("Holas")
})

module.exports = router