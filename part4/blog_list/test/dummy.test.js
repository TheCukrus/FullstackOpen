import list_helper from "../utils/list_helper.js"

test('dummy returns one', () =>
{
    const blogs = []

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})

test("blog has some blogs, equals all blogs likes sum", () =>
{
    const result1 = list_helper.totalLikes()
    expect(result1).toBe(3100);
})