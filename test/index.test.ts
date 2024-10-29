import { describe, it, expect, beforeEach } from "vitest";
import { DataProvider } from "react-admin";
import createDataProvider from "../src/index";
import { SuperClient } from "../../../sandbox/js_ts/erika/erika/eicrud_exports/super_client";

const superClient = new SuperClient({ url: "http://localhost:3000" });

let dataProvider: DataProvider;

beforeEach(() => {
  dataProvider = createDataProvider(superClient);
});

describe("Data Provider (with real SuperClient)", () => {
  const newBlogs = [
    { title: "Blog 1", content: "This is my first blog post!" },
    { title: "Blog 2", content: "This is my second blog post!" },
    { title: "Blog 3", content: "This is my third blog post!" },
  ];

  const newBlog = {
    title: "Hello World",
    content: "This is my first blog post!",
  };

  let createdBlog: any = {};
  let createdBlogs: any = [];

  it("should fetch a list of blog", async () => {
    const result = await dataProvider.getList("blog", {
      filter: {},
      pagination: { page: 1, perPage: 10 },
      sort: { field: "id", order: "ASC" },
    });

    expect(result.data, "Expected 'data' to be an array").toBeInstanceOf(Array);
    expect(
      result.total,
      "Expected 'total' to be greater than 0",
    ).toBeGreaterThan(0);
    expect(
      result.data.length,
      `Expected 'data' length to be less than or equal to 10, got (${result.data.length})`,
    ).toBe(10);
  });

  it("should create a new blog instance", async () => {
    const result = await dataProvider.create("blog", { data: newBlog });

    createdBlog = result.data;

    expect(result.data).toHaveProperty("id");
    expect(result.data.title).toBe(newBlog.title);
  });

  it("should get a single blog", async () => {
    const result = await dataProvider.getOne("blog", { id: createdBlog.id });
    expect(result.data).toHaveProperty("id");
    expect(result.data.title).toBe(newBlog.title);
    expect(result.data.content).toBe(newBlog.content);
    expect(result.data.id).toBe(createdBlog.id);
  });

  it("should update a blog", async () => {
    const result = await dataProvider.update("blog", {
      id: createdBlog.id,
      data: { title: "Updated title" },
      previousData: { id: createdBlog.id, ...newBlog },
    });

    const updatedBlog = await dataProvider.getOne("blog", {
      id: createdBlog.id,
    });

    expect(result.data);
    expect(updatedBlog.data.title).toBe("Updated title");
  });

  it("should delete a blog", async () => {
    const result = await dataProvider.delete("blog", { id: createdBlog.id });

    expect(result.data);
  });

  it("should create multiple blogs", async () => {
    const result = await dataProvider.create("blog", {
      data: newBlogs[0],
    });

    const result1 = await dataProvider.create("blog", {
      data: newBlogs[1],
    });

    const result2 = await dataProvider.create("blog", {
      data: newBlogs[2],
    });
    createdBlogs.push(result);
    createdBlogs.push(result1);
    createdBlogs.push(result2);
  });

  it("should update multiple blogs", async () => {
    const result = await dataProvider.updateMany("blog", {
      ids: createdBlogs.map((blog: any) => blog.data.id),
      data: { title: "Updated title" },
    });

    expect(result.data?.length).toBe(newBlogs.length);
  });

  it("should delete multiple blogs", async () => {
    const result = await dataProvider.deleteMany("blog", {
      ids: createdBlogs.map((blog: any) => blog.data.id),
    });

    expect(result.data?.length).toBe(createdBlogs.length);
  });
});
