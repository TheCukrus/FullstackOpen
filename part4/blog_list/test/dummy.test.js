import list_helper from "../utils/list_helper.js"
import app_listen from "../app.js"
import mongoose from "mongoose"
test('dummy returns one', () =>
{
    const blogs = []

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})

test("blog has some blogs, equals all blogs likes sum", async () =>
{
    const result1 = await list_helper.totalLikes();
    expect(result1).toBe(3100);
})


describe("favoriteBlog", () =>
{

    const a = {
        "title": "vienas",
        "author": "as",
        "likes": 1000
    }


    test("favoriteBlog to find out whitch post has most likes", async () =>
    {
        const result1 = await list_helper.favoriteBlog();
        expect(result1).toEqual(a);
    })
})


test("paskutinis testas", async () =>
{
    await mongoose.disconnect();
    app_listen.close();
})