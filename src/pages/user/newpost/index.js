import React, { useState, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import slugify from "slugify";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Layout from "../../../components/layouts";
import Container from "../../../components/other/Container";
import Loading from "../../../components/other/Loading";
import { useSession, getSession } from "next-auth/client";

const Newpost = () => {
  const [html, setHtml] = useState("");
  const [data, setData] = useState({
    category: "",
    title: "",
  });
  const [session, loading] = useSession();

  const handleEditorChange = (content) => {
    setHtml(content);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    console.log(name, value);
  };

  const draftPost = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        title: data.title,
        category: data.category,
        postdata: html,
        slug: slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
        }),
      };

      const result = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      const resultJson = await result.json();
      console.log(resultJson);
    } catch (error) {
      console.error(error);
    }
  };

  const publishPost = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        title: data.title,
        category: data.category,
        postdata: html,
        slug: slugify(data.title, {
          remove: /[*+~.()'"!:@,]/g,
        }),
      };

      const result = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      const resultJson = await result.json();
      console.log(resultJson);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (!session) {
    return (
      <Layout title="Blogger" description="Shoes Coat Fan mobile">
        <Container>
          <div>You need to be authenticated to view this page.</div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title="Blogger" description="Shoes Coat Fan mobile">
      <Container>
        <Form>
          <Row>
            <Col md={8}>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  id="blogTitle"
                  onChange={handleChange}
                  placeholder="Blog Title ..."
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Input
                  type="select"
                  name="category"
                  onChange={handleChange}
                  id="exampleSelect"
                >
                  <option disabled value="Select Category">
                    Select Category
                  </option>
                  <option value="Sports">Sports</option>
                  <option value="News">News</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          {/* <FormGroup>
        <Label for="exampleSelectMulti">TAGS</Label>
        <Input
          type="select"
          name="selectMulti"
          id="exampleSelectMulti"
          multiple
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup> */}

          <FormGroup>
            <SunEditor
              setOptions={{
                height: "60vh",
                buttonList: buttonList.complex,
              }}
              placeholder="Please type here..."
              onChange={handleEditorChange}
            />
          </FormGroup>
          <div style={{ marginTop: 10, marginBottom: 10, textAlign: "end" }}>
            <Button onClick={draftPost}>Draft</Button>
            <Button style={{ marginLeft: 12 }} onClick={publishPost}>
              Publish
            </Button>
          </div>
        </Form>
      </Container>
    </Layout>
  );
};

export default Newpost;
