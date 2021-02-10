import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import marked from "marked";
import Preview from "./components/Preview";

marked.setOptions({
  breaks: true,
});

const resize = <FontAwesomeIcon icon={faExpandAlt} />;
const markdown = <FontAwesomeIcon icon={faMarkdown} />;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorInput: initialMarkdown,
      maximizedEditor: false,
      maximizedPreview: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickEditor = this.handleClickEditor.bind(this);
    this.handleClickPreview = this.handleClickPreview.bind(this);
  }

  handleChange(event) {
    this.setState({
      editorInput: event.target.value,
    });
  }
  handleClickEditor() {
    this.setState({
      maximizedEditor: !this.state.maximizedEditor,
    });
  }
  handleClickPreview() {
    this.setState({
      maximizedPreview: !this.state.maximizedPreview,
    });
  }
  render() {
    return (
      <div id="container">
        <div
          className="title"
          id="editor-title"
          style={
            this.state.maximizedEditor
              ? styles.editorTitle.max
              : styles.editorTitle.min
          }
        >
          {markdown} Editor
          <button
            className="enlarge btn shadow-none"
            onClick={this.handleClickEditor}
          >
            {resize}
          </button>
        </div>
        <textarea
          id="editor"
          value={this.state.editorInput}
          onChange={this.handleChange}
          type="text"
          style={
            this.state.maximizedEditor ? styles.editor.max : styles.editor.min
          }
        ></textarea>

        <Preview
          editorText={marked(this.state.editorInput)}
          maximized={this.state.maximizedPreview}
          handleClick={this.handleClickPreview}
          markdown={markdown}
          resize={resize}
          styles={styles}
        />
      </div>
    );
  }
}

export default Editor;
const styles = {
  editor: {
    min: {
      height: "19%",
      width: "27%",
      maxWidth: "27%",
      minHeight: "15%",
    },
    max: {
      height: "95%",
      width: "95%",
      maxWidth: "95%",
      minHeight: "95%",
    },
  },
  editorTitle: {
    min: {
      width: "27%",
    },
    max: {
      width: "95%",
    },
  },
  preview: {
    min: {
      height: "78%",
      width: "40%",
    },
    max: {
      height: "95%",
      width: "95%",
    },
  },
  previewTitle: {
    min: {
      width: "40%",
    },
    max: {
      width: "95%",
    },
  },
};

const initialMarkdown = `# This is my HTML Markdown Previewer
## This is my sub-header

[Link to Marked Library](https://marked.js.org/)

This is some inline code \`<div></div>\`, pretty good.  

\`\`\`
// This is multiline code:
function multiLine(line1, line2) {
  return line1.concat(line2);
};
\`\`\`
 - **unordered lists** bold
 - ~~or crossed out~~

 1. or ordered lists
 2. like this one


> even blockquotes!

![React](https://img.icons8.com/ios-glyphs/452/react.png)
`;
