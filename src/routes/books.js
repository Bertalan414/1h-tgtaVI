const express = require("express");
const db=require("../db/db");
const { books } = require("../db/schema");
const renderErrorHandler = require("../utilities/renderErrorHandler");
const { eq } = require("drizzle-orm");
const router=express.Router();

router.get("/", async(req, res)=>{
    try {
        const entries= await db.select().from(books);

        return res.status(200).json(entries);
    } catch (err) {
        return renderErrorHandler(err, res)
    }
});

router.get("/:id", async (req,res)=>{
    try {
        const[entry]=await db
        .select()
        .from(booknemapi)
        .where(eq(books.id, +req.params.id))
        if(!entry){
            return res.status(404).json({
                message:"Book cannot be found"
            })
        return res.status(200).json(entry);
        }
    } catch (err) {
        return renderErrorHandler(err, res);
    }
})























module.exports=router;