import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";


const app = express();
const port = 3000;
var blogPosts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.get("/", (req, res) => {
    if (blogPosts.length <= 0) {
        var title = "lmfao";
        var descritpion = "lmao";
    };
    res.render("index.ejs",
    { title: title, description: descritpion, posts: blogPosts }
    );
});

app.get("/create-blog", (req, res) => {
    res.render("create-blog.ejs");
});

app.get("/view-post", (req, res) => {
    res.render("view-post.ejs", 
    { title: blogPosts[0].title, description: blogPosts[0].desc }
    )
})

app.get("/update-post", (req, res) => {
    res.render("update-post.ejs",
    );
});

app.put("/updated", (req, res) => {
    blogPosts[req.body.getId].title = req.body.title
    blogPosts[req.body.getId].desc = req.body.desc
    console.log(req.body.getId)
    res.render("updated.ejs");
}) 

app.post("/", (req, res) => {
    res.render("view-post.ejs", 
    { posts: blogPosts, id: req.body.getId }
    )
});

app.post("/submitted", (req, res) => {
    blogPosts.push(req.body);
    res.render("submitted.ejs")
});

app.delete("/deleted", (req, res) => {
    blogPosts.splice(req.body.getId, 1);
    res.render("deleted.ejs");
})

app.listen(port, () => {
    console.log("listening to port 3000")
});
