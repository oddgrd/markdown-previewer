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
import hljs from "highlight.js";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang, _callback) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
  breaks: true
});

const resize = <FontAwesomeIcon icon={faExpandAlt}/>;
const markdown = <FontAwesomeIcon icon={faMarkdown}/>;


class Editor extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorInput: initialMarkdown,
      maximizedEditor: false,
      maximizedPreview: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickEditor = this.handleClickEditor.bind(this);
    this.handleClickPreview = this.handleClickPreview.bind(this);
  }

  handleChange(event) {
    this.setState({
      editorInput: event.target.value
    })
  }
  handleClickEditor() {
    this.setState({
      maximizedEditor: !this.state.maximizedEditor
    })
  }
  handleClickPreview() {
    this.setState({
      maximizedPreview: !this.state.maximizedPreview
    })
  }
  render() {
    
    return (
      <div id="container">
        <div 
          className="title" 
          id="editor-title"
          style={this.state.maximizedEditor ? styles.editorTitle.max : styles.editorTitle.min}
          >{markdown} Editor
          <button 
            className="enlarge btn shadow-none" 
            onClick={this.handleClickEditor}
          >{resize}
          </button>
        </div>
        <textarea 
          id="editor" 
          value={this.state.editorInput} 
          onChange={this.handleChange} 
          type="text"
          style={this.state.maximizedEditor ? styles.editor.max : styles.editor.min}
        >
        </textarea>
        
        <Preview 
          editorText={marked(this.state.editorInput)}
          maximized={this.state.maximizedPreview}
          handleClick={this.handleClickPreview}
        />
      </div>
    )
  }
};

function Editorr(props) {
  return;
};
function Preview(props) {
    return (
      <div>
        <div
          className="title" 
          id="preview-title"
          style={props.maximized ? styles.previewTitle.max : styles.previewTitle.min}
          >{markdown} Preview
          
          <button 
            className="enlarge btn shadow-none"
            onClick={props.handleClick}
            >{resize}
          </button>
        </div>
        <div 
          id="preview" 
          dangerouslySetInnerHTML={{__html: marked(props.editorText)}}
          style={props.maximized ? styles.preview.max : styles.preview.min}
        >
        </div>
      </div>
    )
};

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
      minHeight: "95%"
    },
  },
  editorTitle: {
    min: {
      width: "27%"
    },
    max: {
      width: "95%"
    }
  },
  preview: {
    min: {
      height: "78%",
      width: "40%"
    },
    max: {
      height: "95%",
      width: "95%"
    }
  },
  previewTitle: {
    min: {
      width: "40%"
    },
    max: {
      width: "95%"
    }
  }
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
ReactDOM.render(
  <React.StrictMode>
    <Editor />
    <ReactFCCtest />
  </React.StrictMode>,
  document.getElementById('root')
);


