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
});

router.post("/", async(req,res)=>{
    try {
        const {title, author, year}=req.body;

        if(!title)
        {
            return res.status(404).json({
                message:"The title field is required",
            })
        }
        if(!author)
        {
            return res.status(404).json({
                message:"The author field is required",
            })
        }
        if(year>new Date().getFullYear())
        {
            return res.status(404).json({
                message:"The `year` field must be this year or older",
            })
        }
        await db.insert(books).values({
            title:title,
            author:author,
            year:year,
        });

        return res.status(201).json({
            message:"Book created successfully",
        });
    } catch (err) {
        return renderErrorHandler(err, res)
    }
});

router.delete("/:id", async(req,res)=>{
    try {
        const[entry]=await db
        .select()
        .from(books)
        .where(eq(books.id,+req.params.id));

        if(!entry){
            return renderErrorHandler.status(404).json({
                message:"Valmai nem jo"
            });
        };                        
        await db.delete(books).where(eq(books.id,+req.params.id));

        return res.status(200).json({
            message:"Book deleted successfully",
        });
    } catch (err) {
        return renderErrorHandler(err,res);
    }
})

router.put("/:id",async(req,res)=>{
  try {
    const[entry]=await db
    .select()
    .from(books)
    .where(eq(books.id,+req.params.id))
    if(!entry){
      return res.status(404).json({
        message:"Book cannot be found",
      });
    }
    const{title,author,year}=req.body;
    await db.update(books).set({title:title, author:author, year:year})
    .where(eq(books.id,+req.params.id));

    return res.status(200).json({
      message:"Book updated successfully",
    });
    
  } catch (err) {
    return renderErrorHandler(err,res);
  }
})




















module.exports=router;