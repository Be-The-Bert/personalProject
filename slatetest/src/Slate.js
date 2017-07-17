import React, { Component } from 'react';
import { Editor, Raw } from 'slate';

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.'
        }
      ]
    }
  ]
}, { terse: true })

function CodeNode(props) {
  return <pre {...props.attributes}><code>{props.children}</code></pre>
}
function BoldMark(props) {
  return <strong>{props.children}</strong>
}

export default class Slate extends Component {
  constructor() {
    super();
    this.  state = {
    state: initialState,
    schema: {
      nodes: {
        code: CodeNode
      },
      // Add our "bold" mark to the schema...
      marks: {
        bold: BoldMark
      }
    }
  }
  }
  onChange = (state) => {
    this.setState({ state })
  }

  onKeyDown = (event, data, state) => {
    if (!event.metaKey) return

    switch (event.which) {
      case 66: {
        event.preventDefault()
        return state
          .transform()
          .toggleMark('bold')
          .apply()
      }
      case 67: {
        if (!event.altKey) return
        const isCode = state.blocks.some(block => block.type == 'code')
        event.preventDefault()
        return state
          .transform()
          .setBlock(isCode ? 'paragraph' : 'code')
          .apply()
      }
    }
  }

  render = () => {
    return (
      <Editor
        schema={this.state.schema}
        state={this.state.state}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    )
  }
}
