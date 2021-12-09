import ReactSummernote from "react-summernote";
import React, { useState, useEffect } from "react";
import "react-summernote/dist/react-summernote.css"; // import styles
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Loading from "../../../utilities/Loading";

export default function SummerNoteEditor() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [body, setBody] = useState([
    {
      title: "",
      text: "",
    },
  ]);
  const onChange = (content) => {
    setText(content);
  };
  const onChangeText = ({ target }) => {
    setTitle(target.value);
  };
  const [loading, setLoading] = useState(false);
  const submitPolicy = async () => {
    const body = {
      title,
      text,
    };
    setLoading(true);
    const response = await axios.post("/api/policies/", body);
    const { data } = response;
    const { msg } = data;
    setLoading(false);
    alert(msg);
  };
  const fetchPolicies = async () => {
    const response = await axios.get("/api/policies/");
    const { data } = response;
    console.log(data);
    setBody(data);
  };
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchPolicies();
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  if (!loading) {
    return (
      <div className="ibox-content">
        <div className="row bg-muted">
          {body.map((policy, key) => (
            <div className="col-lg-4 mt-1" key={key}>
              <div className="ibox">
                <div className="ibox-title no-borders">
                  <h4 className="font-bold">{policy.title}</h4>
                  <div className="ibox-tools">
                    <a
                      className="btn btn-outline-danger mx-2"
                      href={`/policies/${policy._id}`}
                    >
                      <i className="fa fa-trash-o text-danger" />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <div> {ReactHtmlParser(policy.text)} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label>
                Title <strong className="text-danger">*</strong>
              </label>
              <input
                name="title"
                onChange={(e) => onChangeText(e)}
                type="text"
                className="form-control required"
              />
            </div>
          </div>
        </div>
        <ReactSummernote
          value="Default value"
          options={{
            height: 350,
            dialogsInBody: true,
            toolbar: [
              ["style", ["style"]],
              ["font", ["bold", "underline", "clear"]],
              ["fontname", ["fontname"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["table", ["table"]],
              ["insert", ["link", "documents"]],
            ],
          }}
          onChange={onChange}
        />
        <div className="row">
          <div className="col-lg-11" />
          <div className="col-lg-1 m-t-sm ">
            <button
              className="btn btn-primary"
              type="button"
              onClick={submitPolicy}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
