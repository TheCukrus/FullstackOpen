import list_helper from "../utils/list_helper.js"
import app_listen from "../app.js"
test('dummy returns one', () =>
{
    const blogs = []

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})

test("blog has some blogs, equals all blogs likes sum", async () =>
{
    const result1 = await list_helper.totalLikes()
    expect(result1).toBe(3100);
})


test("paskutinis testas", () =>
{
    app_listen.close()
})