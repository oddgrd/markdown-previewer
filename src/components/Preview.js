import React from "react";
import marked from "marked";
function Preview(props) {
  return (
    <div>
      <div
        className="title"
        id="preview-title"
        style={
          props.maximized
            ? props.styles.previewTitle.max
            : props.styles.previewTitle.min
        }
      >
        {props.markdown} Preview
        <button className="enlarge btn shadow-none" onClick={props.handleClick}>
          {props.resize}
        </button>
      </div>
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(props.editorText) }}
        style={
          props.maximized ? props.styles.preview.max : props.styles.preview.min
        }
      ></div>
    </div>
  );
}

export default Preview;
