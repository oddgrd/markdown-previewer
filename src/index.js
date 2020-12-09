import react from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFCCtest from 'react-fcctest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import marked from "marked";

const resize = <FontAwesomeIcon icon={faExpandAlt}/>;
const markdown = <FontAwesomeIcon icon={faMarkdown}/>;


class Editor extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorInput: initialMarkdown
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      editorInput: event.target.value
    })
  }
  render() {
    return (
      <div id="container">
        
        <div className="title" id="editor-title">
          {markdown} Editor
          <button className="enlarge btn" id="btn-1">{resize}</button>
        </div>
    <textarea id="editor" value={this.state.editorInput} onChange={this.handleChange} type="text"></textarea>
        
        <div className="title" id="preview-title">
          {markdown} Preview
          <button className="enlarge btn" id="btn-2">{resize}</button>
        </div>
        <Preview editorText={marked(this.state.editorInput)}/>
      </div>
    )
  }
};

class Preview extends react.Component {
  constructor(props) {
    super(props) 
  }
  render() {
    return (
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.props.editorText)}}></div>
    )
  }
};

const initialMarkdown = `<h1>This is my HTML Markdown Previewer</h1>
<h2>This is my sub-header</h2>
<br>
<a href="https://marked.js.org/" target="_blank">Marked.js Markdown Library</a>
<br><br>

This is some inline code \`<div></div>\`, pretty good.
<br>

\`\`\`
// This is multiline code:
function multiLine(line1, line2) {
  return line1.concat(line2);
};
\`\`\`
`;
ReactDOM.render(
  <React.StrictMode>
    <Editor />
    <ReactFCCtest />
  </React.StrictMode>,
  document.getElementById('root')
);


